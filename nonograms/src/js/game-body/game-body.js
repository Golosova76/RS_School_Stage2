import { createTopHints, createLeftHints } from '@js/game-body/parts/hints';
import createGameBoard from '@js/game-body/parts/game-board';

function createGameBody(size) {
  const gameBody = document.createElement('div');
  gameBody.classList = 'game__body';

  const topHints = createTopHints(size);
  const leftHints = createLeftHints(size);
  const gameBoard = createGameBoard(size);

  gameBody.appendChild(topHints);
  gameBody.appendChild(leftHints);
  gameBody.appendChild(gameBoard);

  return gameBody;
}

export default createGameBody;
