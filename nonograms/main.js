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
  updateResultsTable,
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
import { saveGame, loadGame } from '@js/save-game';

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
  // функция для очищения cells
  function clearGameCells() {
    cells.length = 0; // очищаем массив
  }

  // пользовательское событие для solution
  document.addEventListener('newGameStarted', function ff(e) {
    currentPuzzleSolution = e.detail;
  });

  // обработка клика по cell закрашивание черным и крестик и таймер и звуки
  initCellInteractive(cells, spanMinutes, spanSeconds, currentPuzzleSolution);

  // инициализация при первоначальной загрузке страницы
  updateResultsTable();

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

    // кнопка save
    if (targetElement === event.target.closest('.button-save')) {
      const timerElements = getTimerElements();
      const currentGameName = currentPuzzleSolution.name;
      const currentLevel = currentPuzzleSolution.level;
      const currentSize = currentPuzzleSolution.size;
      const currentSolution = currentPuzzleSolution.solution;
      const currentTime = `${timerElements.spanMinutes.textContent}:${timerElements.spanSeconds.textContent}`;

      // Вызов функции saveGame
      saveGame(
        gameState,
        currentGameName,
        currentLevel,
        currentTime,
        currentSize,
        currentSolution
      );
    }

    // кнопка load
    if (targetElement === event.target.closest('.button-load-game')) {
      const loadedGame = loadGame();

      if (loadedGame) {
        const {
          gameLoadState,
          gameName,
          gameLevel,
          gameTime,
          gameSize,
          gameSolution,
        } = loadedGame;

        const currentPuzzleSolutionSave = {
          name: gameName,
          level: gameLevel,
          size: gameSize,
          solution: gameSolution,
        };

        clearGameState();
        clearGameCells();
        updateGame(currentPuzzleSolutionSave);
        updateResultsTable();

        gameLoadState.forEach((row, rowIndex) => {
          row.forEach((cellState, columnIndex) => {
            const index = rowIndex * gameLoadState[0].length + columnIndex;
            const cell = cells[index];

            if (cell) {
              if (cellState === 1) {
                cell.style.backgroundColor = 'black';
              } else if (cellState === 2) {
                cell.classList.add('cross');
              } else {
                cell.style.backgroundColor = '';
              }
            }
          });
        });
      } else {
        // Обработка случая, когда сохраненных данных нет
        alert('Saved game not found.');
      }
    }

    // кнопка new game
    if (targetElement === event.target.closest('.button-new-game')) {
      clearCurrentGame();
      resetTimer(spanMinutes, spanSeconds);
      clearGameState();
      handleNewGame(currentPuzzleSolution);
      updateResultsTable();
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
      updateResultsTable();
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
            updateResultsTable();
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
