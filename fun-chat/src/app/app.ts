import AccessView from './components/view/access';
import AboutView from './components/view/about';

class App {
  private currentView: AccessView | AboutView | null = null;

  constructor() {
    window.addEventListener('hashchange', this.route);
    window.addEventListener('load', this.route);
  }

  private route = (): void => {
    if (this.currentView) {
      document.body.removeChild(this.currentView.container);
      this.currentView = null;
    }

    switch (window.location.hash) {
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
