// eslint-disable-next-line max-classes-per-file
import { RequestSocket, ResponseSocket, ErrorSocket } from './base-interface';

// Базовый класс для запросов
export class BaseRequest<PayloadType> implements RequestSocket<PayloadType> {
  constructor(
    public id: string | null,
    public type: string,
    public payload: PayloadType
  ) {}
}

// Базовый класс для ответов
export class BaseResponse<PayloadType> implements ResponseSocket<PayloadType> {
  constructor(
    public id: string,
    public type: string,
    public payload: PayloadType
  ) {}
}

// Класс для ошибок, использующий IError
export class BaseError
  extends BaseResponse<{ error: string }>
  implements ErrorSocket
{
  constructor(id: string, error: string) {
    super(id, 'ERROR', { error });
  }
}
