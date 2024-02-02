import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';
import puzzles from '@js/game-body/puzzle-generator';
import { startTimer } from '@js/interactiv/timer';

let isTimerStarted = false;

function handleLeftClick(event, spanMinutes, spanSeconds) {
  event.preventDefault();
  const cell = event.target;

  if (cell.classList.contains('cross')) {
    // если cell содержит крестик, убираем его и красим
    cell.classList.remove('cross');
    cell.style.backgroundColor = 'black';
  } else if (cell.style.backgroundColor === 'black') {
    // если cell закрашена снимаем краску
    cell.style.backgroundColor = '';
  } else {
    // если нет краски и крестика - красим
    cell.style.backgroundColor = 'black';
  }

  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }
}

function handleRightClick(event, spanMinutes, spanSeconds) {
  event.preventDefault();
  const cell = event.target;

  if (cell.style.backgroundColor === 'black') {
    // если cell закрашена, убираем, ставим х
    cell.style.backgroundColor = '';
    cell.classList.add('cross');
  } else if (cell.classList.contains('cross')) {
    // если стоит х убираем его
    cell.classList.remove('cross');
  } else {
    // если нет х и нет закрашивания ставим х
    cell.classList.add('cross');
  }

  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }
}

const selectedPuzzle = puzzles[0];

// при клике на кнопку new game
function handleNewGame() {
  const gamePage = document.querySelector('main');

  gamePage.innerHTML = ''; // Очистка текущего содержимого игры
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page__container game';
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(selectedPuzzle));
  gamePage.appendChild(pageContainer);

  isTimerStarted = false;
}

function resetIsTimerStarted() {
  isTimerStarted = false;
}

// слушатель клика правой и левой кнопки мыши по клеткам игрового поля
function initCellInteractive(cells, spanMinutes, spanSeconds) {
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) =>
      handleLeftClick(event, spanMinutes, spanSeconds)
    );
    cell.addEventListener('contextmenu', (event) =>
      handleRightClick(event, spanMinutes, spanSeconds)
    );
  });
}

export { initCellInteractive, handleNewGame, resetIsTimerStarted };
