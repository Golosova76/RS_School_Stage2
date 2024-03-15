import { Component, InterComponent } from '../base-component';
import GameBlockPuzzles from '../game-block/game-block';
import WordDataService from '../../services/words/data-service';

class ArticleGameComponent extends Component<InterComponent> {
  private gameBlockPuzzles: GameBlockPuzzles;

  private wordDataService: WordDataService;

  private level: number;

  private roundIndex: number;

  private sentenceIndex: number;

  constructor(
    wordDataService: WordDataService,
    level: number = 1,
    roundIndex: number = 0,
    sentenceIndex: number = 0
  ) {
    super({ tag: 'article', className: 'article-game' });
    this.gameBlockPuzzles = new GameBlockPuzzles();
    this.wordDataService = wordDataService;
    this.level = level;
    this.roundIndex = roundIndex;
    this.sentenceIndex = sentenceIndex;
    this.initGameBlockPuzzles();
    this.loadAndDisplayWords();
  }

  initGameBlockPuzzles() {
    // добавляем GameBlockPuzzles в DOM и возвращаем его элемент
    this.append(this.gameBlockPuzzles);
    return this.gameBlockPuzzles.getNode();
  }

  async loadAndDisplayWords() {
    try {
      await this.wordDataService.loadData(this.level); // Используем свойство класса this.level
      const words = this.wordDataService.getShuffledSentenceForRound(
        this.roundIndex, // Используем свойство класса this.roundIndex
        this.sentenceIndex // Используем свойство класса this.sentenceIndex
      );

      // Добавляем слова в gamePuzzles используя метод addWordsToContainer
      this.gameBlockPuzzles.addWordsToContainer(
        words,
        this.gameBlockPuzzles.gamePuzzles
      );

      // Инициализация обработчиков клика после того, как слова были добавлены
      this.initPuzzleClickEvents(); // Правильное место для вызова метода
    } catch (error) {
      // console.error('Ошибка:', error);
    }
  }

  private initPuzzleClickEvents(): void {
    this.gameBlockPuzzles.gamePuzzles
      .getChildren()
      .forEach((puzzleComponent) => {
        if (puzzleComponent.getNode) {
          const puzzleNode = puzzleComponent.getNode() as HTMLElement;
          if (puzzleNode) {
            puzzleNode.addEventListener('click', () => {
              const targetContainer = this.findEmptyWordContainer();
              if (targetContainer instanceof HTMLElement) {
                this.gameBlockPuzzles.moveWordToContainer(
                  puzzleNode,
                  targetContainer
                );
              }
            });
          }
        }
      });
  }

  private findEmptyWordContainer(): HTMLElement | undefined {
    // Предполагаем, что первый div в массиве gameWords всегда должен быть целевым контейнером
    const containerComponent = this.gameBlockPuzzles.gameWords[0];
    return containerComponent?.getNode() as HTMLElement;
  }

  /*
  private findEmptyWordContainer(): HTMLElement | undefined {
    const containerComponent = this.gameBlockPuzzles.gameWords.find(
      (wordContainer) => {
        return wordContainer.getNode().children.length === 0;
      }
    );

    // Возвращаем HTMLElement, если компонент найден
    return containerComponent?.getNode() as HTMLElement;
  }
  */
}

export default ArticleGameComponent;
