import HeaderComponent from './components/header/header';
import MainComponent from './components/main/main';
import FooterComponent from './components/footer/footer';
import AccessScreen from './components/assembly-main/screen-access';
import WelcomeScreen from './components/assembly-main/screen-welcome';
import GameScreen from './components/assembly-main/screen-game';
import EventEmitter from './utils/event-emitter';
// import LogoutHandler from './services/user/logout';

type AppState = 'access' | 'welcome' | 'game' | 'statistics';

class App {
  private currentState: AppState = 'access';

  private wrapper: HTMLElement;

  private mainComponent!: MainComponent;

  constructor() {
    // document.body.classList.add('body');
    this.wrapper = document.createElement('div'); // Инициализация wrapper
    this.wrapper.classList.add('wrapper'); // Добавление класса
    document.body.appendChild(this.wrapper);
    const savedState = localStorage.getItem('currentState') as AppState | null;
    this.currentState = savedState || 'access'; // Если сохраненного состояния нет, то 'access'
    this.initHeader();
    this.initMainComponent();
    this.initFooter();
    this.init();
    // подписка на событие logout
    EventEmitter.on('logout', this.handleLogout.bind(this));
  }

  private handleLogout() {
    // Обработчик выхода из системы
    this.switchState('access');
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
    let welcomeScreen: WelcomeScreen;
    let gameScreen: GameScreen;
    switch (this.currentState) {
      case 'access':
        accessScreen = new AccessScreen(() => this.switchState('welcome'));
        this.mainComponent.appendToContainer(accessScreen.render());
        break;
      case 'welcome':
        welcomeScreen = new WelcomeScreen(() => this.switchState('game'));
        this.mainComponent.appendToContainer(welcomeScreen.render());
        document.body.classList.add('welcome-body');
        break;
      case 'game':
        gameScreen = new GameScreen(() => this.switchState('statistics'));
        this.mainComponent.appendToContainer(gameScreen.render());
        document.body.classList.add('game-body');
        break;
      // Предполагаем добавление других состояний по аналогии
      default:
    }
  }

  switchState(newState: AppState): void {
    this.currentState = newState;
    localStorage.setItem('currentState', newState); // Сохранение в localStorage
    this.wrapper.innerHTML = '';
    this.initHeader(); // Переинициализация хедера, мейна и футера после очистки
    this.initMainComponent();
    this.initFooter();
    this.init();
  }
}

export default App;
