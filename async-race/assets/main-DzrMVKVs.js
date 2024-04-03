var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const DEFAULT_COLOR = "#ffffff";
var SortValue = /* @__PURE__ */ ((SortValue2) => {
  SortValue2["Id"] = "id";
  SortValue2["Wins"] = "wins";
  SortValue2["Time"] = "time";
  return SortValue2;
})(SortValue || {});
var Events = /* @__PURE__ */ ((Events2) => {
  Events2["ClickNavButton"] = "click:nav-button";
  Events2["SaveStatePage"] = "save:state-page";
  Events2["ClickCreateCarButton"] = "click:create-car";
  Events2["ClickUpdateCarButton"] = "click:update-car";
  Events2["ClickSelectCarButton"] = "click:select-car";
  Events2["ClickDeleteCarButton"] = "click:delete-car";
  Events2["ClickStartCarButton"] = "click:start-car";
  Events2["ClickResetCarButton"] = "click:stop-car";
  Events2["ClickRaceButton"] = "click:race";
  Events2["ClickResetButton"] = "click:reset";
  Events2["ClickGenerateButton"] = "click:generate-car";
  Events2["ClickGaragePrevButton"] = "click:garage-prev";
  Events2["ClickGarageNextButton"] = "click:garage-next";
  Events2["ClickWinnersPrevButton"] = "click:winners-prev";
  Events2["ClickWinnersNextButton"] = "click:winners-next";
  Events2["ClickWinnersSort"] = "click:winners-sort";
  Events2["UpdateWinner"] = "update:winner";
  Events2["CarUpdate"] = "car:update";
  Events2["CarDelete"] = "car:delete";
  Events2["SaveState"] = "save:state";
  Events2["RaceStartCar"] = "race:start-car";
  Events2["RaceStopCar"] = "race:stop-car";
  Events2["RaceResetCar"] = "race:reset-car";
  Events2["RaceStart"] = "race:start";
  Events2["RaceStop"] = "race:stop";
  Events2["RaceCarWin"] = "race:car-win";
  Events2["RaceNoWin"] = "race:no-win";
  return Events2;
})(Events || {});
var Page = /* @__PURE__ */ ((Page2) => {
  Page2[Page2["Garage"] = 0] = "Garage";
  Page2[Page2["Winners"] = 1] = "Winners";
  return Page2;
})(Page || {});
class AppStatePage {
  constructor(statePage) {
    __publicField(this, "currentPage", 0);
    __publicField(this, "garagePage", 1);
    __publicField(this, "winnersPage", 1);
    if (statePage !== null && typeof statePage === "object") {
      if ("currentPage" in statePage && (statePage.currentPage === 0 || statePage.currentPage === 1)) {
        this.currentPage = statePage.currentPage;
      }
      if ("garagePage" in statePage && typeof statePage.garagePage === "number") {
        this.garagePage = statePage.garagePage;
      }
      if ("winnersPage" in statePage && typeof statePage.winnersPage === "number") {
        this.winnersPage = statePage.winnersPage;
      }
    }
  }
}
const BASE_URL = "http://127.0.0.1:3000";
var HttpMethod = /* @__PURE__ */ ((HttpMethod2) => {
  HttpMethod2["Get"] = "GET";
  HttpMethod2["Post"] = "POST";
  HttpMethod2["Put"] = "PUT";
  HttpMethod2["Delete"] = "DELETE";
  HttpMethod2["Patch"] = "PATCH";
  return HttpMethod2;
})(HttpMethod || {});
const LIMIT_PAGE_WINNER = 10;
const LIMIT_PAGE_CAR = 7;
const DEFAULT_PAGE_CARS = 1;
const nameCars = {
  brands: [
    "Toyota",
    "Ford",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Honda",
    "Nissan",
    "Chevrolet",
    "Volkswagen",
    "Kia",
    "Hyundai",
    "Porsche",
    "Subaru",
    "Tesla",
    "Volvo"
  ],
  models: [
    "Camry",
    "F-150",
    "3 Series",
    "S-Class",
    "A4",
    "Civic",
    "Altima",
    "Silverado",
    "Golf",
    "Sorento",
    "Sonata",
    "911",
    "Forester",
    "Model S",
    "XC90"
  ]
};
function setRandomCarName() {
  const carBrand = nameCars.brands[Math.floor(Math.random() * nameCars.brands.length)];
  const carModel = nameCars.models[Math.floor(Math.random() * nameCars.models.length)];
  return `${carBrand} ${carModel}`;
}
function setRandomCarColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
var EngineActions = /* @__PURE__ */ ((EngineActions2) => {
  EngineActions2["Started"] = "started";
  EngineActions2["Stopped"] = "stopped";
  EngineActions2["Drive"] = "drive";
  return EngineActions2;
})(EngineActions || {});
var ResponseCode = /* @__PURE__ */ ((ResponseCode2) => {
  ResponseCode2[ResponseCode2["Ok"] = 200] = "Ok";
  ResponseCode2[ResponseCode2["BadRequest"] = 400] = "BadRequest";
  ResponseCode2[ResponseCode2["NotFound"] = 404] = "NotFound";
  ResponseCode2[ResponseCode2["TooManyRequests"] = 429] = "TooManyRequests";
  ResponseCode2[ResponseCode2["InternalServerError"] = 500] = "InternalServerError";
  return ResponseCode2;
})(ResponseCode || {});
class EngineController {
  constructor(baseUrl) {
    __publicField(this, "baseUrl");
    this.baseUrl = `${baseUrl}/engine`;
  }
  async start(carId) {
    const status = EngineActions.Started;
    const resp = await this.request(status, carId);
    if (resp.ok) {
      const json = await resp.json();
      return EngineController.getEngineParametersFromJson(
        json,
        EngineActions.Started
      );
    }
    const errorMsg = EngineController.getErrorMessage(resp, status, carId);
    throw Error(errorMsg);
  }
  async stop(carId) {
    const status = EngineActions.Stopped;
    const resp = await this.request(status, carId);
    if (resp.ok) {
      const json = await resp.json();
      return EngineController.getEngineParametersFromJson(
        json,
        EngineActions.Started
      );
    }
    const errorMsg = EngineController.getErrorMessage(resp, status, carId);
    throw Error(errorMsg);
  }
  async drive(carId) {
    const status = EngineActions.Drive;
    const resp = await this.request(status, carId);
    if (resp.ok) {
      return true;
    }
    if (resp.status === ResponseCode.InternalServerError) {
      return false;
    }
    const errorMsg = EngineController.getErrorMessage(resp, status, carId);
    throw Error(errorMsg);
  }
  async request(status, carId) {
    const queryString = `id=${carId}&status=${status}`;
    const resp = await fetch(`${this.baseUrl}?${queryString}`, {
      method: HttpMethod.Patch
    });
    return resp;
  }
  static getErrorMessage(resp, status, carId) {
    let message;
    if (resp.status === ResponseCode.NotFound) {
      message = `Engine ${status}: car with id: ${carId} not found`;
    } else if (resp.status === ResponseCode.BadRequest) {
      message = `Engine ${status}: incorrect id: ${carId}`;
    } else if (resp.status === ResponseCode.TooManyRequests) {
      message = `Engine ${status}: too many requests`;
    } else {
      message = `Engine ${status} : ${`response.status`}`;
    }
    return message;
  }
  static getEngineParametersFromJson(json, status) {
    if (json && typeof json === "object" && "velocity" in json && typeof json.velocity === "number" && "distance" in json && typeof json.distance === "number") {
      return {
        velocity: json.velocity,
        distance: json.distance
      };
    }
    throw Error(
      `Engine ${status}: incorrect json response: ${JSON.stringify(json)}`
    );
  }
}
class GarageController {
  constructor(emitter, commonService, view, pageState) {
    __publicField(this, "emitter");
    __publicField(this, "commonService");
    __publicField(this, "appView");
    __publicField(this, "pageState");
    __publicField(this, "engineController");
    __publicField(this, "currentCars", []);
    __publicField(this, "сlickCreateCarButton", (value) => {
      const { name } = value;
      const { color } = value;
      if (name && color) {
        this.createCar(name, color);
      }
    });
    __publicField(this, "сlickUpdateCarButton", (val) => {
      const { id, name, color } = val;
      if (id && name && color) {
        this.updateCar(id, name, color);
      }
    });
    __publicField(this, "clickRemoveCarButton", (val) => {
      const { id } = val;
      if (id) {
        this.removeCar(id);
      }
    });
    __publicField(this, "сlickPrevPageButton", () => {
      this.pageState.garagePage -= 1;
      this.emitter.emit(Events.SaveState, {});
      this.loadCars(this.pageState.garagePage);
    });
    __publicField(this, "сlickNextPageButton", () => {
      this.pageState.garagePage += 1;
      this.emitter.emit(Events.SaveState, {});
      this.loadCars(this.pageState.garagePage);
    });
    __publicField(this, "clickGenerateButton", () => {
      this.generateCars();
    });
    __publicField(this, "clickStartCarButton", async (val) => {
      const { car } = val;
      if (car) {
        try {
          await this.startCar(car, false);
        } catch {
        }
      }
    });
    __publicField(this, "clickResetCarButton", (val) => {
      const { id } = val;
      if (id) {
        this.resetCar(id);
      }
    });
    __publicField(this, "clickRaceButton", () => {
      this.race();
    });
    __publicField(this, "clickResetButton", () => {
      this.reset();
    });
    this.emitter = emitter;
    this.commonService = commonService;
    this.engineController = new EngineController(BASE_URL);
    this.appView = view;
    this.pageState = pageState;
    this.setListeners();
    this.loadCars(this.pageState.garagePage);
  }
  async loadCars(loadPage) {
    let page = loadPage;
    const total = await this.commonService.cars.getTotalCount();
    const isCorrectPage = page * LIMIT_PAGE_CAR - LIMIT_PAGE_CAR < total && page >= DEFAULT_PAGE_CARS;
    if (!isCorrectPage) {
      page = DEFAULT_PAGE_CARS;
    }
    const cars = await this.commonService.cars.getCars(page);
    this.currentCars = cars;
    this.pageState.garagePage = page;
    this.appView.setCars(cars, total, page);
  }
  async createCar(name, color) {
    await this.commonService.cars.createCar(name, color);
    this.loadCars(this.pageState.garagePage);
  }
  async generateCars() {
    const promises = [];
    for (let i = 0; i < 100; i += 1) {
      const carName = setRandomCarName();
      const carColor = setRandomCarColor();
      promises.push(this.commonService.cars.createCar(carName, carColor));
    }
    await Promise.all(promises);
    this.loadCars(this.pageState.garagePage);
  }
  async updateCar(id, name, color) {
    const car = await this.commonService.cars.updateCar(id, name, color);
    this.emitter.emit(Events.CarUpdate, { car });
  }
  async removeCar(id) {
    const res = await this.commonService.cars.deleteCar(id);
    if (res) {
      this.loadCars(this.pageState.garagePage);
      this.emitter.emit(Events.CarDelete, { id });
    }
  }
  async startCar(car, isRace = false) {
    const engineParam = await this.engineController.start(
      car.id
    );
    const driveTime = Math.round(engineParam.distance / engineParam.velocity);
    this.emitter.emit(Events.RaceStartCar, { id: car.id, driveTime, isRace });
    const res = await this.engineController.drive(car.id);
    if (!res) {
      this.emitter.emit(Events.RaceStopCar, { id: car.id });
      throw Error("Car broken");
    }
    return { car, driveTime };
  }
  async resetCar(id, isRace = false) {
    await this.engineController.stop(id);
    this.emitter.emit(Events.RaceResetCar, { id, isRace });
  }
  async race() {
    this.emitter.emit(Events.RaceStart, {});
    await this.reset(true);
    const cars = this.currentCars;
    const promises = [];
    cars.forEach((car) => {
      const promise = this.startCar(car, true);
      promises.push(promise);
    });
    try {
      const winnerCar = await Promise.any(promises);
      this.emitter.emit(Events.RaceCarWin, {
        car: winnerCar.car,
        driveTime: winnerCar.driveTime
      });
    } catch {
      this.emitter.emit(Events.RaceNoWin, {});
    }
    await Promise.allSettled(promises);
    this.emitter.emit(Events.RaceStop, {});
  }
  async reset(isRace = false) {
    const cars = this.currentCars;
    const promises = [];
    cars.forEach((car) => {
      const promise = this.resetCar(car.id, isRace);
      promises.push(promise);
    });
    await Promise.all(promises);
  }
  setListeners() {
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
}
class AppControllers {
  constructor(emitter, commonService, view) {
    __publicField(this, "emitter");
    __publicField(this, "commonService");
    __publicField(this, "appView");
    __publicField(this, "pageState");
    // это интерфейс!!!!
    __publicField(this, "garageController");
    __publicField(this, "localStorageKey", "golosova__race-state");
    this.emitter = emitter;
    this.commonService = commonService;
    this.appView = view;
    this.pageState = this.getState();
    this.init();
    this.garageController = new GarageController(
      emitter,
      commonService,
      view,
      this.pageState
    );
  }
  start() {
    this.appView.setView(this.pageState.currentPage);
  }
  init() {
    this.emitter.on(Events.ClickNavButton, (value) => {
      let page = null;
      if (value.page === Page.Garage) {
        page = Page.Garage;
      } else if (value.page === Page.Winners) {
        page = Page.Winners;
      }
      if (page !== null && this.pageState.currentPage !== page) {
        this.pageState.currentPage = page;
        this.saveState();
        this.appView.setView(page);
      }
    });
    this.emitter.on(Events.SaveStatePage, () => {
      this.saveState();
    });
  }
  getState() {
    const lsStatePage = localStorage.getItem(this.localStorageKey);
    if (lsStatePage !== null) {
      const loadedState = JSON.parse(lsStatePage);
      return new AppStatePage(loadedState);
    }
    return new AppStatePage();
  }
  saveState() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.pageState));
  }
}
class EventEmitter {
  constructor() {
    __publicField(this, "events", /* @__PURE__ */ new Map());
  }
  on(event, handler) {
    let handlers = this.events.get(event);
    if (handlers === void 0) {
      handlers = [];
      this.events.set(event, handlers);
    }
    handlers.push(handler);
  }
  emit(event, value) {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach((handler) => handler(value));
    }
  }
}
class Car {
  constructor(id, name, color) {
    __publicField(this, "id");
    __publicField(this, "name");
    __publicField(this, "color");
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
class CarService {
  constructor(baseUrl) {
    __publicField(this, "baseUrl");
    __publicField(this, "HEADER", { "Content-Type": "application/json" });
    this.baseUrl = `${baseUrl}/garage`;
  }
  // обработка X-Total-Count
  async getTotalCount() {
    const limit = 0;
    const response = await fetch(`${this.baseUrl}?_limit=${limit}`);
    const totalHeader = response.headers.get("X-Total-Count");
    if (totalHeader === null) {
      throw Error("Header 'X-Total-Count' is not available");
    }
    const total = parseInt(totalHeader, 10);
    return total;
  }
  // Получение автомобилей
  async getCars(page) {
    const response = await fetch(
      `${this.baseUrl}?_limit=${LIMIT_PAGE_CAR}&_page=${page}`
    );
    if (response.ok) {
      const json = await response.json();
      const cars = CarService.getCars(json);
      return cars;
    }
    throw Error(`${response.status}`);
  }
  // Получение автомобиля
  async getCar(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.ok) {
      const json = await response.json();
      const car = CarService.getCar(json);
      return car;
    }
    return null;
  }
  // Создание нового автомобиля
  async createCar(name, color) {
    const response = await fetch(this.baseUrl, {
      method: HttpMethod.Post,
      headers: this.HEADER,
      body: JSON.stringify({ name, color })
    });
    if (response.ok) {
      const json = await response.json();
      const car = CarService.getCar(json);
      return car;
    }
    throw new Error(`Can't create car: ${response.status}`);
  }
  // Обновление автомобиля
  async updateCar(id, name, color) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Put,
      headers: this.HEADER,
      body: JSON.stringify({ id, name, color })
    });
    if (response.ok) {
      const json = await response.json();
      const car = CarService.getCar(json);
      return car;
    }
    throw Error(`Can't update car: ${response.status}`);
  }
  // Удаление автомобиля
  async deleteCar(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Delete
    });
    if (response.ok) {
      return true;
    }
    return false;
  }
  // проверка ответа сервера и создание экземпляра car
  static getCar(json) {
    if (json && typeof json === "object" && "id" in json && "name" in json && "color" in json && typeof json.id === "number" && typeof json.name === "string" && typeof json.color === "string") {
      const { id } = json;
      const { name } = json;
      const { color } = json;
      return new Car(id, name, color);
    }
    throw Error(`Can't get car json: ${json}`);
  }
  // проверка ответа сервера и создание экземпляр cars
  static getCars(jsonArray) {
    if (!Array.isArray(jsonArray)) {
      throw Error("Expected an array of car json objects");
    }
    const cars = jsonArray.map((value) => {
      return CarService.getCar(value);
    });
    return cars;
  }
}
class Winner {
  constructor(id, wins, time) {
    __publicField(this, "id");
    __publicField(this, "wins");
    __publicField(this, "time");
    this.id = id;
    this.wins = wins;
    this.time = time;
  }
}
class WinnerService {
  constructor(baseUrl) {
    __publicField(this, "baseUrl");
    __publicField(this, "HEADER", { "Content-Type": "application/json" });
    this.baseUrl = `${baseUrl}/winners`;
  }
  // обработка X-Total-Count
  async getTotalCount() {
    const limit = 0;
    const response = await fetch(`${this.baseUrl}?_limit=${limit}`);
    const totalHeader = response.headers.get("X-Total-Count");
    if (totalHeader === null) {
      throw Error("Header 'X-Total-Count' is not available");
    }
    const total = parseInt(totalHeader, 10);
    return total;
  }
  // Получение победителя
  async getWinner(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.ok) {
      const json = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }
    return null;
  }
  // Получение победителей
  async getWinners(page) {
    const response = await fetch(
      `${this.baseUrl}?_limit=${LIMIT_PAGE_WINNER}&_page=${page}`
    );
    if (response.ok) {
      const json = await response.json();
      const cars = WinnerService.getWinners(json);
      return cars;
    }
    throw Error(`${response.status}`);
  }
  // Создание нового победителя
  async createWinner(id, wins, time) {
    const response = await fetch(this.baseUrl, {
      method: HttpMethod.Post,
      headers: this.HEADER,
      body: JSON.stringify({ id, wins, time })
    });
    if (response.ok) {
      const json = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }
    throw Error(`Can't create winner ${response.status}`);
  }
  // Обновление победителя
  async updateWinner(id, wins, time) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Put,
      headers: this.HEADER,
      body: JSON.stringify({ wins, time })
    });
    if (response.ok) {
      const json = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }
    throw Error(`Can't update winner ${response.status}`);
  }
  // Удаление победителя в ТЗ нет
  async deleteWinner(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Delete
    });
    if (response.ok) {
      return true;
    }
    return false;
  }
  // проверка ответа сервера и создание экземпляра winner
  static getWinner(json) {
    if (json && typeof json === "object" && "id" in json && "wins" in json && "time" in json && typeof json.id === "number" && typeof json.wins === "number" && typeof json.time === "number") {
      const { id } = json;
      const { wins } = json;
      const { time } = json;
      return new Winner(id, wins, time);
    }
    throw Error(`Can't get winner json: ${json}`);
  }
  // проверка ответа сервера и создание экземпляр winners
  static getWinners(jsonArray) {
    if (!Array.isArray(jsonArray)) {
      throw Error("Expected an array of car json objects");
    }
    const winners = jsonArray.map((value) => {
      return WinnerService.getWinner(value);
    });
    return winners;
  }
}
class CommonService {
  constructor(url) {
    __publicField(this, "carsService");
    __publicField(this, "winnersService");
    this.carsService = new CarService(url);
    this.winnersService = new WinnerService(url);
  }
  get cars() {
    return this.carsService;
  }
  get winners() {
    return this.winnersService;
  }
}
class CarBlock {
  constructor(emitter, car) {
    __publicField(this, "emitter");
    __publicField(this, "car");
    __publicField(this, "carId");
    __publicField(this, "elements");
    __publicField(this, "animationState", {
      DEFAULT: "",
      PAUSED: "paused"
    });
    __publicField(this, "ANIMATION_TIME", 1.2);
    __publicField(this, "svgNamespace", "http://www.w3.org/2000/svg");
    __publicField(this, "xlinkNamespace", "http://www.w3.org/1999/xlink");
    __publicField(this, "clickSelectButton", () => {
      this.emitter.emit(Events.ClickSelectCarButton, { car: this.car });
    });
    __publicField(this, "clickDeleteButton", () => {
      this.emitter.emit(Events.ClickDeleteCarButton, { id: this.id });
    });
    __publicField(this, "clickStartButton", () => {
      this.emitter.emit(Events.ClickStartCarButton, { car: this.car });
      this.elements.control.startButton.disabled = true;
    });
    __publicField(this, "clickResetButton", () => {
      this.emitter.emit(Events.ClickResetCarButton, { id: this.id });
      this.elements.control.resetButton.disabled = true;
    });
    this.emitter = emitter;
    this.car = car;
    this.carId = car.id;
    this.elements = {
      root: document.createElement("div"),
      control: {
        selectButton: document.createElement("button"),
        removeButton: document.createElement("button"),
        startButton: document.createElement("button"),
        resetButton: document.createElement("button")
      },
      name: document.createElement("div"),
      img: document.createElement("div")
    };
    this.init();
  }
  get id() {
    return this.carId;
  }
  get root() {
    return this.elements.root;
  }
  blockControlsTrue() {
    this.elements.control.removeButton.disabled = true;
    this.elements.control.startButton.disabled = true;
    this.elements.control.resetButton.disabled = true;
  }
  blockControlFalse() {
    this.elements.control.removeButton.disabled = false;
  }
  start(driveTime, isRace = false) {
    const svgElement = this.elements.img.querySelector(
      "svg.icon-car"
    );
    const animationDuration = driveTime * this.ANIMATION_TIME;
    svgElement.style.animationDuration = `${animationDuration}ms`;
    svgElement.classList.add("race");
    this.elements.control.startButton.disabled = true;
    this.elements.control.resetButton.disabled = isRace;
  }
  stop() {
    const svgElement = this.elements.img.querySelector(
      "svg.icon-car"
    );
    svgElement.style.animationPlayState = this.animationState.PAUSED;
    this.elements.control.resetButton.disabled = false;
  }
  reset(isRace = false) {
    const svgElement = this.elements.img.querySelector(
      "svg.icon-car"
    );
    svgElement.classList.remove("race");
    svgElement.style.animationPlayState = this.animationState.DEFAULT;
    svgElement.style.animationDuration = "";
    this.elements.control.startButton.disabled = isRace;
    this.elements.control.resetButton.disabled = true;
  }
  update(car) {
    this.car = car;
    this.elements.name.innerText = car.name;
    const svgElement = this.elements.img.querySelector(
      "svg.icon-car"
    );
    if (svgElement) {
      svgElement.style.fill = car.color;
    }
  }
  init() {
    const { root } = this.elements;
    root.className = "car";
    const rowTop = document.createElement("div");
    rowTop.className = "car__row-top";
    const { selectButton } = this.elements.control;
    selectButton.innerText = "SELECT";
    selectButton.className = "button";
    rowTop.append(selectButton);
    const { removeButton } = this.elements.control;
    removeButton.innerText = "REMOVE";
    removeButton.className = "button";
    rowTop.append(removeButton);
    const { name } = this.elements;
    name.className = "car__name";
    name.innerText = this.car.name;
    rowTop.append(name);
    root.append(rowTop);
    const row = document.createElement("div");
    row.className = "car__row";
    const { startButton } = this.elements.control;
    startButton.innerText = "A";
    startButton.className = "car__race-button car__race-button_start";
    row.append(startButton);
    const { resetButton: stopButton } = this.elements.control;
    stopButton.innerText = "B";
    stopButton.className = "car__race-button car__race-button_stop";
    stopButton.disabled = true;
    row.append(stopButton);
    const { img } = this.elements;
    img.className = "car__img";
    const carImage = this.createSvgIcon("BMW-1-Series-Hatchback-2007");
    const flagImage = this.createSvgIconFlag("flag");
    img.append(carImage);
    img.append(flagImage);
    row.append(img);
    root.append(row);
    this.setListeners();
  }
  setListeners() {
    this.elements.control.selectButton.onclick = this.clickSelectButton;
    this.elements.control.removeButton.onclick = this.clickDeleteButton;
    this.elements.control.startButton.onclick = this.clickStartButton;
    this.elements.control.resetButton.onclick = this.clickResetButton;
  }
  createSvgIcon(iconId) {
    const svgElement = document.createElementNS(
      this.svgNamespace,
      "svg"
    );
    svgElement.setAttribute("class", "icon-car");
    svgElement.style.fill = this.car.color;
    const useElement = document.createElementNS(
      this.svgNamespace,
      "use"
    );
    useElement.setAttribute("href", `./sprite.svg#${iconId}`);
    svgElement.appendChild(useElement);
    return svgElement;
  }
  createSvgIconFlag(iconId) {
    const svgElement = document.createElementNS(
      this.svgNamespace,
      "svg"
    );
    svgElement.setAttribute("class", "icon-flag");
    svgElement.style.fill = "red";
    const useElement = document.createElementNS(
      this.svgNamespace,
      "use"
    );
    useElement.setAttribute("href", `./sprite.svg#${iconId}`);
    svgElement.appendChild(useElement);
    return svgElement;
  }
}
class GarageView {
  constructor(emitter) {
    __publicField(this, "emitter");
    __publicField(this, "elements");
    __publicField(this, "DEFAULT_NAME", "");
    __publicField(this, "CARS_ON_PAGE", 7);
    __publicField(this, "carsBlocks", []);
    __publicField(this, "selectCarId", null);
    __publicField(this, "paginationChoice", {
      hasPrevPage: false,
      hasNextPage: false
    });
    __publicField(this, "raceStartCar", (val) => {
      const { id } = val;
      const { driveTime } = val;
      const { isRace } = val;
      if (id && typeof id === "number" && driveTime && typeof driveTime === "number") {
        const car = this.carsBlocks.find((carElem) => carElem.id === id);
        if (car) {
          car.start(driveTime, isRace);
        }
      }
    });
    __publicField(this, "raceStopCar", (val) => {
      const { id } = val;
      if (id && typeof id === "number") {
        const car = this.carsBlocks.find((carElem) => carElem.id === id);
        if (car) {
          car.stop();
        }
      }
    });
    __publicField(this, "raceResetCar", (val) => {
      const { id } = val;
      const { isRace } = val;
      if (id) {
        const car = this.carsBlocks.find((carElem) => carElem.id === id);
        if (car) {
          car.reset(isRace);
        }
      }
    });
    __publicField(this, "carUpdate", (val) => {
      const { car } = val;
      if (car && car instanceof Car) {
        const carElement = this.carsBlocks.find(
          (carElem) => carElem.id === car.id
        );
        if (carElement) {
          carElement.update(car);
        }
      }
    });
    __publicField(this, "raceStart", () => {
      this.elements.createCar.name.disabled = true;
      this.elements.createCar.color.disabled = true;
      this.elements.createCar.button.disabled = true;
      this.elements.controlButton.race.disabled = true;
      this.elements.controlButton.reset.disabled = true;
      this.elements.controlButton.generate.disabled = true;
      this.elements.pagination.prevBtn.disabled = true;
      this.elements.pagination.nextBtn.disabled = true;
      this.carsBlocks.forEach((car) => {
        car.blockControlsTrue();
      });
    });
    __publicField(this, "raceStop", () => {
      this.elements.createCar.name.disabled = false;
      this.elements.createCar.color.disabled = false;
      this.elements.createCar.button.disabled = false;
      this.elements.controlButton.race.disabled = false;
      this.elements.controlButton.reset.disabled = false;
      this.elements.controlButton.generate.disabled = false;
      this.elements.pagination.prevBtn.disabled = !this.paginationChoice.hasPrevPage;
      this.elements.pagination.nextBtn.disabled = !this.paginationChoice.hasNextPage;
      this.carsBlocks.forEach((car) => {
        car.blockControlFalse();
      });
    });
    this.emitter = emitter;
    this.elements = {
      root: document.createElement("div"),
      title: {
        totalCount: document.createElement("span"),
        page: document.createElement("span")
      },
      createCar: {
        name: document.createElement("input"),
        color: document.createElement("input"),
        button: document.createElement("button")
      },
      updateCar: {
        name: document.createElement("input"),
        color: document.createElement("input"),
        button: document.createElement("button")
      },
      controlButton: {
        race: document.createElement("button"),
        reset: document.createElement("button"),
        generate: document.createElement("button")
      },
      cars: document.createElement("div"),
      pagination: {
        prevBtn: document.createElement("button"),
        nextBtn: document.createElement("button")
      },
      winner: document.createElement("div")
    };
    this.setEventListeners();
    this.init();
  }
  getElement() {
    return this.elements.root;
  }
  setVisibility(visibility) {
    if (visibility) {
      this.elements.root.classList.remove("hidden");
    } else {
      this.elements.root.classList.add("hidden");
    }
  }
  setCars(cars, total, page) {
    const hasCars = cars.length > 0;
    this.elements.controlButton.race.disabled = !hasCars;
    this.elements.controlButton.reset.disabled = !hasCars;
    this.clearInputBlock("update");
    this.elements.title.totalCount.innerText = total.toString();
    this.elements.title.page.innerText = page.toString();
    this.paginationChoice.hasPrevPage = page > 1;
    this.paginationChoice.hasNextPage = page * this.CARS_ON_PAGE < total;
    this.elements.pagination.prevBtn.disabled = !this.paginationChoice.hasPrevPage;
    this.elements.pagination.nextBtn.disabled = !this.paginationChoice.hasNextPage;
    this.elements.cars.innerHTML = "";
    const carBlocks = [];
    cars.forEach((car) => {
      const carBlock = new CarBlock(this.emitter, car);
      carBlocks.push(carBlock);
      this.elements.cars.append(carBlock.root);
    });
    this.carsBlocks = carBlocks;
  }
  init() {
    const { root } = this.elements;
    root.className = "page__garage garage";
    const newCar = this.createNewCarBlock();
    root.append(newCar);
    const updateCar = this.createUpdateCarBlock();
    root.append(updateCar);
    const controlButtons = this.createControlButtons();
    root.append(controlButtons);
    const garageTitle = document.createElement("h1");
    garageTitle.className = "garage__title";
    garageTitle.append("Garage (", this.elements.title.totalCount, ")");
    root.append(garageTitle);
    const garagePage = document.createElement("h2");
    garagePage.className = "garage__subtitle";
    garagePage.append("Page #", this.elements.title.page);
    root.append(garagePage);
    this.elements.cars.className = "garage__cars car";
    root.append(this.elements.cars);
    const pagination = this.createPagination();
    root.append(pagination);
  }
  setEventListeners() {
    this.emitter.on(Events.RaceStartCar, this.raceStartCar);
    this.emitter.on(Events.RaceStopCar, this.raceStopCar);
    this.emitter.on(Events.RaceResetCar, this.raceResetCar);
    this.emitter.on(Events.RaceStart, this.raceStart);
    this.emitter.on(Events.RaceStop, this.raceStop);
    this.emitter.on(Events.CarUpdate, this.carUpdate);
  }
  createInputBlock(type) {
    const element = document.createElement("div");
    element.className = `garage__${type}-car garage-blocks`;
    const { name } = this.elements[`${type}Car`];
    name.className = "garage__name-input";
    element.append(name);
    name.onanimationend = () => {
      name.classList.remove("shake");
    };
    const { color } = this.elements[`${type}Car`];
    color.className = "garage__color-input";
    color.type = "color";
    color.value = DEFAULT_COLOR;
    element.append(color);
    const { button } = this.elements[`${type}Car`];
    button.className = "button-choice button";
    button.innerText = type.toLocaleUpperCase();
    element.append(button);
    return element;
  }
  createNewCarBlock() {
    const newCarBlock = this.createInputBlock("create");
    this.elements.createCar.button.onclick = () => {
      const { name } = this.elements.createCar;
      const { color } = this.elements.createCar;
      if (name.value === this.DEFAULT_NAME) {
        name.classList.add("shake");
      } else {
        this.emitter.emit(Events.ClickCreateCarButton, {
          name: name.value,
          color: color.value
        });
        this.clearInputBlock("create");
      }
    };
    return newCarBlock;
  }
  createUpdateCarBlock() {
    const editCar = this.createInputBlock("update");
    this.clearInputBlock("update");
    this.elements.updateCar.button.onclick = () => {
      const { name } = this.elements.updateCar;
      const { color } = this.elements.updateCar;
      const id = this.selectCarId;
      if (name.value === this.DEFAULT_NAME) {
        name.classList.add("shake");
      } else if (id) {
        this.emitter.emit(Events.ClickUpdateCarButton, {
          id,
          name: name.value,
          color: color.value
        });
        this.clearInputBlock("update");
      }
    };
    this.emitter.on(Events.ClickSelectCarButton, (val) => {
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
  clearInputBlock(type) {
    const inputBlock = this.elements[`${type}Car`];
    inputBlock.name.value = this.DEFAULT_NAME;
    inputBlock.color.value = DEFAULT_COLOR;
    if (type === "update") {
      this.selectCarId = null;
      inputBlock.name.disabled = true;
      inputBlock.color.disabled = true;
      inputBlock.button.disabled = true;
    }
  }
  createControlButtons() {
    const controlsButtons = document.createElement("div");
    controlsButtons.className = "garage__controls garage-blocks";
    const { race } = this.elements.controlButton;
    race.className = "garage__button-control button";
    race.innerText = "RACE";
    race.onclick = () => {
      this.emitter.emit(Events.ClickRaceButton, {});
    };
    controlsButtons.append(race);
    const { reset } = this.elements.controlButton;
    reset.className = "garage__button-control button";
    reset.innerText = "RESET";
    reset.onclick = () => {
      this.emitter.emit(Events.ClickResetButton, {});
    };
    controlsButtons.append(reset);
    const { generate } = this.elements.controlButton;
    generate.className = "garage__button-generate button";
    generate.innerText = "GENERATE CARS";
    generate.onclick = () => {
      this.emitter.emit(Events.ClickGenerateButton, {});
    };
    controlsButtons.append(generate);
    return controlsButtons;
  }
  createPagination() {
    const pagination = document.createElement("div");
    pagination.className = "garage__pagination pagination garage-blocks";
    const { prevBtn } = this.elements.pagination;
    prevBtn.className = "pagination__button button";
    prevBtn.innerText = "PREV";
    prevBtn.disabled = true;
    prevBtn.onclick = () => {
      this.emitter.emit(Events.ClickGaragePrevButton, {});
    };
    pagination.append(prevBtn);
    const { nextBtn } = this.elements.pagination;
    nextBtn.className = "pagination__button button";
    nextBtn.innerText = "NEXT";
    nextBtn.disabled = true;
    nextBtn.onclick = () => {
      this.emitter.emit(Events.ClickGarageNextButton, {});
    };
    pagination.append(nextBtn);
    return pagination;
  }
}
class WinnersView {
  constructor(emitter) {
    __publicField(this, "emitter");
    __publicField(this, "elements");
    this.emitter = emitter;
    this.elements = {
      root: document.createElement("div"),
      title: {
        totalCount: document.createElement("span"),
        page: document.createElement("span")
      },
      table: {
        head: {
          idSort: document.createElement("span"),
          winsSort: document.createElement("span"),
          timeSort: document.createElement("span")
        },
        body: document.createElement("tbody")
      },
      pagination: {
        prevButton: document.createElement("button"),
        nextButton: document.createElement("button")
      }
    };
    this.init();
  }
  getElement() {
    return this.elements.root;
  }
  setVisibility(visibility) {
    const { root } = this.elements;
    if (visibility) {
      root.classList.remove("hidden");
    } else {
      root.classList.add("hidden");
    }
  }
  init() {
    const { root } = this.elements;
    root.className = "page__winners winners";
    const title = document.createElement("h2");
    title.className = "winners__title";
    title.append("Winners (", this.elements.title.totalCount, ")");
    root.append(title);
    const pageTitle = document.createElement("h3");
    pageTitle.className = "winners__subtitle";
    pageTitle.append("Page #", this.elements.title.page);
    root.append(pageTitle);
    const table = this.createWinnerTable();
    root.append(table);
    const pagination = this.createPagination();
    root.append(pagination);
  }
  createWinnerTable() {
    const tableWinners = document.createElement("table");
    tableWinners.className = "winners__table table";
    const headTable = document.createElement("thead");
    headTable.className = "table__head";
    const createThTable = (name, sortValue) => {
      const th = document.createElement("th");
      th.className = "table__th";
      th.innerText = name;
      if (sortValue) {
        const span = this.elements.table.head[`${sortValue}Sort`];
        th.classList.add("table__th_sort");
        th.append(span);
        th.onclick = () => {
          this.emitter.emit(Events.ClickWinnersSort, { sortValue });
        };
      }
      return th;
    };
    const thNumber = createThTable("Number");
    headTable.append(thNumber);
    const thId = createThTable("Id", SortValue.Id);
    headTable.append(thId);
    const thCar = createThTable("Car");
    headTable.append(thCar);
    const thName = createThTable("Name");
    headTable.append(thName);
    const thWins = createThTable("Wins", SortValue.Wins);
    headTable.append(thWins);
    const thTime = createThTable("Best time(seconds)", SortValue.Time);
    headTable.append(thTime);
    tableWinners.append(headTable);
    tableWinners.append(this.elements.table.body);
    return tableWinners;
  }
  createPagination() {
    const pagination = document.createElement("div");
    pagination.className = "winners__pagination pagination";
    const { prevButton } = this.elements.pagination;
    prevButton.className = "pagination__button button";
    prevButton.innerText = "PREV";
    prevButton.disabled = true;
    prevButton.onclick = () => {
      this.emitter.emit(Events.ClickWinnersPrevButton, {});
    };
    pagination.append(prevButton);
    const { nextButton } = this.elements.pagination;
    nextButton.className = "pagination__button button";
    nextButton.innerText = "NEXT";
    nextButton.disabled = true;
    nextButton.onclick = () => {
      this.emitter.emit(Events.ClickWinnersNextButton, {});
    };
    pagination.append(nextButton);
    return pagination;
  }
}
class UnionPage {
  constructor(emitter) {
    __publicField(this, "element");
    __publicField(this, "page");
    __publicField(this, "emitter");
    this.emitter = emitter;
    this.element = document.createElement("div");
    this.page = document.createElement("div");
    this.init();
  }
  // добавляем нужную страницу (в вызове ставим) в UnionPage
  addPage(view) {
    this.page.append(view.getElement());
  }
  getElement() {
    return this.element;
  }
  init() {
    this.element.className = "race";
    const navButtons = document.createElement("div");
    navButtons.className = "race__nav nav";
    const garageButton = this.createNavButton(Page.Garage, "Garage");
    navButtons.append(garageButton);
    const winnersButton = this.createNavButton(Page.Winners, "Winners");
    navButtons.append(winnersButton);
    this.element.append(navButtons);
    this.page.className = "race__page page";
    this.element.append(this.page);
  }
  createNavButton(page, title) {
    const navButton = document.createElement("button");
    navButton.className = "nav__button button";
    navButton.innerText = title;
    navButton.onclick = () => this.emitter.emit(Events.ClickNavButton, { page });
    return navButton;
  }
}
class AppView {
  constructor(emitter) {
    __publicField(this, "emitter");
    __publicField(this, "unionPage");
    __publicField(this, "garageView");
    __publicField(this, "winnersView");
    this.emitter = emitter;
    this.garageView = new GarageView(emitter);
    this.winnersView = new WinnersView(emitter);
    this.unionPage = new UnionPage(emitter);
    document.body.append(this.unionPage.getElement());
    this.unionPage.addPage(this.garageView);
    this.unionPage.addPage(this.winnersView);
  }
  setView(page) {
    if (page === Page.Garage) {
      this.garageView.setVisibility(true);
      this.winnersView.setVisibility(false);
    } else {
      this.garageView.setVisibility(false);
      this.winnersView.setVisibility(true);
    }
  }
  setCars(cars, total, page) {
    this.garageView.setCars(cars, total, page);
  }
}
class App {
  constructor() {
    __publicField(this, "emitter");
    __publicField(this, "commonService");
    __publicField(this, "controller");
    __publicField(this, "view");
    this.emitter = new EventEmitter();
    this.commonService = new CommonService(BASE_URL);
    this.view = new AppView(this.emitter);
    this.controller = new AppControllers(
      this.emitter,
      this.commonService,
      this.view
    );
  }
  start() {
    this.controller.start();
  }
}
const app = new App();
app.start();
