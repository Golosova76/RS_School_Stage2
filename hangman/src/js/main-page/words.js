import { words, hints } from '../data';

function createWordsSection() {
  const wordsSection = document.createElement('div');
  wordsSection.className = 'game__words';

  const wordDiv = document.createElement('div');
  wordDiv.className = 'game__word';
  // выбираем случайное слово
  const wordIndex = Math.floor(Math.random() * words.length);
  const word = words[wordIndex];
  const hint = hints[wordIndex];

  for (let i = 0; i < word.length; i += 1) {
    const letterSpan = document.createElement('span');
    letterSpan.className = 'letter';
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
  prevSpan.textContent = '0'; // Начальное значение
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

export default createWordsSection;
