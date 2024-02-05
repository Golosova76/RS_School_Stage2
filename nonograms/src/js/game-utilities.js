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
  // clearGameState();
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

  let delay = 0;
  const delayIncrement = 40; // Задержка в миллисекундах между ячейками

  solution.forEach((row, rowIndex) => {
    row.forEach((isFilled, colIndex) => {
      const cellIndex = rowIndex * row.length + colIndex;
      if (cellIndex < cellsShow.length) {
        setTimeout(() => {
          const cell = cellsShow[cellIndex];

          if (isFilled) {
            cell.style.backgroundColor = 'black'; // Закрашиваем ячейку
            cell.classList.remove('cross'); // Убираем крестик, если он есть
          } else {
            cell.style.backgroundColor = ''; // Убираем закрашивание
            cell.classList.remove('cross'); // Убираем крестик
          }
        }, delay);

        delay += delayIncrement;
      }
    });
  });

  // Блокируем все ячейки и кнопку save после завершения анимации
  setTimeout(() => {
    cellsShow.forEach((cell) => {
      cell.classList.add('blocked');
    });

    const saveButton = document.querySelector('.button-save');
    if (saveButton) {
      saveButton.disabled = true;
    }
  }, delay);
}

function checkSolution(gameState, puzzle) {
  const { solution } = puzzle;
  for (let i = 0; i < gameState.length; i += 1) {
    for (let j = 0; j < gameState[i].length; j += 1) {
      // клетки с 1 в gameState как закрашенные (true),
      //  а с 0 или 2 как незакрашенные (false)
      const cellIsFilled = gameState[i][j] === 1;
      if (cellIsFilled !== solution[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export {
  findPuzzleByName,
  updateGame,
  clearCurrentGame,
  selectRandomPuzzle,
  showSolution,
  checkSolution,
};
