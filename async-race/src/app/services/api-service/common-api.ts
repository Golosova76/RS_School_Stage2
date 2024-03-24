import CarService from './cars/cars-api';
import WinnerService from './winners/winners-api';

class CommonService {
  private carsService: CarService;

  private winnersService: WinnerService;

  constructor(url: string) {
    this.carsService = new CarService(url);
    this.winnersService = new WinnerService(url);
  }

  public get cars(): CarService {
    return this.carsService;
  }

  public get winners(): WinnerService {
    return this.winnersService;
  }
}

export default CommonService;
