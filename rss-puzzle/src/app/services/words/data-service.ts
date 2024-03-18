import { Data } from './interface-data';

class WordDataService {
  private data: Data = { rounds: [], roundsCount: 0 };

  private readonly baseUrl: string =
    'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel';

  async loadData(level: number): Promise<void> {
    const url = `${this.baseUrl}${level}.json`; // Динамически формируемый URL

    try {
      const response = await fetch(url);
      const jsonData: Data = await response.json();
      this.data = jsonData;
      console.log('Данные успешно загружены:', jsonData);
    } catch (error) {
      // console.error(`Ошибка при загрузке данных для уровня ${level}:`, error);
    }
  }

  public getShuffledSentenceForRound(
    roundIndex: number,
    sentenceIndex: number
  ): string[] {
    if (roundIndex < this.data.rounds.length) {
      const round = this.data.rounds[roundIndex];
      if (sentenceIndex < round.words.length) {
        const sentence = round.words[sentenceIndex].textExample;
        return WordDataService.shuffleArray(sentence.split(' '));
      }
    }
    return [];
  }

  // метод получения перемешенного предложения
  private static shuffleArray(array: string[]): string[] {
    const arrayCopy = array.slice(); // Создаем копию входного массива
    for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }

  // метод получения неперемешенного предложения
  public getOriginalSentenceForRound(
    roundIndex: number,
    sentenceIndex: number
  ): string {
    if (roundIndex < this.data.rounds.length) {
      const round = this.data.rounds[roundIndex];
      if (sentenceIndex < round.words.length) {
        const sentence = round.words[sentenceIndex].textExample;
        return sentence;
      }
    }
    return '';
  }
}

export default WordDataService;
