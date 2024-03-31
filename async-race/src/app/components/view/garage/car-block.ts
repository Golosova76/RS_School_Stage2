import Car from '../../model/car-class';
import EventEmitter from '../../../utils/event-emitter';
import { Events } from '../common-types';

class CarBlock {
  private emitter: EventEmitter;

  private car: Car;

  private carId: number;

  private elements;

  svgNamespace = 'http://www.w3.org/2000/svg';

  xlinkNamespace = 'http://www.w3.org/1999/xlink';

  constructor(emitter: EventEmitter, car: Car) {
    this.emitter = emitter;
    this.car = car;
    this.carId = car.id;
    this.elements = {
      root: document.createElement('div'),
      control: {
        selectButton: document.createElement('button'),
        removeButton: document.createElement('button'),
        startButton: document.createElement('button'),
        resetButton: document.createElement('button'),
      },
      name: document.createElement('div'),
      img: document.createElement('div'),
    };
    this.init();
  }

  public get id(): number {
    return this.carId;
  }

  public get root(): HTMLElement {
    return this.elements.root;
  }

  private init(): void {
    const { root } = this.elements;
    root.className = 'car';
    const rowTop = document.createElement('div');
    rowTop.className = 'car__row-top';
    const { selectButton } = this.elements.control;
    selectButton.innerText = 'SELECT';
    selectButton.className = 'button';
    rowTop.append(selectButton);
    const { removeButton } = this.elements.control;
    removeButton.innerText = 'REMOVE';
    removeButton.className = 'button';
    rowTop.append(removeButton);
    const { name } = this.elements;
    name.className = 'car__name';
    name.innerText = this.car.name;
    rowTop.append(name);
    root.append(rowTop);
    const row = document.createElement('div');
    row.className = 'car__row';
    const { startButton } = this.elements.control;
    startButton.innerText = 'A';
    startButton.className = 'car__race-button car__race-button_start';
    row.append(startButton);
    const { resetButton: stopButton } = this.elements.control;
    stopButton.innerText = 'B';
    stopButton.className = 'car__race-button car__race-button_stop';
    stopButton.disabled = true;
    row.append(stopButton);
    const { img } = this.elements;
    img.className = 'car__img';
    const carImage = this.createSvgIcon('BMW-1-Series-Hatchback-2007');
    const flagImage = this.createSvgIconFlag('flag');
    img.append(carImage);
    img.append(flagImage);
    row.append(img);
    root.append(row);
    this.setListeners();
  }

  private setListeners(): void {
    this.elements.control.selectButton.onclick = this.clickSelectButton;
    this.elements.control.removeButton.onclick = this.clickDeleteButton;
    this.elements.control.startButton.onclick = this.clickStartButton;
    this.elements.control.resetButton.onclick = this.clickResetButton;
  }

  public createSvgIcon(iconId: string): SVGSVGElement {
    const svgElement = document.createElementNS(
      this.svgNamespace,
      'svg'
    ) as SVGSVGElement;
    svgElement.setAttribute('class', 'icon-car');
    svgElement.style.fill = this.car.color;
    const useElement = document.createElementNS(
      this.svgNamespace,
      'use'
    ) as SVGUseElement;
    useElement.setAttribute('href', `/sprite.svg#${iconId}`);
    svgElement.appendChild(useElement);
    return svgElement;
  }

  public createSvgIconFlag(iconId: string): SVGSVGElement {
    const svgElement = document.createElementNS(
      this.svgNamespace,
      'svg'
    ) as SVGSVGElement;
    svgElement.setAttribute('class', 'icon-flag');
    svgElement.style.fill = 'red';
    const useElement = document.createElementNS(
      this.svgNamespace,
      'use'
    ) as SVGUseElement;
    useElement.setAttribute('href', `/sprite.svg#${iconId}`);
    svgElement.appendChild(useElement);
    return svgElement;
  }

  private clickSelectButton = (): void => {
    this.emitter.emit(Events.ClickSelectCarButton, { car: this.car });
  };

  private clickDeleteButton = (): void => {
    this.emitter.emit(Events.ClickDeleteCarButton, { id: this.id });
  };

  private clickStartButton = (): void => {
    this.emitter.emit(Events.ClickStartCarButton, { car: this.car });
    this.elements.control.startButton.disabled = true;
  };

  private clickResetButton = (): void => {
    this.emitter.emit(Events.ClickResetCarBtn, { id: this.id });
    this.elements.control.resetButton.disabled = true;
  };
}

export default CarBlock;
