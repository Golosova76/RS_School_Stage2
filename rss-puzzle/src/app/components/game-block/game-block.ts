import { Component, InterComponent } from '../base-component';
import DynamicSizeManager from '../../services/words/dinamic-width';
import GameBlockButtons from './game-buttons';
import ButtonComponent from '../button/button';

class GameBlockPuzzles extends Component<InterComponent> {
  public gamePuzzles!: Component<InterComponent>;

  public gameBlockButtons!: Component<InterComponent>;

  public gameWords: Component<InterComponent>[];

  constructor() {
    super({ tag: 'div', className: 'game__block' });
    this.gameWords = [];
    // Вызов метода для создания и добавления элементов формы
    this.createGameBlockComponents();
    this.getGameButtonContinue();
  }

  private createGameBlockComponents() {
    // общий div для 10 предложений
    const gameResults = new Component<InterComponent>({
      tag: 'div',
      className: 'game__results',
    });
    this.append(gameResults);

    // Цикл для создания 10 предложений
    for (let i = 1; i <= 10; i += 1) {
      // div для одного предложения и цифры
      const gameResult = new Component<InterComponent>({
        tag: 'div',
        className: 'game__result',
      });
      gameResults.append(gameResult);

      // span для цифры
      const gameSpanNumber = new Component<InterComponent>({
        tag: 'span',
        text: `${i}`, // Здесь i будет вашим номером предложения
        className: 'game__number',
      });
      gameResult.append(gameSpanNumber);

      // div для слов предложения
      const gameDivWords = new Component<InterComponent>({
        tag: 'div',
        className: 'game__words',
      });
      gameResult.append(gameDivWords);
      this.gameWords.push(gameDivWords); // Сохраняем gameDivWords в массив для доступа
    }

    // div для 1 предложения
    this.gamePuzzles = new Component<InterComponent>({
      tag: 'div',
      className: 'game__puzzles',
    });
    this.append(this.gamePuzzles);

    // добавление блока с кнопками
    this.gameBlockButtons = new GameBlockButtons();
    this.append(this.gameBlockButtons);

    // audio
    const audioGame = new Component<InterComponent>({
      tag: 'audio',
      className: 'game__audio',
    });
    this.append(audioGame);

    // audio
    const sourceGame = new Component<InterComponent>({
      tag: 'source',
      className: 'game__source',
      type: 'audio/mpeg',
    });
    sourceGame.setAttribute('src', '../../../../public/zvonkiy-schelchok.mp3');
    sourceGame.setAttribute('type', 'audio/mpeg');
    audioGame.append(sourceGame);
  }

  // eslint-disable-next-line class-methods-use-this
  public addWordsToContainer(
    words: string[],
    gamePuzzles: Component<InterComponent>
  ): void {
    console.log('Добавление слов в контейнер:', words);
    words.forEach((word) => {
      const wordSpan = new Component<InterComponent>({
        tag: 'span',
        className: 'game__puzzle',
        text: word,
      });

      // Получаем DOM-элемент спана
      const node = wordSpan.getNode(); // если getNode() возвращает HTMLElement
      if (node instanceof HTMLElement) {
        DynamicSizeManager.applyStyles(node, word, words.length); // Применяем стили
      }

      gamePuzzles.append(wordSpan); // Добавляем спан в контейнер
    });
  }

  // Метод для перемещения слов из одного контейнера в другой
  // eslint-disable-next-line class-methods-use-this
  public moveWordToContainer(
    wordElement: HTMLElement,
    targetContainer: HTMLElement
  ): void {
    targetContainer.appendChild(wordElement);
  }

  public getGameButtonContinue(): ButtonComponent | null {
    const gameBlockButtons = this.gameBlockButtons as GameBlockButtons;
    return gameBlockButtons.getGameButtonContinue();
  }

  public getGameButtonCheck(): ButtonComponent | null {
    const gameBlockButtons = this.gameBlockButtons as GameBlockButtons;
    return gameBlockButtons.getGameButtonCheck();
  }

  public getGameButtonAuto(): ButtonComponent | null {
    const gameBlockButtons = this.gameBlockButtons as GameBlockButtons;
    return gameBlockButtons.getGameButtonAuto();
  }

  public getGameButtonLogout(): ButtonComponent | null {
    const gameBlockButtons = this.gameBlockButtons as GameBlockButtons;
    return gameBlockButtons.getGameButtonLogout();
  }
}

export default GameBlockPuzzles;
