import WordDataService from '../words/data-service';
import { InterGameBlockPuzzles } from './button-manager';

class SentenceCompletionChecker {
  private gameBlockPuzzles: InterGameBlockPuzzles;

  private wordDataService: WordDataService;

  private roundIndex: number;

  private sentenceIndex: number;


  private currentSentenceNodes: ChildNode[] = [];

  private originalSentence: string[] = [];


  constructor(
    gameBlockPuzzles: InterGameBlockPuzzles,
    wordDataService: WordDataService,
    roundIndex: number,
    sentenceIndex: number
  ) {
    this.gameBlockPuzzles = gameBlockPuzzles;
    this.wordDataService = wordDataService;
    this.roundIndex = roundIndex;
    this.sentenceIndex = sentenceIndex;
  }

  checkSentenceCompletion(): { isComplete: boolean; isCorrect: boolean } {

    this.originalSentence = this.wordDataService

      .getOriginalSentenceForRound(this.roundIndex, this.sentenceIndex)
      .split(' ');

    const filledTopContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) =>

        wordComponent.getNode().childNodes.length ===
        this.originalSentence.length

    );

    if (!filledTopContainer) {
      return { isComplete: false, isCorrect: false };
    }

    const currentSentence = Array.from(
      filledTopContainer.getNode().childNodes
    ).map((node) => node.textContent?.trim() || '');


    // нужно вытащить DOM элементы для добавления класса
    this.currentSentenceNodes = Array.from(
      filledTopContainer.getNode().childNodes
    );

    // Проверка на завершенность
    // все ли слова перенесены из нижнего блока в верхний
    const isComplete =
      filledTopContainer.getNode().childNodes.length ===
      this.originalSentence.length;

    // Проверка на правильность
    // все ли слова правильно поставлены
    const isCorrect =
      JSON.stringify(this.originalSentence) === JSON.stringify(currentSentence);

    return { isComplete, isCorrect };
  }

  // eslint-disable-next-line class-methods-use-this
  private highlightIncorrectWords() {
    this.currentSentenceNodes.forEach((node, index) => {
      // Проверяем, является ли node элементом, чтобы безопасно обращаться к classList
      if (node instanceof Element) {
        const word = node.textContent?.trim();
        if (word !== this.originalSentence[index]) {
          node.classList.add('highlight-incorrect');
        } else {
          // Убираем подсветку, если слово на правильном месте
          node.classList.remove('highlight-incorrect');
        }
      }
    });
  }

  handleCheckButtonClick() {
    const { isComplete, isCorrect } = this.checkSentenceCompletion();
    // Если предложение завершено, но собрано неправильно, подсвечиваем ошибки
    if (isComplete && !isCorrect) {
      this.highlightIncorrectWords();
      setTimeout(() => {
        this.removeHighlightIncorrectWords();
      }, 7000); // 7 секунд
    }
  }

  // Метод для снятия подсветки с неправильных слов
  // eslint-disable-next-line class-methods-use-this
  removeHighlightIncorrectWords() {
    this.currentSentenceNodes.forEach((node) => {
      if (node instanceof Element) {
        node.classList.remove('highlight-incorrect');
      }
    });
  }

}

export default SentenceCompletionChecker;
