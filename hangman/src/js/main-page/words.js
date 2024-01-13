import { words, hints } from '../data';

// eslint-disable-next-line import/no-mutable-exports
let currentWord = '';

let lastWordIndex = -1; // положим последний индекс слова

// Функция для установки индекса последнего слова
// из-за Exporting mutable 'let' binding, use 'const' instead.eslint
// экспорт let lastWordIndex = -1;
function setLastWordIndex(index) {
  lastWordIndex = index;
}

// Функция для получения индекса последнего слова
function getLastWordIndex() {
  return lastWordIndex;
}

function createWordsSection() {
  const wordsSection = document.createElement('div');
  wordsSection.className = 'game__words';

  const wordDiv = document.createElement('div');
  wordDiv.className = 'game__word';

  // выбираем случайное слово
  let wordIndex;
  let isNewWord = false;

  while (!isNewWord) {
    wordIndex = Math.floor(Math.random() * words.length);
    if (wordIndex !== getLastWordIndex()) {
      isNewWord = true; // Выходим из цикла, если слово отличается от предыдущего
    }
  }

  lastWordIndex = wordIndex; // Обновляем индекс последнего слова
  const word = words[wordIndex];
  currentWord = word;
  const hint = hints[wordIndex];

  console.log(word);
  console.log(hint);

  for (let i = 0; i < word.length; i += 1) {
    const letterSpan = document.createElement('span');
    letterSpan.className = 'letter';

    const underlineSpan = document.createElement('span'); // Для подчеркивания
    underlineSpan.className = 'underline';

    const letterContentSpan = document.createElement('span'); // Для буквы
    letterContentSpan.className = 'letter-content';
    letterContentSpan.textContent = word[i];
    letterContentSpan.style.visibility = 'hidden'; // Скрытие буквы изначально

    letterSpan.appendChild(letterContentSpan);
    letterSpan.appendChild(underlineSpan); // Добавляем подчеркивание
    wordDiv.appendChild(letterSpan);
  }

  const hintDiv = document.createElement('div');
  hintDiv.className = 'game__hint';

  const hintLabel = document.createElement('span');
  hintLabel.className = 'hint';
  hintLabel.textContent = 'Hint: ';
  hintDiv.appendChild(hintLabel);

  const hintText = document.createElement('span');
  hintText.className = 'hint-text';
  hintText.textContent = hint;
  hintDiv.appendChild(hintText);

  const incorrectDiv = document.createElement('div');
  incorrectDiv.className = 'incorrect-text';

  const incorrectText = document.createElement('span');
  incorrectText.className = 'incorrect-text';
  incorrectText.textContent = 'Incorrect guesses: ';
  incorrectDiv.appendChild(incorrectText);

  const prevSpan = document.createElement('span');
  prevSpan.className = 'prev';
  prevSpan.textContent = '0'; // Начальное значение ошибок
  incorrectDiv.appendChild(prevSpan);

  const slash = document.createTextNode(' / ');
  incorrectDiv.appendChild(slash);

  const nextSpan = document.createElement('span');
  nextSpan.className = 'next';
  nextSpan.textContent = '6'; // Макс ошибок
  incorrectDiv.appendChild(nextSpan);

  // Собираем все элементы
  wordsSection.appendChild(wordDiv);
  wordsSection.appendChild(hintDiv);
  wordsSection.appendChild(incorrectDiv);

  return wordsSection;
}

// export default createWordsSection;

export { currentWord, createWordsSection, getLastWordIndex, setLastWordIndex };
