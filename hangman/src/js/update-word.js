import { currentWord } from './main-page/words';

let incorrectCounter = 0;
const maxIncorrectCount = 6;

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
    prevSpan.textContent = incorrectCounter;
  }
}

function showBodyPart() {
  if (incorrectCounter < maxIncorrectCount) {
    const parts = document.querySelectorAll(
      '.gallow__head, .gallow__body, .gallow__left-arm, .gallow__right-arm, .gallow__left-leg, .gallow__right-leg'
    );

    if (parts[incorrectCounter]) {
      parts[incorrectCounter].style.visibility = 'visible';
    }
  }
}

function checkWordCorrect() {
  const displayLetters = document.querySelectorAll('.letter-content');
  const displayWord = Array.from(displayLetters)
    .map((span) => span.textContent || '_')
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

  if (!currentWord.includes(letter.toLowerCase())) {
    showBodyPart();
    incorrectCounter += 1;
    updateIncorrectCounterDisplay();

    const isWordCorrect = checkWordCorrect();
    if (incorrectCounter === 6) {
      // Логика для проигрыша или завершения игры
      // вызов модального окна
    } else if (isWordCorrect) {
    }
  }
}

export { updateWordDisplay, handleLetterClick };
