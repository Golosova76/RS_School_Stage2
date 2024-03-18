import { Component, InterComponent } from '../base-component';
import GameBlockPuzzles from '../game-block/game-block';
import WordDataService from '../../services/words/data-service';
import AnimationHelper from '../../utils/animation-helper';
import SoundManager from '../../services/sound-manager';
import ButtonsGameManager from '../../services/puzzles/button-manager';
import SentenceCompletionChecker from '../../services/puzzles/sentence';
import Draggable from '../../utils/draggable';

class ArticleGameComponent extends Component<InterComponent> {
  private gameBlockPuzzles: GameBlockPuzzles;

  buttonsGameManager: ButtonsGameManager;

  private wordDataService: WordDataService;

  private sentenceCompletionChecker: SentenceCompletionChecker;

  private currentWordContainer: HTMLElement | undefined = undefined;

  private level: number;

  private roundIndex: number;

  private sentenceIndex: number;

  private draggable?: Draggable;

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
    this.initDraggable();
  }

  initGameBlockPuzzles() {
    // добавляем GameBlockPuzzles в DOM и возвращаем его элемент
    this.append(this.gameBlockPuzzles);
    return this.gameBlockPuzzles.getNode();
  }

  // Метод инициализации Draggable
  private initDraggable(): void {
    const sourceContainer = this.gameBlockPuzzles.gamePuzzles.getNode();
    const dropZones = this.gameBlockPuzzles.gameWords.map((wordComponent) =>
      wordComponent.getNode()
    );

    // Передаем массив элементов dropZone в конструктор Draggable
    this.draggable = new Draggable(
      sourceContainer,
      dropZones,
      this.checkSentenceCompletion.bind(this)
    );
  }

  // добавление слов в нижний блок
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

  // Логика добавления из нижнего блока в верхний блок
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

  // Логика добавления из верхнего блока в нижний блок
  private returnSpanToLowerBlock(spanNode: HTMLElement): void {
    const containerGamePuzzles = this.gameBlockPuzzles.gamePuzzles.getNode();
    // Получите прямоугольник контейнера для вычисления смещения.
    const targetRect = containerGamePuzzles.getBoundingClientRect();
    // Перед тем как добавить spanNode обратно, применяем к нему анимацию.
    AnimationHelper.animateElementMovement(spanNode, targetRect, () => {
      this.sentenceCompletionChecker.removeHighlightIncorrectWords();
      containerGamePuzzles.append(spanNode);
    });
  }

  // Логика опредения в какой верхний контейнер добавлять
  private findEmptyWordContainer(): HTMLElement | undefined {
    // Если текущий контейнер уже выбран и не пустой (имеет спаны), используем его
    if (
      this.currentWordContainer &&
      this.currentWordContainer.childNodes.length > 0
    ) {
      return this.currentWordContainer;
    }
    // Находим первый пустой контейнер 'game__words'
    const nextEmptyContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) => wordComponent.getNode().childNodes.length === 0
    );
    // Если нашли пустой контейнер, обновляем текущий контейнер и возвращаем его
    if (nextEmptyContainer) {
      this.currentWordContainer = nextEmptyContainer.getNode();
      return this.currentWordContainer;
    }
    // Если не нашли пустой контейнер, пытаемся вернуть текущий
    // В противном случае, возвращаем undefined, означающий, что нет доступных контейнеров
    return this.currentWordContainer;
  }

  private checkSentenceCompletion(): void {
    // Получаем состояние предложения от SentenceCompletionChecker
    const { isComplete, isCorrect } =
      this.sentenceCompletionChecker.checkSentenceCompletion();

    // Действия в зависимости от состояния предложения
    if (isComplete) {
      // Тут логика для активации кнопки "Check"
      const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
      if (gameButtonCheck) {
        const buttonElementCheck =
          gameButtonCheck.getNode() as HTMLButtonElement;
        buttonElementCheck.classList.remove('check-hidden');
        buttonElementCheck.addEventListener('click', () => {
          this.sentenceCompletionChecker.handleCheckButtonClick();
        });
      }
      this.buttonsGameManager.enableCheckButton();
      // Добавляем функциональность кнопку auto
      const gameButtonAuto = this.gameBlockPuzzles.getGameButtonAuto();
      if (gameButtonAuto) {
        const buttonElementAuto = gameButtonAuto.getNode() as HTMLButtonElement;
        buttonElementAuto.addEventListener('click', () => {
          this.sentenceCompletionChecker.autoCorrectSentence();
          const gameButtonContinue =
            this.gameBlockPuzzles.getGameButtonContinue();
          if (gameButtonContinue) {
            const buttonElementContinue =
              gameButtonContinue.getNode() as HTMLButtonElement;
            buttonElementContinue.classList.add('check-visible');
          }
          this.buttonsGameManager.enableContinueButton();
          if (gameButtonCheck) {
            const buttonElementCheck =
              gameButtonCheck.getNode() as HTMLButtonElement;
            buttonElementCheck.classList.add('check-hidden');
          }
        });
      }
    }

    if (isCorrect) {
      // Тут логика для активации кнопки "Continue"
      const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
      if (gameButtonContinue) {
        const buttonElementContinue =
          gameButtonContinue.getNode() as HTMLButtonElement;
        buttonElementContinue.classList.add('check-visible');
      }
      this.buttonsGameManager.enableContinueButton();
      const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
      if (gameButtonCheck) {
        const buttonElementCheck =
          gameButtonCheck.getNode() as HTMLButtonElement;
        buttonElementCheck.classList.add('check-hidden');
      }
    }
  }
}

export default ArticleGameComponent;
