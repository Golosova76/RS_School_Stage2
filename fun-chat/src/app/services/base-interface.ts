// Базовый интерфейс для всех запросов
export interface RequestSocket<PayloadType> {
  id: string | null;
  type: string;
  payload: PayloadType;
}

// Базовый интерфейс для всех ответов
export interface ResponseSocket<PayloadType> {
  id: string;
  type: string;
  payload: PayloadType;
}

// Базовый интерфейс для всех ошибок
export interface ErrorPayloadSocket {
  error: string;
}

// расширение базовый интерфейс для всех ошибок
export interface ErrorSocket extends ResponseSocket<ErrorPayloadSocket> {}
