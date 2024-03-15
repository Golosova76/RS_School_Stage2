import { Component, InterComponent } from '../base-component';

class GameBlockPuzzles extends Component<InterComponent> {
  public gamePuzzles!: Component<InterComponent>;

  public gameWords: Component<InterComponent>[];

  constructor() {
    super({ tag: 'div', className: 'game__block' });
    this.gameWords = [];
    // Вызов метода для создания и добавления элементов формы
    this.createGameBlockComponents();
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
}

export default GameBlockPuzzles;
