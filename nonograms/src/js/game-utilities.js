import puzzles from '@js/game-body/puzzle-generator';
import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';

function findPuzzleByName(name) {
  return puzzles.find((puzzle) => puzzle.name === name);
}

function updateGame(puzzle) {
  const gamePage = document.querySelector('main');

  gamePage.innerHTML = ''; // Очистка текущего содержимого игры
  const pageContainer = document.createElement('div');
  pageContainer.className = 'page__container game';
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(puzzle));
  gamePage.appendChild(pageContainer);
}

export { findPuzzleByName, updateGame };
