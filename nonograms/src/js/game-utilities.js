import puzzles from '@js/game-body/puzzle-generator';
import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';
import { cells } from '@js/game-body/parts/game-board'; // массив с клетиками игрового поля

// поиск по имени
function findPuzzleByName(name) {
  return puzzles.find((puzzle) => puzzle.name === name);
}

// полное обновление всего
function updateGame(puzzle) {
  const gamePage = document.querySelector('main');

  gamePage.innerHTML = ''; // Очистка текущего содержимого игры
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page__container game';
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(puzzle));
  gamePage.appendChild(pageContainer);
}

// очистка игрового поля
function clearCurrentGame() {
  cells.forEach((cell) => {
    cell.classList.remove('cross'); // Удаляем крестик, если он есть
    // eslint-disable-next-line no-param-reassign
    cell.style.backgroundColor = ''; // Сбрасываем фоновый цвет
  });
}

// выбор случайного puzzles
function selectRandomPuzzle() {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
}

// показ решения
function showSolution(puzzle) {
  const { solution } = puzzle;
  const cellsShow = document.querySelectorAll('.game-cell');

  let cellIndex = 0;
  solution.forEach((row) => {
    row.forEach((isFilled) => {
      if (cellIndex < cellsShow.length) {
        const cell = cellsShow[cellIndex];

        if (isFilled) {
          cell.style.backgroundColor = 'black'; // Закрашиваем ячейку
          cell.classList.remove('cross'); // Убираем крестик, если он есть
        } else {
          cell.style.backgroundColor = ''; // Убираем закрашивание
          cell.classList.remove('cross'); // Убираем крестик
        }
      }

      cellIndex += 1; // к следующей cell
    });
  });

  // Блокируем все ячейки после показа решения
  cellsShow.forEach((cell) => {
    cell.classList.add('blocked');
  });

  // Блокируем кнопку Save, если она есть
  const saveButton = document.querySelector('.button-save');
  if (saveButton) {
    saveButton.disabled = true;
  }
}

export {
  findPuzzleByName,
  updateGame,
  clearCurrentGame,
  selectRandomPuzzle,
  showSolution,
};
