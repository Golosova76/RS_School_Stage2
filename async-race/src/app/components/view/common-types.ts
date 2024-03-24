import { Car } from '../../services/api-service/cars/cars-types';
import { Winner } from '../../services/api-service/winners/winners-type';

export interface View {
  getElement(): HTMLElement;
}

export interface StatePage {
  currentPage: Page;
  garagePage: number;
  winnersPage: number;
}

export enum Page {
  Garage = 0,
  Winners = 1,
}

export const DEFAULT_COLOR = '#ffffff';

export type EventValue = {
  id?: number;
  name?: string;
  color?: string;
  page?: number;
  total?: number;
  car?: Car;
  winner?: Winner;
  winners?: Winner[];
};

export type EventHandler = (value: EventValue) => void;

export enum Events {
  ClickNavButton = 'click:nav-button',
  SaveStatePage = 'save:state-page',
}
