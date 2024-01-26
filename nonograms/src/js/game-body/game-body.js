import { createTopHints, createLeftHints } from '@js/game-body/parts/hints';
import { createGameBoard } from '@js/game-body/parts/game-board';
import generateHints from '@js/game-body/hint-generator';

function createGameBody(puzzle) {
  const { size, solution } = puzzle;
  const hints = generateHints(solution);

  const gameBody = document.createElement('div');
  gameBody.classList = 'game__body';

  const topHints = createTopHints(size, hints.topHints);
  const leftHints = createLeftHints(size, hints.leftHints);
  const { gameBoard } = createGameBoard(size);

  gameBody.appendChild(topHints);
  gameBody.appendChild(leftHints);
  gameBody.appendChild(gameBoard);

  return gameBody;
}

export default createGameBody;
