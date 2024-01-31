import '@styles/style.scss';
import createHeader from '@js/header.js';
import createMain from '@js/page';
import createFooter from '@js/footer.js';
import initCellInteractive from '@js/interactiv/cell-interactive';
import { cells } from '@js/game-body/parts/game-board'; // массив с клетиками игрового поля
import createToggleTheme from '@js/toggle'; // смена темы
import { findPuzzleByName, updateGame } from '@js/game-utilities';
// import initPuzzleSelection from '@js/interactiv/puzzle-interactive';
// import createGameChoice from '@js/game-handling/choice';
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

  // клик на кнопках выбора
  wrapper.addEventListener('click', function ff(event) {
    // event.target - это элемент, на который непосредственно был сделан клик
    let targetElement = event.target;

    // Проверка, что клик был сделан на элементах gameItemDiv или их детях
    while (
      targetElement != null &&
      !targetElement.classList.contains('game__items')
    ) {
      targetElement = targetElement.parentElement;
    }

    // Если targetElement - один из gameItemDiv, выводим информацию в консоль
    if (
      targetElement != null &&
      targetElement.classList.contains('game__items')
    ) {
      const nameContent = targetElement.querySelector('.name-content');
      const liContents = targetElement.querySelectorAll('.name-content__item');
      if (nameContent) {
        nameContent.classList.toggle('block');
      }
      // console.log(liContents);
      if (liContents) {
        liContents.forEach((content) => {
          content.addEventListener('click', function hy() {
            const puzzleName = content.textContent;
            console.log(puzzleName);
            const puzzleNameChoice = findPuzzleByName(puzzleName);
            // console.log(puzzleNameChoice);
            updateGame(puzzleNameChoice);
          });
        });
      }
    }
  });

  /// /////////////////////   НЕ ТРОГАТЬ
});
