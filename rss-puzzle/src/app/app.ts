import AccessScreen from './components/assembly-main/screen-access';

type AppState = 'access' | 'welcome' | 'game' | 'statistics';

class App {
  private currentState: AppState = 'access';

  constructor() {
    this.init();
  }

  init(): void {
    let accessScreen: AccessScreen;
    switch (this.currentState) {
      case 'access':
        accessScreen = new AccessScreen(() => this.switchState('welcome'));
        document.body.appendChild(accessScreen.render());
        break;
      // Предполагаем добавление других состояний по аналогии
      default:
    }
  }

  switchState(newState: AppState): void {
    this.currentState = newState;
    document.body.innerHTML = '';
    this.init();
  }
}

export default App;
