import { HttpMethod, LIMIT_PAGE_WINNER } from '../common-types';
import Winner from '../../../components/model/winner-class';

class WinnerService {
  private baseUrl: string;

  private HEADER = { 'Content-Type': 'application/json' };

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/winners`;
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

  // Получение победителя
  public async getWinner(id: number): Promise<Winner | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (response.ok) {
      const json: unknown = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }
    return null;
  }

  // Получение победителей
  public async getWinners(page: number): Promise<Winner[]> {
    const response = await fetch(
      `${this.baseUrl}?_limit=${LIMIT_PAGE_WINNER}&_page=${page}`
    );
    if (response.ok) {
      const json: unknown = await response.json();
      const cars = WinnerService.getWinners(json);
      return cars;
    }

    throw Error(`${response.status}`);
  }

  // Создание нового победителя
  public async createWinner(
    id: number,
    wins: number,
    time: number
  ): Promise<Winner> {
    const response = await fetch(this.baseUrl, {
      method: HttpMethod.Post,
      headers: this.HEADER,
      body: JSON.stringify({ id, wins, time }),
    });
    if (response.ok) {
      const json: unknown = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }

    throw Error(`Can't create winner ${response.status}`);
  }

  // Обновление победителя
  public async updateWinner(
    id: number,
    wins: number,
    time: number
  ): Promise<Winner> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Put,
      headers: this.HEADER,
      body: JSON.stringify({ wins, time }),
    });
    if (response.ok) {
      const json: unknown = await response.json();
      const winner = WinnerService.getWinner(json);
      return winner;
    }

    throw Error(`Can't update winner ${response.status}`);
  }

  // Удаление победителя в ТЗ нет
  public async deleteWinner(id: number): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: HttpMethod.Delete,
    });
    if (response.ok) {
      return true;
    }
    return false;
  }

  // проверка ответа сервера и создание экземпляра winner
  private static getWinner(json: unknown): Winner {
    if (
      json &&
      typeof json === 'object' &&
      'id' in json &&
      'wins' in json &&
      'time' in json &&
      typeof json.id === 'number' &&
      typeof json.wins === 'number' &&
      typeof json.time === 'number'
    ) {
      const { id } = json;
      const { wins } = json;
      const { time } = json;
      return new Winner(id, wins, time); // здесь инициализировать?
    }
    throw Error(`Can't get winner json: ${json}`);
  }

  // проверка ответа сервера и создание экземпляр winners
  private static getWinners(jsonArray: unknown): Winner[] {
    if (!Array.isArray(jsonArray)) {
      throw Error('Expected an array of car json objects');
    }

    const winners: Winner[] = jsonArray.map((value) => {
      return WinnerService.getWinner(value);
    });
    return winners;
  }
}

export default WinnerService;
