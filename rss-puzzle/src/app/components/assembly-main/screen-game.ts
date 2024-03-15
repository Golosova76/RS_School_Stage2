import ArticleGameComponent from '../article-game/article-game';
import WordDataService from '../../services/words/data-service';

class GameScreen {
  private onLoginSuccess: () => void;

  constructor(onLoginSuccess: () => void) {
    this.onLoginSuccess = onLoginSuccess;
  }

  // eslint-disable-next-line class-methods-use-this
  render(): HTMLElement {
    // Создание экземпляра WordDataService
    const wordDataService = new WordDataService();

    // // Создание экземпляра article
    const articleGame = new ArticleGameComponent(wordDataService);
    articleGame.initGameBlockPuzzles();

    const articleGameElement: HTMLElement =
      articleGame.getNode() as HTMLElement;

    return articleGameElement;
  }
}
export default GameScreen;
