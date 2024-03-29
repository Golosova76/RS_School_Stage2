import EventEmitter from '../../../utils/event-emitter';
import { View, DEFAULT_COLOR, Events, EventValue } from '../common-types';
import Car from '../../model/car-class';
import CarBlock from './car-block';

class GarageView implements View {
  private emitter: EventEmitter;

  private elements;

  private DEFAULT_NAME = '';

  private CARS_ON_PAGE = 7;

  private carsBlocks: CarBlock[] = [];

  private selectCarId: number | null = null;

  private paginationChoice = {
    hasPrevPage: false,
    hasNextPage: false,
  };

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.elements = {
      root: document.createElement('div'),
      title: {
        totalCount: document.createElement('span'),
        page: document.createElement('span'),
      },
      createCar: {
        name: document.createElement('input'),
        color: document.createElement('input'),
        button: document.createElement('button'),
      },
      updateCar: {
        name: document.createElement('input'),
        color: document.createElement('input'),
        button: document.createElement('button'),
      },
      controlButton: {
        race: document.createElement('button'),
        reset: document.createElement('button'),
        generate: document.createElement('button'),
      },
      cars: document.createElement('div'),
      pagination: {
        prevBtn: document.createElement('button'),
        nextBtn: document.createElement('button'),
      },
      winner: document.createElement('div'),
    };
    this.init();
  }

  public getElement(): HTMLElement {
    return this.elements.root;
  }

  public setVisibility(visibility: boolean): void {
    if (visibility) {
      this.elements.root.classList.remove('hidden');
    } else {
      this.elements.root.classList.add('hidden');
    }
  }

  public setCars(cars: Car[], total: number, page: number): void {
    const hasCars = cars.length > 0;
    this.elements.controlButton.race.disabled = !hasCars;
    this.elements.controlButton.reset.disabled = !hasCars;
    this.clearInputBlock('update');
    console.log(total);
    this.elements.title.totalCount.innerText = total.toString();
    this.elements.title.page.innerText = page.toString();
    this.paginationChoice.hasPrevPage = page > 1;
    this.paginationChoice.hasNextPage = page * this.CARS_ON_PAGE < total;
    this.elements.pagination.prevBtn.disabled =
      !this.paginationChoice.hasPrevPage;
    this.elements.pagination.nextBtn.disabled =
      !this.paginationChoice.hasNextPage;
    this.elements.cars.innerHTML = '';
    const carBlocks: CarBlock[] = [];
    cars.forEach((car) => {
      const carBlock = new CarBlock(this.emitter, car);
      carBlocks.push(carBlock);
      this.elements.cars.append(carBlock.root);
    });
    this.carsBlocks = carBlocks;
  }

  private init(): void {
    const { root } = this.elements;
    root.className = 'page__garage garage';
    const newCar = this.createNewCarBlock();
    root.append(newCar);
    const updateCar = this.createUpdateCarBlock();
    root.append(updateCar);
    const controlButtons = this.createControlButtons();
    root.append(controlButtons);
    const garageTitle = document.createElement('h1');
    garageTitle.className = 'garage__title';
    garageTitle.append('Garage (', this.elements.title.totalCount, ')');
    root.append(garageTitle);
    const garagePage = document.createElement('h2');
    garagePage.className = 'garage__subtitle';
    garagePage.append('Page #', this.elements.title.page);
    root.append(garagePage);
    this.elements.cars.className = 'garage__cars car';
    root.append(this.elements.cars);
    const pagination = this.createPagination();
    root.append(pagination);
  }

  public createInputBlock(type: 'create' | 'update'): HTMLElement {
    const element = document.createElement('div');
    element.className = `garage__${type}-car garage-blocks`;
    const { name } = this.elements[`${type}Car`];
    name.className = 'garage__name-input';
    element.append(name);
    name.onanimationend = (): void => {
      name.classList.remove('shake');
    };
    const { color } = this.elements[`${type}Car`];
    color.className = 'garage__color-input';
    color.type = 'color';
    color.value = DEFAULT_COLOR;
    element.append(color);
    const { button } = this.elements[`${type}Car`];
    button.className = 'button-choice button';
    button.innerText = type.toLocaleUpperCase();
    element.append(button);
    return element;
  }

  private createNewCarBlock(): HTMLElement {
    const newCarBlock = this.createInputBlock('create');
    this.elements.createCar.button.onclick = (): void => {
      const { name } = this.elements.createCar;
      const { color } = this.elements.createCar;

      if (name.value === this.DEFAULT_NAME) {
        name.classList.add('shake');
      } else {
        this.emitter.emit(Events.ClickCreateCarButton, {
          name: name.value,
          color: color.value,
        });
        this.clearInputBlock('create');
      }
    };
    return newCarBlock;
  }

  private createUpdateCarBlock(): HTMLElement {
    const editCar = this.createInputBlock('update');
    this.clearInputBlock('update');

    this.elements.updateCar.button.onclick = (): void => {
      const { name } = this.elements.updateCar;
      const { color } = this.elements.updateCar;
      const id = this.selectCarId;

      if (name.value === this.DEFAULT_NAME) {
        name.classList.add('shake');
      } else if (id) {
        this.emitter.emit(Events.ClickUpdateCarButton, {
          id,
          name: name.value,
          color: color.value,
        });
        this.clearInputBlock('update');
      }
    };

    this.emitter.on(Events.ClickSelectCarButton, (val: EventValue) => {
      const { car } = val;
      if (car && car instanceof Car) {
        this.selectCarId = car.id;
        const { updateCar } = this.elements;
        updateCar.name.value = car.name;
        updateCar.color.value = car.color;
        updateCar.name.disabled = false;
        updateCar.color.disabled = false;
        updateCar.button.disabled = false;
      }
    });
    return editCar;
  }

  private clearInputBlock(type: 'create' | 'update'): void {
    const inputBlock = this.elements[`${type}Car`];
    inputBlock.name.value = this.DEFAULT_NAME;
    inputBlock.color.value = DEFAULT_COLOR;
    /*
    if (type === 'update') {
      this.selectCarId = null;
      inputBlock.name.disabled = true;
      inputBlock.color.disabled = true;
      inputBlock.button.disabled = true;
    }
    */
  }

  private createControlButtons(): HTMLElement {
    const controlsButtons = document.createElement('div');
    controlsButtons.className = 'garage__controls garage-blocks';
    const { race } = this.elements.controlButton;
    race.className = 'garage__button-control button';
    race.innerText = 'RACE';
    race.onclick = (): void => {
      this.emitter.emit(Events.ClickRaceButton, {});
    };
    controlsButtons.append(race);
    const { reset } = this.elements.controlButton;
    reset.className = 'garage__button-control button';
    reset.innerText = 'RESET';
    reset.onclick = (): void => {
      this.emitter.emit(Events.ClickResetButton, {});
    };
    controlsButtons.append(reset);
    const { generate } = this.elements.controlButton;
    generate.className = 'garage__button-generate button';
    generate.innerText = 'GENERATE CARS';
    generate.onclick = (): void => {
      this.emitter.emit(Events.ClickGenerateButton, {});
    };
    controlsButtons.append(generate);

    return controlsButtons;
  }

  private createPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'garage__pagination pagination garage-blocks';
    const { prevBtn } = this.elements.pagination;
    prevBtn.className = 'pagination__button button';
    prevBtn.innerText = 'PREV';
    prevBtn.disabled = true;
    prevBtn.onclick = (): void => {
      this.emitter.emit(Events.ClickGaragePrevButton, {});
    };
    pagination.append(prevBtn);
    const { nextBtn } = this.elements.pagination;
    nextBtn.className = 'pagination__button button';
    nextBtn.innerText = 'NEXT';
    nextBtn.disabled = true;
    nextBtn.onclick = (): void => {
      this.emitter.emit(Events.ClickGarageNextButton, {});
    };
    pagination.append(nextBtn);
    return pagination;
  }
}

export default GarageView;
