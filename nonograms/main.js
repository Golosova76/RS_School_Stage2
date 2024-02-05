/* eslint-disable no-unused-vars */
import '@styles/style.scss';
import createHeader from '@js/header.js';
import { createMain, selectedPuzzle } from '@js/page';
import createFooter from '@js/footer.js';
import {
  initCellInteractive,
  handleNewGame,
  resetIsTimerStarted,
  handleButtonClickSounds,
} from '@js/interactiv/cell-interactive';
// import { cells } from '@js/game-body/parts/game-board'; // массив с клетиками игрового поля
import createToggleTheme from '@js/toggle'; // смена темы
import {
  findPuzzleByName,
  updateGame,
  clearCurrentGame,
  selectRandomPuzzle,
  showSolution,
} from '@js/game-utilities';
import { resetTimer } from '@js/interactiv/timer';
import { gameState, cells } from '@js/game-body/parts/game-board';

// import { resetTimer } from '@js/interactiv/timer';
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

  // работа с таймером
  function getTimerElements() {
    return {
      spanMinutes: document.querySelector('.timer__minutes'),
      spanSeconds: document.querySelector('.timer__seconds'),
    };
  }

  const { spanMinutes, spanSeconds } = getTimerElements();

  // переменная для выбранного puzzles
  let currentPuzzleSolution = selectedPuzzle;

  // функция для очищения gameState
  function clearGameState() {
    gameState.length = 0; // очищаем массив
  }

  // пользовательское событие для solution
  document.addEventListener('newGameStarted', function ff(e) {
    currentPuzzleSolution = e.detail;
  });

  // обработка клика по cell закрашивание черным и крестик и таймер и звуки
  initCellInteractive(cells, spanMinutes, spanSeconds, currentPuzzleSolution);

  // установка темы при загрузке страницы:
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  createToggleTheme();

  // клик на кнопках выбора и кнопках управления
  wrapper.addEventListener('click', function wrapperClick(event) {
    // event.target - это элемент, на который непосредственно был сделан клик
    let targetElement = event.target;

    // кнопка clear
    if (targetElement === event.target.closest('.button-clear')) {
      clearCurrentGame();
    }

    // кнопка sound
    if (targetElement === event.target.closest('.button-sound')) {
      handleButtonClickSounds();
      const activeSound = targetElement;
      activeSound.classList.toggle('active-sound');
    }

    // кнопка new game
    if (targetElement === event.target.closest('.button-new-game')) {
      clearCurrentGame();
      resetTimer(spanMinutes, spanSeconds);
      clearGameState();
      handleNewGame(currentPuzzleSolution);
      const timerElements = getTimerElements();
      resetTimer(spanMinutes, spanSeconds);
      resetIsTimerStarted();
      initCellInteractive(
        cells,
        timerElements.spanMinutes,
        timerElements.spanSeconds,
        currentPuzzleSolution
      );
      createToggleTheme();
    }

    // кнопка random game
    if (targetElement === event.target.closest('.button-random-game')) {
      const randomPuzzle = selectRandomPuzzle();
      clearGameState();
      updateGame(randomPuzzle);
      currentPuzzleSolution = randomPuzzle;
      const timerElements = getTimerElements();
      resetTimer(spanMinutes, spanSeconds);
      resetIsTimerStarted();
      initCellInteractive(
        cells,
        timerElements.spanMinutes,
        timerElements.spanSeconds,
        currentPuzzleSolution
      );
      createToggleTheme();
    }

    // кнопка solution
    if (targetElement === event.target.closest('.button-solution')) {
      showSolution(currentPuzzleSolution);
      resetTimer(spanMinutes, spanSeconds);
    }

    // Проверка, что клик был сделан на элементах gameItemDiv или их детях
    while (
      targetElement != null &&
      !targetElement.classList.contains('game__items')
    ) {
      targetElement = targetElement.parentElement;
    }

    // Если targetElement - один из gameItemDiv, работаем дальше
    if (
      targetElement != null &&
      targetElement.classList.contains('game__items')
    ) {
      const nameContent = targetElement.querySelector('.name-content');
      const liContents = targetElement.querySelectorAll('.name-content__item');
      if (nameContent) {
        nameContent.classList.toggle('block');
      }
      if (liContents) {
        liContents.forEach((content) => {
          content.addEventListener('click', function contentUpdate() {
            const puzzleName = content.textContent;
            const puzzleNameChoice = findPuzzleByName(puzzleName);
            currentPuzzleSolution = puzzleNameChoice;
            clearGameState();
            updateGame(puzzleNameChoice);
            const timerElements = getTimerElements();
            resetTimer(spanMinutes, spanSeconds);
            resetIsTimerStarted();
            initCellInteractive(
              cells,
              timerElements.spanMinutes,
              timerElements.spanSeconds,
              currentPuzzleSolution
            );
            createToggleTheme();
          });
        });
      }
    }

    /// //////////////////////////// НЕ ТРОГАТЬ
  });

  // закрытие списков по клику вне кнопки
  document.addEventListener('click', function closeButtonsChoice(event) {
    const buttonsChoice = document.querySelectorAll('.button-choice');

    buttonsChoice.forEach((button) => {
      const nameContent = button.nextElementSibling; // выпадающий список сразу после кнопки в DOM

      // если клик вне кнопки и ее списка, скрываем список
      if (
        !button.contains(event.target) &&
        nameContent &&
        !nameContent.contains(event.target)
      ) {
        nameContent.classList.remove('block');
      }
    });
  });

  /// /////////////////////   НЕ ТРОГАТЬ
});
