import ArticleWelcomeComponent from '../article-welcome/article-welcome';
import GameUser from '../../services/user/local-storage';

class WelcomeScreen {
  private onLoginSuccess: () => void;

  constructor(onLoginSuccess: () => void) {
    this.onLoginSuccess = onLoginSuccess;
  }

  // eslint-disable-next-line class-methods-use-this
  render(): HTMLElement {
    // Создание экземпляра article
    const articleWelcome = new ArticleWelcomeComponent();
    // articleWelcome.appendToArticleWDirectly(startButton);

    const articleWelcomeElement: HTMLFormElement =
      articleWelcome.getNode() as HTMLFormElement;

    // экземпляр GameUser, auto загружает данные из localStorage
    const gameUser = new GameUser();
    const name = gameUser.gameName ?? '';
    const surname = gameUser.gameSurname ?? '';

    articleWelcome.setUserGreeting(name, surname);

    return articleWelcomeElement;
  }
}
export default WelcomeScreen;
