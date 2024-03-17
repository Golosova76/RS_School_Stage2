import { Component, InterComponent } from '../base-component';
import GameBlockPuzzles from '../game-block/game-block';
import WordDataService from '../../services/words/data-service';
import AnimationHelper from '../../utils/animation-helper';
// import ButtonComponent from '../button/button';

class ArticleGameComponent extends Component<InterComponent> {
  private gameBlockPuzzles: GameBlockPuzzles;

  // private gameButtonContinue: ButtonComponent | null = null;

  private wordDataService: WordDataService;

  private level: number;

  private roundIndex: number;

  private sentenceIndex: number;

  currentContainerIndex: number = 0;

  constructor(
    wordDataService: WordDataService,
    level: number = 1,
    roundIndex: number = 2,
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
                this.playClickSound();
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
      this.playClickSound();
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

  // убрать disabled у кнопки continue
  public enableContinueButton(): void {
    const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
    if (gameButtonContinue) {
      const buttonElement = gameButtonContinue.getNode() as HTMLButtonElement; // Приведение типа
      if (buttonElement) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.add('continue-effect');
      }
    }
  }

  // проверяем предложение
  private checkSentenceCompletion(): void {
    const originalSentence = this.wordDataService
      .getOriginalSentenceForRound(this.roundIndex, this.sentenceIndex)
      .split(' '); // Получаем оригинальное предложение как массив слов

    // Находим заполненный верхний контейнер
    const filledTopContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) => {
        return (
          wordComponent.getNode().childNodes.length === originalSentence.length
        );
      }
    );
    // Если такой контейнер найден, проверяем соответствие предложения
    if (filledTopContainer) {
      const currentSentence = Array.from(
        filledTopContainer.getNode().childNodes
      ).map((node) => {
        // Предполагаем, что childNodes содержат <span> с нужными словами
        return node.textContent?.trim() || '';
      });

      // Сравниваем оригинальное предложение с текущим
      if (
        JSON.stringify(originalSentence) === JSON.stringify(currentSentence)
      ) {
        this.enableContinueButton();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public playClickSound(): void {
    // Получаем аудио-элемент по его ID и воспроизводим звук
    const clickSound = document.querySelector(
      '.game__audio'
    ) as HTMLAudioElement;
    clickSound.play();
  }
}

export default ArticleGameComponent;
