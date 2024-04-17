class WebSocketClient {
  private socket: WebSocket;

  private url: string;

  constructor(url: string) {
    this.url = url;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    this.socket.onmessage = (event) => {
      this.handleMessage(event);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
    };
  }
}

export default WebSocketClient;
