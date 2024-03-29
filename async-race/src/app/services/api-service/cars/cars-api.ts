import Car from '../../../components/model/car-class';
import { HttpMethod, LIMIT_PAGE_CAR } from '../common-types';

class CarService {
  private baseUrl: string;

  private HEADER = { 'Content-Type': 'application/json' };

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/garage`;
  }

  // обработка X-Total-Count
  public async getTotalCount(): Promise<number> {
    const limit = 0;
    const response = await fetch(`${this.baseUrl}?_limit=${limit}`);
    const totalHeader = response.headers.get('X-Total-Count');
    if (totalHeader === null) {
      throw Error("Header 'X-Total-Count' is not available");
    }
    const total = parseInt(totalHeader, 10);
    return total;
  }

  // Получение автомобилей
  public async getCars(page: number): Promise<Car[]> {
    const response = await fetch(
      `${this.baseUrl}?_limit=${LIMIT_PAGE_CAR}&_page=${page}`
    );
    if (response.ok) {
      const json: unknown = await response.json();
      const cars = CarService.getCars(json);
      return cars;
    }

    throw Error(`${response.status}`);
  }

  // Получение автомобиля
  public async getCar(id: number): Promise<Car | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.ok) {
      const json: unknown = await response.json();
      const car = CarService.getCar(json);
      return car;
    }
    return null;
  }

  // Создание нового автомобиля
  public async createCar(name: string, color: string): Promise<Car> {
    const response = await fetch(this.baseUrl, {
      method: HttpMethod.Post,
      headers: this.HEADER,
      body: JSON.stringify({ name, color }),
    });
    if (response.ok) {
      const json: unknown = await response.json(); // возврат объекта с сервера
      const car = CarService.getCar(json);
      return car;
    }
    throw new Error(`Can't create car: ${response.status}`);
  }

  // Обновление автомобиля
  public async updateCar(
    id: number,
    name: string,
    color: string
  ): Promise<Car> {
    const response = await fetch(this.baseUrl, {
      method: HttpMethod.Put,
      headers: this.HEADER,
      body: JSON.stringify({ name, color }),
    });
    if (response.ok) {
      const json: unknown = await response.json();
      // опять создавать через new?????????
      const car = CarService.getCar(json);
      return car;
    }
    throw new Error(`Can't update car: ${response.status}`);
  }

  // Удаление автомобиля
  public async deleteCar(id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Delete,
    });
    if (response.ok) {
      return true;
    }
    return false;
  }

  // проверка ответа сервера и создание экземпляра car
  private static getCar(json: unknown): Car {
    if (
      json &&
      typeof json === 'object' &&
      'id' in json &&
      'name' in json &&
      'color' in json &&
      typeof json.id === 'number' &&
      typeof json.name === 'string' &&
      typeof json.color === 'string'
    ) {
      const { id } = json;
      const { name } = json;
      const { color } = json;
      return new Car(id, name, color); // здесь инициализировать?
    }
    throw Error(`Can't get car json: ${json}`);
  }

  // проверка ответа сервера и создание экземпляр cars
  private static getCars(jsonArray: unknown): Car[] {
    if (!Array.isArray(jsonArray)) {
      throw Error('Expected an array of car json objects');
    }

    const cars: Car[] = jsonArray.map((value) => {
      return CarService.getCar(value);
    });
    return cars;
  }
}

export default CarService;
