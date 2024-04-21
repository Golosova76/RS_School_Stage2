import AccessView from './components/view/access';
import AboutView from './components/view/about';
import MainView from './components/view/main-page';
import webSocketClient from './services/websocket-service';
import userService from './services/user-service';

class App {
  private currentView: AccessView | MainView | AboutView | null = null;

  constructor() {
    window.addEventListener('hashchange', this.route);
    window.addEventListener('load', this.route);
  }

  private route = (): void => {
    const sessionUser = sessionStorage.getItem('loginDataAG');
    if (this.currentView) {
      document.body.removeChild(this.currentView.container);
      this.currentView = null;
    }

    if (!sessionUser) {
      if (window.location.hash !== '#access') {
        window.location.hash = '#access';
      }
    } else if (!userService.isLogined) {
      const userData = JSON.parse(sessionUser ?? '');
      const loginDataAG = {
        user: {
          login: userData.login,
          password: userData.password,
        },
      };
      webSocketClient.sendRequest('USER_LOGIN', loginDataAG);
    }

    switch (window.location.hash) {
      case '#main':
        this.currentView = new MainView();
        this.currentView.fetchUsers();
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
