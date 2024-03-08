import FooterComponent from './components/footer/footer';

import HeaderComponent from './components/header/header';

type AppState = 'access' | 'welcome' | 'game' | 'statistics';

class App {
  private currentState: AppState = 'access';

  private appContainer: HTMLElement;

  constructor() {
    document.body.classList.add('body');
    this.appContainer = document.querySelector('.body') as HTMLElement;
    this.init();
  }

  init(): void {
    this.renderHeader();
    // this.updateMain();
    this.renderFooter();
  }

  renderHeader(): void {
    const header = new HeaderComponent();
    this.appContainer.appendChild(header.getNode());
  }

  // updateMain(): void {}

  renderFooter(): void {
    const footer = new FooterComponent();
    this.appContainer.appendChild(footer.getNode());
  }
}

export default App;
