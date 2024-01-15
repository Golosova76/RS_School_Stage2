import '@styles/style.scss';
import createHeader from '@js/header.js';
import createFooter from '@js/footer.js';
import createMain from '@js/main-page/page';

import { createModal } from '@js/modal.js';

import { handleLetterClick } from '@js/update-word.js';

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.appendChild(wrapper);

  const { modal } = createModal();
  wrapper.appendChild(modal);
  wrapper.appendChild(createHeader());
  wrapper.appendChild(createMain());
  wrapper.appendChild(createFooter());
  // console.log(wrapper.innerHTML);

  document.addEventListener('keydown', function addEventListenerKey(event) {
    const pressedKeyCode = event.code;
    // Проверяем, является ли нажатая клавиша буквой
    if (pressedKeyCode.startsWith('Key')) {
      const pressedKey = pressedKeyCode.charAt(3).toUpperCase(); // Извлекаем букву из кода
      handleLetterClick(pressedKey); // Передаем код буквы в функцию handleLetterClick
    }
  });
});
