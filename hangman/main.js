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
    const pressedKey = event.key.toUpperCase();
    // нажатая клавиша - буква?
    if (pressedKey.length === 1 && pressedKey >= 'A' && pressedKey <= 'Z') {
      handleLetterClick(pressedKey);
    }
  });
});
