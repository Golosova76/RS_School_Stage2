import Car from '../../model/car-class';
import CommonService from '../../../services/api-service/common-api';
import EventEmitter from '../../../utils/event-emitter';
import AppView from '../../view/appView';
import { StatePage } from '../../model/state-page';
import { Events, EventValue } from '../../view/common-types';
import {
  LIMIT_PAGE_CAR,
  DEFAULT_PAGE_CARS,
  BASE_URL,
} from '../../../services/api-service/common-types';
import {
  setRandomCarColor,
  setRandomCarName,
} from '../../../utils/random-avto';

import EngineController from '../engine-controller';

import {
  EngineParameters,
  RaceResult,
} from '../../../services/api-service/engine/engine';

class GarageController {
  private emitter: EventEmitter;

  private commonService: CommonService;

  private appView: AppView;

  private pageState: StatePage;

  private engineController: EngineController;

  private currentCars: Car[] = [];

  constructor(
    emitter: EventEmitter,
    commonService: CommonService,
    view: AppView,
    pageState: StatePage
  ) {
    this.emitter = emitter;
    this.commonService = commonService;
    this.engineController = new EngineController(BASE_URL);
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

  private async removeCar(id: number): Promise<void> {
    const res = await this.commonService.cars.deleteCar(id);
    if (res) {
      this.loadCars(this.pageState.garagePage);
      this.emitter.emit(Events.CarDelete, { id });
    }
  }

  private async startCar(car: Car, isRace = false): Promise<RaceResult> {
    const engineParam: EngineParameters = await this.engineController.start(
      car.id
    );
    const driveTime = Math.round(engineParam.distance / engineParam.velocity);
    this.emitter.emit(Events.RaceStartCar, { id: car.id, driveTime, isRace });
    const res = await this.engineController.drive(car.id);
    if (!res) {
      this.emitter.emit(Events.RaceStopCar, { id: car.id });
      throw Error('Car broken');
    }
    return { car, driveTime };
  }

  private async resetCar(id: number, isRace = false): Promise<void> {
    await this.engineController.stop(id);
    this.emitter.emit(Events.RaceResetCar, { id, isRace });
  }

  private async race(): Promise<void> {
    this.emitter.emit(Events.RaceStart, {});
    await this.reset(true);
    const cars = this.currentCars;
    const promises: Promise<RaceResult>[] = [];

    cars.forEach((car) => {
      const promise = this.startCar(car, true);
      promises.push(promise);
    });
    try {
      const winnerCar = await Promise.any(promises);
      this.emitter.emit(Events.RaceCarWin, {
        car: winnerCar.car,
        driveTime: winnerCar.driveTime,
      });
    } catch {
      this.emitter.emit(Events.RaceNoWin, {});
    }
    await Promise.allSettled(promises);
    this.emitter.emit(Events.RaceStop, {});
  }

  private async reset(isRace = false): Promise<void> {
    const cars = this.currentCars;
    const promises: Promise<void>[] = [];

    cars.forEach((car) => {
      const promise = this.resetCar(car.id, isRace);
      promises.push(promise);
    });
    await Promise.all(promises);
  }

  private setListeners(): void {
    this.emitter.on(Events.ClickCreateCarButton, this.сlickCreateCarButton);
    this.emitter.on(Events.ClickUpdateCarButton, this.сlickUpdateCarButton);
    this.emitter.on(Events.ClickGaragePrevButton, this.сlickPrevPageButton);
    this.emitter.on(Events.ClickGarageNextButton, this.сlickNextPageButton);
    this.emitter.on(Events.ClickGenerateButton, this.clickGenerateButton);
    this.emitter.on(Events.ClickDeleteCarButton, this.clickRemoveCarButton);
    this.emitter.on(Events.ClickResetCarButton, this.clickResetCarButton);
    this.emitter.on(Events.ClickRaceButton, this.clickRaceButton);
    this.emitter.on(Events.ClickResetButton, this.clickResetButton);
    this.emitter.on(Events.ClickStartCarButton, this.clickStartCarButton);
  }

  private сlickCreateCarButton = (value: EventValue): void => {
    const { name } = value;
    const { color } = value;
    if (name && color) {
      this.createCar(name, color);
    }
  };

  private сlickUpdateCarButton = (val: EventValue): void => {
    const { id, name, color } = val;
    if (id && name && color) {
      this.updateCar(id, name, color);
    }
  };

  private clickRemoveCarButton = (val: EventValue): void => {
    const { id } = val;
    if (id) {
      this.removeCar(id);
    }
  };

  private сlickPrevPageButton = (): void => {
    this.pageState.garagePage -= 1;
    this.emitter.emit(Events.SaveState, {});
    this.loadCars(this.pageState.garagePage);
  };

  private сlickNextPageButton = (): void => {
    this.pageState.garagePage += 1;
    this.emitter.emit(Events.SaveState, {});
    this.loadCars(this.pageState.garagePage);
  };

  private clickGenerateButton = (): void => {
    this.generateCars();
  };

  private clickStartCarButton = async (val: EventValue): Promise<void> => {
    const { car } = val;
    if (car) {
      try {
        await this.startCar(car, false);
      } catch {
        /* empty */
      }
    }
  };

  private clickResetCarButton = (val: EventValue): void => {
    const { id } = val;
    if (id) {
      this.resetCar(id);
    }
  };

  private clickRaceButton = (): void => {
    this.race();
  };

  private clickResetButton = (): void => {
    this.reset();
  };
}
export default GarageController;
