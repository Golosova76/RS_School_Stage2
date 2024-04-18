class WebSocketClient {
  private socket: WebSocket | null = null;

  private url: string;

  // идентификатор для отслеживания отдельных запросов, увеличивается с каждым новым запросом.
  private requestId: number = 0;

  // массив функций-обработчиков сообщений, которые вызываются при получении сообщения.
  // может потребоваться выполнить несколько различных действий при получении одного! сообщения
  private messageHandlers: Array<(event: MessageEvent) => void> = [];

  constructor(url: string) {
    this.url = url;
  }

  // Создаёт новый объект WebSocket и устанавливает обработчики событий: onopen, onmessage, onerror, и onclose
  public connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = (event: MessageEvent) => {
      console.log('Message received: ', event.data);
      this.handleMessage(event);
    };
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  private handleOpen(): void {
    console.log('WebSocket connection established.');
  }

  private handleMessage(event: MessageEvent): void {
    this.messageHandlers.forEach((handler) => handler(event));
  }

  // eslint-disable-next-line class-methods-use-this
  private handleError(event: Event): void {
    console.error('WebSocket error: ', event);
  }

  private handleClose(event: CloseEvent): void {
    console.log('WebSocket connection closed: ', event.reason);
    this.socket = null;
    this.reconnect();
  }

  private reconnect(): void {
    console.log('Attempting to reconnect...');
    setTimeout(() => this.connect(), 5000); // Попытка переподключения через 5 секунд
  }

  // Регистрация нового обработчика сообщений
  public onMessage(handler: (event: MessageEvent) => void): void {
    this.messageHandlers.push(handler);
  }

  // Генерация уникального ID для запроса
  private generateRequestId(): string {
    // eslint-disable-next-line no-plusplus
    this.requestId++;
    return this.requestId.toString();
  }

  // Метод для отправки структурированных запросов
  public sendRequest<PayloadType>(type: string, payload: PayloadType): void {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected.');
      return;
    }

    const request = {
      id: this.generateRequestId(), // Генерация ID для запроса
      type,
      payload,
    };

    this.socket.send(JSON.stringify(request));
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketClient = new WebSocketClient('ws://127.0.0.1:4000');

webSocketClient.connect();

export default webSocketClient;
