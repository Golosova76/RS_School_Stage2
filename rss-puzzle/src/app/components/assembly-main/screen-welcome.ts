import ArticleWelcomeComponent from '../article-welcome/article-welcome';
import ButtonComponent from '../button/button';
import GameUser from '../../services/user/local-storage';

class WelcomeScreen {
  private onLoginSuccess: () => void;

  constructor(onLoginSuccess: () => void) {
    this.onLoginSuccess = onLoginSuccess;
  }

  // eslint-disable-next-line class-methods-use-this
  render(): HTMLElement {
    const startButton = new ButtonComponent({
      className: 'start-button',
      text: 'Start',
      type: 'submit',
    });
    // Создание экземпляра article
    const articleWelcome = new ArticleWelcomeComponent();
    articleWelcome.appendToArticleWDirectly(startButton);

    const articleWelcomeElement: HTMLElement =
      articleWelcome.getNode() as HTMLElement;

    // экземпляр GameUser, auto загружает данные из localStorage
    const gameUser = new GameUser();
    const name = gameUser.gameName ?? '';
    const surname = gameUser.gameSurname ?? '';

    articleWelcome.setUserGreeting(name, surname);

    startButton.addListener('click', (event) => {
      event.preventDefault(); // Предотвращаем отправку формы, если это submit button
      this.onLoginSuccess();
      document.body.classList.remove('welcome-body'); // Вызов метода для перехода на следующий экран
    });

    return articleWelcomeElement;
  }
}
export default WelcomeScreen;
