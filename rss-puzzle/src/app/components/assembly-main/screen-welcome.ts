import ArticleWelcomeComponent from '../article-welcome/article-welcome';

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

    return articleWelcomeElement;
  }
}
export default WelcomeScreen;
