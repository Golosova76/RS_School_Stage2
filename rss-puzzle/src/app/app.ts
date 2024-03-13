import HeaderComponent from './components/header/header';
import MainComponent from './components/main/main';
import FooterComponent from './components/footer/footer';
import AccessScreen from './components/assembly-main/screen-access';

type AppState = 'access' | 'welcome' | 'game' | 'statistics';

class App {
  private currentState: AppState = 'access';

  private wrapper: HTMLElement;

  private mainComponent!: MainComponent;

  constructor() {
    document.body.classList.add('body');
    this.wrapper = document.createElement('div'); // Инициализация wrapper
    this.wrapper.classList.add('wrapper'); // Добавление класса
    document.body.appendChild(this.wrapper);
    this.initHeader();
    this.initMainComponent();
    this.initFooter();
    this.init();
  }

  private initHeader(): void {
    const header = new HeaderComponent();
    this.wrapper.appendChild(header.getNode());
  }

  private initMainComponent(): void {
    this.mainComponent = new MainComponent();
    this.wrapper.appendChild(this.mainComponent.getNode());
  }

  private initFooter(): void {
    const footer = new FooterComponent();
    this.wrapper.appendChild(footer.getNode());
  }

  init(): void {
    let accessScreen: AccessScreen;
    switch (this.currentState) {
      case 'access':
        accessScreen = new AccessScreen(() => this.switchState('welcome'));
        this.mainComponent.appendToContainer(accessScreen.render());
        break;
      // Предполагаем добавление других состояний по аналогии
      default:
    }
  }

  switchState(newState: AppState): void {
    this.currentState = newState;
    this.wrapper.innerHTML = '';
    this.initHeader(); // Переинициализация хедера, мейна и футера после очистки
    this.initMainComponent();
    this.initFooter();
    this.init();
  }
}

export default App;
