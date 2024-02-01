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

export { findPuzzleByName, updateGame, clearCurrentGame };
