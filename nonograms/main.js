import '@styles/style.scss';
import createHeader from '@js/header.js';
import createMain from '@js/page';
import createFooter from '@js/footer.js';
import initCellInteractive from '@js/interactiv/cell-interactive';
import { cells } from '@js/game-body/parts/game-board'; // массив с клетиками игрового поля
import createToggleTheme from '@js/toggle'; // смена темы
// import puzzles from '@js/game-body/puzzle-generator'; // массив с головоломками
// import generateHints from '@js/game-body/hint-generator'; // генератор подсказок

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.appendChild(wrapper);

  wrapper.appendChild(createHeader());
  wrapper.appendChild(createMain());
  wrapper.appendChild(createFooter());

  initCellInteractive(cells); // обработка клика по cell закрашивание черным и крестик

  createToggleTheme();
});
