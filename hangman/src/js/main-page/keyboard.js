import { handleLetterClick } from '../update-word';

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.className = 'game__keyboards';

  // Массив с буквами для кнопок
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  letters.forEach((letter) => {
    const button = document.createElement('button');
    button.className = 'button__key button';
    button.textContent = letter;
    button.addEventListener('click', () => {
      handleLetterClick(letter);
    });
    keyboard.appendChild(button);
  });

  return keyboard;
}

export default createKeyboard;
