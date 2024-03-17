import WordDataService from '../words/data-service';
import { InterGameBlockPuzzles } from './button-manager';

class SentenceCompletionChecker {
  private gameBlockPuzzles: InterGameBlockPuzzles;

  private wordDataService: WordDataService;

  private roundIndex: number;

  private sentenceIndex: number;

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
    const originalSentence = this.wordDataService
      .getOriginalSentenceForRound(this.roundIndex, this.sentenceIndex)
      .split(' ');

    const filledTopContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) =>
        wordComponent.getNode().childNodes.length === originalSentence.length
    );

    if (!filledTopContainer) {
      return { isComplete: false, isCorrect: false };
    }

    const currentSentence = Array.from(
      filledTopContainer.getNode().childNodes
    ).map((node) => node.textContent?.trim() || '');

    const isComplete =
      filledTopContainer.getNode().childNodes.length ===
      originalSentence.length;
    const isCorrect =
      JSON.stringify(originalSentence) === JSON.stringify(currentSentence);

    return { isComplete, isCorrect };
  }
}

export default SentenceCompletionChecker;
