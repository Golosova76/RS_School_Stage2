import { showGameOverModal, modalElements } from '@js/modal.js';
// eslint-disable-next-line import/no-cycle
import resetGame from '@js/reset-game';
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
      if (wordSpans[i] && underlineSpans[i]) {
        // Проверяем, существует ли элемент
        wordSpans[i].style.visibility = 'visible'; // Делаем букву видимой
        underlineSpans[i].style.visibility = 'hidden';
      }
    }
  }
}

function updateIncorrectCounterDisplay() {
  const prevSpan = document.querySelector('.prev');
  if (prevSpan) {
    prevSpan.textContent = getIncorrectCounter();
  }
}

// обновить подсказку
function updateHint(newHint) {
  const hintTextElement = document.querySelector('.hint-text');
  if (hintTextElement) {
    hintTextElement.textContent = newHint;
  }
}

const bodyPartsOrder = [
  'gallow__head',
  'gallow__body',
  'gallow__left-arm',
  'gallow__right-arm',
  'gallow__left-leg',
  'gallow__right-leg',
];

// показ частей тела
function showBodyPart() {
  if (getIncorrectCounter() < maxIncorrectCount) {
    const partToShow = document.querySelector(
      `.${bodyPartsOrder[getIncorrectCounter()]}`
    );
    if (partToShow) {
      partToShow.style.visibility = 'visible';
    }
  }
}

// очищение частей тела после game over
function hideBodyParts() {
  bodyPartsOrder.forEach((partClass) => {
    const partToHide = document.querySelector(`.${partClass}`);
    if (partToHide) {
      partToHide.style.visibility = 'hidden';
    }
  });
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

// скрытие слова или букв после игры
function hideWordDisplay() {
  const wordContainer = document.querySelectorAll('.game__word');
  const underlineSpansContainer = document.querySelectorAll('.underline');

  // Удаление всех буквенных спанов
  wordContainer.forEach((span) => {
    span.parentNode.removeChild(span);
  });

  // Удаление всех спанов подчеркивания
  underlineSpansContainer.forEach((span) => {
    span.parentNode.removeChild(span);
  });
}

function setupPlayAgainButton() {
  if (modalElements && modalElements.playAgainButton) {
    modalElements.playAgainButton.removeEventListener('click', resetGame); // Удаляем предыдущий обработчик, если он существует

    modalElements.playAgainButton.addEventListener('click', resetGame);
  }
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
    setupPlayAgainButton();
    modalElements.playAgainButton.addEventListener('click', resetGame);
  } else if (isWordCorrect) {
    showGameOverModal(true);
    setupPlayAgainButton();
    modalElements.playAgainButton.addEventListener('click', resetGame);
  }
}

export {
  updateWordDisplay,
  handleLetterClick,
  updateIncorrectCounterDisplay,
  setIncorrectCounter,
  getIncorrectCounter,
  hideBodyParts,
  setupPlayAgainButton,
  hideWordDisplay,
};
