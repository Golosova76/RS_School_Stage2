import AccessView from './components/view/access';
import AboutView from './components/view/about';
import MainView from './components/view/main-page';
import WebSocketClient from './services/websocket-service';

class App {
  private currentView: AccessView | MainView | AboutView | null = null;

  private webSocketClient: WebSocketClient;

  constructor() {
    const url = 'wss://example.com/websocket';
    this.webSocketClient = new WebSocketClient(url);
    window.addEventListener('hashchange', this.route);
    window.addEventListener('load', this.route);
  }

  private route = (): void => {
    if (this.currentView) {
      document.body.removeChild(this.currentView.container);
      this.currentView = null;
    }

    switch (window.location.hash) {
      case '#main':
        this.currentView = new MainView();
        break;
      case '#about':
        this.currentView = new AboutView();
        break;
      case '#access':
      default:
        this.currentView = new AccessView();
        break;
    }
  };

  public start(): void {
    this.route();
  }
}

export default App;
