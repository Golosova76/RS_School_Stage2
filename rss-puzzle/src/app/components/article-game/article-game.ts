import { Component, InterComponent } from '../base-component';
import GameBlockPuzzles from '../game-block/game-block';
import WordDataService from '../../services/words/data-service';
import AnimationHelper from '../../utils/animation-helper';
import SoundManager from '../../services/sound-manager';
import ButtonsGameManager from '../../services/puzzles/button-manager';
import SentenceCompletionChecker from '../../services/puzzles/sentence';
// import ButtonComponent from '../button/button';

class ArticleGameComponent extends Component<InterComponent> {
  private gameBlockPuzzles: GameBlockPuzzles;

  buttonsGameManager: ButtonsGameManager;

  private wordDataService: WordDataService;

  private sentenceCompletionChecker: SentenceCompletionChecker;

  private level: number;

  private roundIndex: number;

  private sentenceIndex: number;

  currentContainerIndex: number = 0;

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
    this.buttonsGameManager = new ButtonsGameManager(this.gameBlockPuzzles);
    this.sentenceCompletionChecker = new SentenceCompletionChecker(
      this.gameBlockPuzzles,
      wordDataService,
      roundIndex,
      sentenceIndex
    );
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

  // Логика добавления из нижнего в верхний
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
                const targetRect = targetContainer.getBoundingClientRect();

                // Используем AnimationHelper для анимации
                AnimationHelper.animateElementMovement(
                  puzzleNode,
                  targetRect,
                  () => {
                    this.gameBlockPuzzles.moveWordToContainer(
                      puzzleNode,
                      targetContainer
                    );
                    this.checkSentenceCompletion();
                    puzzleNode.classList.add('landing');

                    setTimeout(() => {
                      puzzleNode.classList.remove('landing');
                    }, 500); // Длительность анимации "приземления"
                  }
                );

                this.initTopBlockClickEvents();
                SoundManager.playClickSound();
              }
            });
          }
        }
      });
  }

  private initTopBlockClickEvents(): void {
    this.gameBlockPuzzles.gameWords.forEach((wordComponent) => {
      const spanNode = wordComponent.getNode() as HTMLElement;
      // Важно: убедитесь, что обработчики клика удаляются перед их повторной инициализацией
      spanNode.removeEventListener('click', this.handleTopBlockSpanClick);
      spanNode.addEventListener('click', this.handleTopBlockSpanClick);
    });
  }

  // Обработчик клика в отдельном методе для возможности его удаления
  private handleTopBlockSpanClick = (event: Event): void => {
    // Убедимся, что клик был сделан именно по спану, а не по пустому месту в контейнере
    if ((event.target as HTMLElement).nodeName === 'SPAN') {
      const spanNode = event.target as HTMLElement;
      this.returnSpanToLowerBlock(spanNode);
      SoundManager.playClickSound();
    }
  };

  // Логика добавления из верхнего в нижний
  private returnSpanToLowerBlock(spanNode: HTMLElement): void {
    const containerGamePuzzles = this.gameBlockPuzzles.gamePuzzles.getNode();
    // Получите прямоугольник контейнера для вычисления смещения.
    const targetRect = containerGamePuzzles.getBoundingClientRect();
    // Перед тем как добавить spanNode обратно, применяем к нему анимацию.
    AnimationHelper.animateElementMovement(spanNode, targetRect, () => {
      containerGamePuzzles.append(spanNode);
    });
  }

  // Логика опредения в какой верхний контейнер добавлять
  private findEmptyWordContainer(): HTMLElement | undefined {
    // Получаем количество слов в нижнем блоке
    const lowerBlockWordCount =
      this.gameBlockPuzzles.gamePuzzles.getNode().childNodes.length;

    // Получаем количество слов в верхних контейнерах
    const upperBlockWordCount = this.gameBlockPuzzles.gameWords.reduce(
      (count, wordComponent) => {
        return count + wordComponent.getNode().childNodes.length;
      },
      0
    );

    // Если количество слов в нижнем блоке равно количеству слов в верхних контейнерах,
    // то все верхние контейнеры заполнены и нужно найти следующий пустой контейнер,
    // иначе возвращаем текущий контейнер
    if (lowerBlockWordCount === upperBlockWordCount) {
      // Найдем первый контейнер, который еще пустой
      const nextEmptyContainer = this.gameBlockPuzzles.gameWords.find(
        (wordComponent) => {
          return wordComponent.getNode().childNodes.length === 0;
        }
      );

      if (nextEmptyContainer) {
        return nextEmptyContainer.getNode();
      }
    }

    // Если верхние контейнеры еще не заполнены полностью, вернем текущий контейнер для заполнения
    return this.gameBlockPuzzles.gameWords[
      this.currentContainerIndex
    ]?.getNode();
  }

  private checkSentenceCompletion(): void {
    // Получаем состояние предложения от SentenceCompletionChecker
    const { isComplete, isCorrect } =
      this.sentenceCompletionChecker.checkSentenceCompletion();

    // Действия в зависимости от состояния предложения
    if (isComplete) {
      // Тут логика для активации кнопки "Проверить"
      this.buttonsGameManager.enableCheckButton();
    }

    if (isCorrect) {
      // Тут логика для активации кнопки "Продолжить"
      this.buttonsGameManager.enableContinueButton();
    }
  }
}

export default ArticleGameComponent;
