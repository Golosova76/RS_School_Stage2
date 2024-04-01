import Car from '../model/car-class';
import Winner from '../model/winner-class';

export interface View {
  getElement(): HTMLElement;
}

export const DEFAULT_COLOR = '#ffffff';

export enum SortValue {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

export enum SortData {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type EventValue = {
  id?: number;
  name?: string;
  color?: string;
  page?: number;
  total?: number;
  car?: Car;
  winner?: Winner;
  winners?: Winner[];
  sortValue?: SortValue;
  sortData?: SortData;
  driveTime?: number;
  isRace?: boolean;
};

export type EventHandler = (value: EventValue) => void;

export enum Events {
  ClickNavButton = 'click:nav-button',
  SaveStatePage = 'save:state-page',
  ClickCreateCarButton = 'click:create-car',
  ClickUpdateCarButton = 'click:update-car',
  ClickSelectCarButton = 'click:select-car',
  ClickDeleteCarButton = 'click:delete-car',
  ClickStartCarButton = 'click:start-car',
  ClickResetCarBtn = 'click:stop-car',
  ClickRaceButton = 'click:race',
  ClickResetButton = 'click:reset',
  ClickGenerateButton = 'click:generate-car',
  ClickGaragePrevButton = 'click:garage-prev',
  ClickGarageNextButton = 'click:garage-next',
  ClickWinnersPrevButton = 'click:winners-prev',
  ClickWinnersNextButton = 'click:winners-next',
  ClickWinnersSort = 'click:winners-sort',
  UpdateWinner = 'update:winner',
  CarUpdate = 'car:update',
  CarDelete = 'car:delete',
  SaveState = 'save:state',
  RaceStartCar = 'race:start-car',
  RaceStopCar = 'race:stop-car',
  RaceResetCar = 'race:reset-car',
  RaceStart = 'race:start',
  RaceStop = 'race:stop',
}
