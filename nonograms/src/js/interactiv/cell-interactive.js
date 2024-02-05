import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';
import puzzles from '@js/game-body/puzzle-generator';
import { startTimer, stopTimer } from '@js/interactiv/timer';
import { gameState } from '@js/game-body/parts/game-board';
import { checkSolution } from '@js/game-utilities';
import showWinMessage from '@js/interactiv/win-text';

let isTimerStarted = false;

let isMusicPlaying = false; // флаг для отслеживания состояния звуков

const soundFiles = [
  '/audio/background.mp3',
  '/audio/cross.mp3',
  '/audio/empty.mp3',
];

function handleButtonClickSounds() {
  isMusicPlaying = !isMusicPlaying;

  if (isMusicPlaying) {
    // если музыка должна играть
    const audio = new Audio(soundFiles[2]);
    audio.play();
  } else {
    // если музыка не должна играть, останавливаем воспроизведение
    const audio = new Audio(soundFiles[2]);
    audio.pause();
  }
}

let audioFile; // переменная для деструктуризации

// заполняем таблицу
function updateResultsTable(newResult) {
  // получаем данные или пустой массив
  let results = JSON.parse(localStorage.getItem('gameResults')) || [];

  // Добавляем новый результат в начало массива
  results.unshift(newResult);

  // каждый результат имеет свойство stopWatch
  results = results.filter((result) => result && result.stopWatch);

  // Преобразование времени в секунды для сортировки
  results.forEach((result) => {
    const [minutes, seconds] = result.stopWatch.split(':').map(Number);
    // eslint-disable-next-line no-param-reassign
    result.timeInSeconds = minutes * 60 + seconds;
  });

  // Сортируем результаты по времени
  results.sort((a, b) => a.timeInSeconds - b.timeInSeconds);

  // Удаление 'timeInSeconds' перед сохранением
  results = results.map(({ name, level, stopWatch }) => ({
    name,
    level,
    stopWatch,
  }));

  // Ограничиваем массив до пяти последних результатов
  results = results.slice(0, 5);

  // Сохраняем обновлённый массив результатов в localStorage
  localStorage.setItem('gameResults', JSON.stringify(results));

  // Находим tbody в таблице
  const tableBody = document.querySelector('.results-table tbody');

  // Обновляем содержимое таблицы
  results.forEach((result, index) => {
    let row = tableBody.rows[index];
    if (!row) {
      row = tableBody.insertRow();
    }

    const values = Object.values(result);
    values.forEach((value, cellIndex) => {
      let cell = row.cells[cellIndex];
      if (!cell) {
        cell = row.insertCell();
      }
      cell.textContent = value;
    });
  });

  // Добавление пустых строк, если результатов меньше пяти
  while (tableBody.rows.length < 5) {
    const emptyRow = tableBody.insertRow();
    for (let i = 0; i < 3; i += 1) {
      emptyRow.insertCell().textContent = '';
    }
  }
}

function updateGameResults(result) {
  updateResultsTable(result);
}

function handleLeftClick(event, spanMinutes, spanSeconds, puzzle) {
  event.preventDefault();
  const cell = event.target;

  const row = parseInt(cell.dataset.row, 10);
  const column = parseInt(cell.dataset.column, 10);

  if (cell.classList.contains('cross')) {
    // если cell содержит крестик, убираем его и красим
    cell.classList.remove('cross');
    [, , audioFile] = soundFiles;
    cell.style.backgroundColor = 'black';
    [audioFile] = soundFiles; // sound for backgroundColor
    gameState[row][column] = 1; // Обновление состояния клетки в массиве
  } else if (cell.style.backgroundColor === 'black') {
    // если cell закрашена снимаем краску
    cell.style.backgroundColor = '';
    [, , audioFile] = soundFiles; // sound for empty
    gameState[row][column] = 0; // Возвращение к исходному состоянию
  } else {
    // если нет краски и крестика - красим
    cell.style.backgroundColor = 'black';
    [audioFile] = soundFiles;
    gameState[row][column] = 1;
  }

  if (isMusicPlaying) {
    // если музыка должна играть, создаем объект Audio
    const audio = new Audio(audioFile);
    audio.play();
  }

  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }

  if (checkSolution(gameState, puzzle)) {
    showWinMessage(spanMinutes, spanSeconds);
    const newResult = {
      name: puzzle.name,
      level: puzzle.level,
      stopWatch: `${spanMinutes.textContent}:${spanSeconds.textContent}`,
    };
    updateGameResults(newResult);
    stopTimer();
  }
}

function handleRightClick(event, spanMinutes, spanSeconds, puzzle) {
  event.preventDefault();
  const cell = event.target;

  const row = parseInt(cell.dataset.row, 10);
  const column = parseInt(cell.dataset.column, 10);

  if (cell.style.backgroundColor === 'black') {
    // если cell закрашена, убираем, ставим х
    cell.style.backgroundColor = '';
    [, , audioFile] = soundFiles;
    cell.classList.add('cross');
    [, audioFile] = soundFiles; // sound for cross
    gameState[row][column] = 2; // Обновление состояния клетки в массиве
  } else if (cell.classList.contains('cross')) {
    // если стоит х убираем его
    cell.classList.remove('cross');
    [, , audioFile] = soundFiles;
    gameState[row][column] = 0; // Возвращение к исходному состоянию
  } else {
    // если нет х и нет закрашивания ставим х
    cell.classList.add('cross');
    [, audioFile] = soundFiles;
    gameState[row][column] = 2;
  }

  if (isMusicPlaying) {
    // если музыка должна играть, создаем объект Audio
    const audio = new Audio(audioFile);
    audio.play();
  }

  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }

  if (checkSolution(gameState, puzzle)) {
    showWinMessage(spanMinutes, spanSeconds);
    const newResult = {
      name: puzzle.name,
      level: puzzle.level,
      stopWatch: `${spanMinutes.textContent}:${spanSeconds.textContent}`,
    };
    updateGameResults(newResult);
    stopTimer();
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

  // пользовательское событие
  const event = new CustomEvent('newGameStarted', { detail: selectedPuzzle });
  document.dispatchEvent(event);
}

function resetIsTimerStarted() {
  isTimerStarted = false;
}

// слушатель клика правой и левой кнопки мыши по клеткам игрового поля
function initCellInteractive(cells, spanMinutes, spanSeconds, puzzle) {
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) =>
      handleLeftClick(event, spanMinutes, spanSeconds, puzzle)
    );
    cell.addEventListener('contextmenu', (event) =>
      handleRightClick(event, spanMinutes, spanSeconds, puzzle)
    );
  });
}

export {
  initCellInteractive,
  handleNewGame,
  resetIsTimerStarted,
  handleButtonClickSounds,
  updateResultsTable,
};
