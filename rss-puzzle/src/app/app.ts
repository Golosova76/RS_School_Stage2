import FooterComponent from './components/footer/footer';

import HeaderComponent from './components/header/header';

import ComponentAssemblerAccess from './components/assembly-main/main-access';

type AppState = 'access' | 'welcome' | 'game' | 'statistics';

class App {
  private currentState: AppState = 'access';

  private appContainer: HTMLElement;

  constructor() {
    document.body.classList.add('body');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    // Добавление wrapper в body
    document.body.appendChild(wrapper);
    this.appContainer = wrapper;
    // this.appContainer = document.querySelector('.body') as HTMLElement;
    this.init();
  }

  init(): void {
    this.renderHeader();
    this.renderMain();
    this.renderFooter();
  }

  renderHeader(): void {
    const header = new HeaderComponent();
    this.appContainer.appendChild(header.getNode());
  }

  renderMain(): void {
    const mainContent = ComponentAssemblerAccess.assembleMainContent();
    this.appContainer.appendChild(mainContent.getNode());
  }

  renderFooter(): void {
    const footer = new FooterComponent();
    this.appContainer.appendChild(footer.getNode());
  }
}

export default App;
