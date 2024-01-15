// eslint-disable-next-line import/no-cycle
import {
  setIncorrectCounter,
  updateIncorrectCounterDisplay,
  hideBodyParts,
  setupPlayAgainButton,
  updateHint,
  updateWord,
} from '@js/update-word.js';

import hideModal from '@js/close-element';
import { createWordsSection } from './main-page/words';

function resetGame() {
  hideModal(); // закрытие модалки
  setIncorrectCounter(0); // сброс счетчика
  updateIncorrectCounterDisplay(); // обновление счетчика
  createWordsSection(); // генерация нового слова
  updateHint();
  updateWord();
  hideBodyParts(); // сброс частей тела game over
  setupPlayAgainButton(); // сброс старого обработчика и ставим новый

  const buttons = document.querySelectorAll('.button__key');
  buttons.forEach((button) => {
    // eslint-disable-next-line no-param-reassign
    button.disabled = false;
  });
}

export default resetGame;
