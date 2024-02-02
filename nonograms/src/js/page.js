import createGameHandling from '@js/game-handling/game-handling';
import createGameBody from '@js/game-body/game-body';
import puzzles from '@js/game-body/puzzle-generator';

const selectedPuzzle = puzzles[0];

function createMain() {
  const page = document.createElement('main');
  page.className = 'page';

  const pageContainer = document.createElement('div');
  pageContainer.className = 'page__container game';

  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(selectedPuzzle));
  page.appendChild(pageContainer);

  return page;
}

export { createMain, selectedPuzzle };
