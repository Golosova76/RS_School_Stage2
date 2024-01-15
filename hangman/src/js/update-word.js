import { showGameOverModal, modalElements } from '@js/modal.js';
// eslint-disable-next-line import/no-cycle
import resetGame from '@js/reset-game';
import { setGameActive } from '@js/game-active';
import { currentWord, currentHint } from './main-page/words';

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
function updateHint() {
  const hintTextElement = document.querySelector('.hint-text');
  hintTextElement.textContent = currentHint;
}

function updateWord() {
  const letterContentSpans = document.querySelectorAll('.letter-content');
  const underlineSpans = document.querySelectorAll('.underline');

  // Если количество букв в слове изменилось, нужно создать или удалить спаны
  if (currentWord.length !== letterContentSpans.length) {
    // Удаляем все текущие буквы и подчеркивания
    const letterSpans = document.querySelectorAll('.letter');
    letterSpans.forEach((span) => span.remove());
    letterContentSpans.forEach((span) => span.remove());
    underlineSpans.forEach((span) => span.remove());

    // Создаем новые спаны для букв и подчеркиваний
    const wordDiv = document.querySelector('.game__word'); // Убедитесь, что это правильный селектор
    for (let i = 0; i < currentWord.length; i += 1) {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      const underlineSpan = document.createElement('span');
      underlineSpan.className = 'underline';
      underlineSpan.style.visibility = 'visible';

      const letterContentSpan = document.createElement('span');
      letterContentSpan.className = 'letter-content';
      letterContentSpan.textContent = currentWord[i];
      letterContentSpan.style.visibility = 'hidden';

      letterSpan.appendChild(letterContentSpan);
      letterSpan.appendChild(underlineSpan);
      wordDiv.appendChild(letterSpan);
    }
  } else {
    // Если количество букв осталось тем же, просто обновляем текст в спанах
    letterContentSpans.forEach((span, index) => {
      // eslint-disable-next-line no-param-reassign
      span.textContent = currentWord[index];
      // eslint-disable-next-line no-param-reassign
      span.style.visibility = 'hidden'; // Скрываем буквe
    });
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
    setGameActive(false);
    setupPlayAgainButton();
    modalElements.playAgainButton.addEventListener('click', resetGame);
  } else if (isWordCorrect) {
    showGameOverModal(true);
    setGameActive(false);
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
  updateHint,
  updateWord,
};
