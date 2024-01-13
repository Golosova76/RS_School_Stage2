import { showGameOverModal } from '@js/modal.js';
import { currentWord } from './main-page/words';

let incorrectCounter = 0;
const maxIncorrectCount = 6;

// Функция для установки значения incorrectCounter
function setIncorrectCounter(value) {
  incorrectCounter = value;
}

// Функция для получения значения incorrectCounter
function getIncorrectCounter() {
  return incorrectCounter;
}

function updateWordDisplay(letter) {
  const lowerCaseLetter = letter.toLowerCase();
  const wordSpans = document.querySelectorAll('.letter-content');
  const underlineSpans = document.querySelectorAll('.underline');

  for (let i = 0; i < currentWord.length; i += 1) {
    if (currentWord[i] === lowerCaseLetter) {
      wordSpans[i].style.visibility = 'visible'; // Делаем букву видимой
      underlineSpans[i].style.visibility = 'hidden';
    }
  }
}

function updateIncorrectCounterDisplay() {
  const prevSpan = document.querySelector('.prev');
  if (prevSpan) {
    prevSpan.textContent = getIncorrectCounter();
  }
}

function showBodyPart() {
  if (getIncorrectCounter() < maxIncorrectCount) {
    const parts = document.querySelectorAll(
      '.gallow__head, .gallow__body, .gallow__left-arm, .gallow__right-arm, .gallow__left-leg, .gallow__right-leg'
    );

    if (parts[getIncorrectCounter()]) {
      parts[getIncorrectCounter()].style.visibility = 'visible';
    }
  }
}

// сравнение загаданного слова и слова на экране
function checkWordCorrect() {
  const displayLetters = document.querySelectorAll('.letter-content');
  const displayWord = Array.from(displayLetters)
    .map((span) =>
      span.style.visibility === 'visible' ? span.textContent : '_'
    )
    .join('');
  return displayWord === currentWord;
}

function handleLetterClick(letter) {
  const buttons = document.querySelectorAll('.button__key');
  buttons.forEach((button) => {
    if (button.textContent === letter) {
      // eslint-disable-next-line no-param-reassign
      button.disabled = true;
    }
  });

  updateWordDisplay(letter);

  const isWordCorrect = checkWordCorrect();

  if (!currentWord.includes(letter.toLowerCase())) {
    showBodyPart();
    setIncorrectCounter(getIncorrectCounter() + 1);
    updateIncorrectCounterDisplay();
  }

  if (getIncorrectCounter() === 6) {
    showGameOverModal(false);
  } else if (isWordCorrect) {
    showGameOverModal(true);
  }
}

export {
  updateWordDisplay,
  handleLetterClick,
  updateIncorrectCounterDisplay,
  setIncorrectCounter,
  getIncorrectCounter,
};
