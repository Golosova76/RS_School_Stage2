export class Winner {
  public id: number;

  public wins: number;

  public time: number;

  constructor(id: number, wins: number, time: number) {
    this.id = id;
    this.wins = wins;
    this.time = time;
  }
}

export const LIMIT_PAGE_WINNER = 10;

export const WINNERS_DEFAULT_PAGE = 1;
