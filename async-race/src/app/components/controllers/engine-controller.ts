import { HttpMethod } from '../../services/api-service/common-types';
import {
  EngineActions,
  EngineParameters,
  ResponseCode,
} from '../../services/api-service/engine/engine';

class EngineController {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = `${baseUrl}/engine`;
  }

  public async start(carId: number): Promise<EngineParameters> {
    const status = EngineActions.Started;
    const resp = await this.request(status, carId);
    if (resp.ok) {
      const json: unknown = await resp.json();
      return EngineController.getEngineParametersFromJson(
        json,
        EngineActions.Started
      );
    }
    const errorMsg = EngineController.getErrorMessage(resp, status, carId);
    throw Error(errorMsg);
  }

  public async stop(carId: number): Promise<EngineParameters> {
    const status = EngineActions.Stopped;
    const resp = await this.request(status, carId);
    if (resp.ok) {
      const json: unknown = await resp.json();
      return EngineController.getEngineParametersFromJson(
        json,
        EngineActions.Started
      );
    }
    const errorMsg = EngineController.getErrorMessage(resp, status, carId);
    throw Error(errorMsg);
  }

  public async drive(carId: number): Promise<boolean> {
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

  private async request(
    status: EngineActions,
    carId: number
  ): Promise<Response> {
    const queryString = `id=${carId}&status=${status}`;
    const resp = await fetch(`${this.baseUrl}?${queryString}`, {
      method: HttpMethod.Patch,
    });
    return resp;
  }

  private static getErrorMessage(
    resp: Response,
    status: EngineActions,
    carId: number
  ): string {
    let message: string;
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

  private static getEngineParametersFromJson(
    json: unknown,
    status: EngineActions
  ): EngineParameters {
    if (
      json &&
      typeof json === 'object' &&
      'velocity' in json &&
      typeof json.velocity === 'number' &&
      'distance' in json &&
      typeof json.distance === 'number'
    ) {
      return {
        velocity: json.velocity,
        distance: json.distance,
      };
    }

    throw Error(
      `Engine ${status}: incorrect json response: ${JSON.stringify(json)}`
    );
  }
}

export default EngineController;
