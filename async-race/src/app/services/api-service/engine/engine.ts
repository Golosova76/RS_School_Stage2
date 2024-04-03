import Car from '../../../components/model/car-class';

export enum EngineActions {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export interface EngineParameters {
  velocity: number;
  distance: number;
}

export enum ResponseCode {
  Ok = 200,
  BadRequest = 400,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export interface RaceResult {
  car: Car;
  driveTime: number;
}
