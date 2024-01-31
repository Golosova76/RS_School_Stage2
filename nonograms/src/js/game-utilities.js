import puzzles from '@js/game-body/puzzle-generator';
import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';

function findPuzzleByName(name) {
  return puzzles.find((puzzle) => puzzle.name === name);
}

function updateGame(puzzle) {
  const gameContainer = document.querySelector('main');
  gameContainer.innerHTML = ''; // Очистка текущего содержимого игры
  gameContainer.appendChild(createGameHandling()); // не знаю нужно или нет
  gameContainer.appendChild(createGameBody(puzzle));
}

export { findPuzzleByName, updateGame };
