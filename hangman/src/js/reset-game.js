import {
  setIncorrectCounter,
  updateIncorrectCounterDisplay,
  hideBodyParts,
} from '@js/update-word.js';
import { createWordsSection } from './main-page/words';

function resetGame() {
  setIncorrectCounter(0); // сброс счетчика
  updateIncorrectCounterDisplay(); // обновление счетчика
  createWordsSection(); // генерация нового слова
  hideBodyParts(); // сброс частей тела game over
}
