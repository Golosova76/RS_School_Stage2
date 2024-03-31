import Car from '../../model/car-class';
import CommonService from '../../../services/api-service/common-api';
import EventEmitter from '../../../utils/event-emitter';
import AppView from '../../view/appView';
import { StatePage } from '../../model/state-page';
import { Events, EventValue } from '../../view/common-types';
import {
  LIMIT_PAGE_CAR,
  DEFAULT_PAGE_CARS,
} from '../../../services/api-service/common-types';
import {
  setRandomCarColor,
  setRandomCarName,
} from '../../../utils/random-avto';

class GarageController {
  private emitter: EventEmitter;

  private commonService: CommonService;

  private appView: AppView;

  private pageState: StatePage;

  private currentCars: Car[] = [];

  constructor(
    emitter: EventEmitter,
    commonService: CommonService,
    view: AppView,
    pageState: StatePage
  ) {
    this.emitter = emitter;
    this.commonService = commonService;
    this.appView = view;
    this.pageState = pageState;
    this.setListeners();
    this.loadCars(this.pageState.garagePage);
  }

  private async loadCars(loadPage: number): Promise<void> {
    let page = loadPage;
    const total = await this.commonService.cars.getTotalCount();
    const isCorrectPage =
      page * LIMIT_PAGE_CAR - LIMIT_PAGE_CAR < total &&
      page >= DEFAULT_PAGE_CARS;
    if (!isCorrectPage) {
      page = DEFAULT_PAGE_CARS;
    }
    const cars = await this.commonService.cars.getCars(page);
    this.currentCars = cars;
    this.pageState.garagePage = page;
    this.appView.setCars(cars, total, page);
  }

  private async createCar(name: string, color: string): Promise<void> {
    await this.commonService.cars.createCar(name, color);
    this.loadCars(this.pageState.garagePage);
  }

  private async generateCars(): Promise<void> {
    const promises = [];
    for (let i = 0; i < 100; i += 1) {
      const carName = setRandomCarName();
      const carColor = setRandomCarColor();
      promises.push(this.commonService.cars.createCar(carName, carColor));
    }

    await Promise.all(promises);
    this.loadCars(this.pageState.garagePage);
  }

  private async updateCar(
    id: number,
    name: string,
    color: string
  ): Promise<void> {
    const car = await this.commonService.cars.updateCar(id, name, color);
    this.emitter.emit(Events.CarUpdate, { car });
  }

  private setListeners(): void {
    this.emitter.on(Events.ClickCreateCarButton, this.сlickCreateCarButton);
    this.emitter.on(Events.ClickUpdateCarButton, this.сlickUpdateCarButton);
    this.emitter.on(Events.ClickGaragePrevButton, this.сlickPrevPageBtn);
    this.emitter.on(Events.ClickGarageNextButton, this.сlickNextPageBtn);
    this.emitter.on(Events.ClickGenerateButton, this.clickGenerateButton);
  }

  private сlickCreateCarButton = (value: EventValue): void => {
    const { name } = value;
    const { color } = value;
    if (name && color) {
      this.createCar(name, color);
    }
  };

  private сlickUpdateCarButton = (val: EventValue): void => {
    const { id } = val;
    const { name } = val;
    const { color } = val;
    if (id && name && color) {
      this.updateCar(id, name, color);
    }
  };

  private сlickPrevPageBtn = (): void => {
    this.pageState.garagePage -= 1;
    this.emitter.emit(Events.SaveState, {});
    this.loadCars(this.pageState.garagePage);
  };

  private сlickNextPageBtn = (): void => {
    this.pageState.garagePage += 1;
    this.emitter.emit(Events.SaveState, {});
    this.loadCars(this.pageState.garagePage);
  };

  private clickGenerateButton = (): void => {
    this.generateCars();
  };
}
export default GarageController;
