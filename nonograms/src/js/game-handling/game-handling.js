import createGameColumns from '@js/game-handling/columns';
import createScoreTable from '@js/game-handling/table';
import createGameChoice from '@js/game-handling/choice';

function createGameHandling() {
  const gameHandling = document.createElement('div');
  gameHandling.classList = 'game__handling';

  const { columns } = createGameColumns();
  columns.forEach((column) => gameHandling.appendChild(column));

  const gameInputs = document.createElement('div');
  gameInputs.classList = 'game__inputs';

  gameHandling.appendChild(gameInputs);

  gameInputs.appendChild(createScoreTable());
  const { gameChoiceDiv } = createGameChoice();
  gameInputs.appendChild(gameChoiceDiv);

  return gameHandling;
}

export default createGameHandling;
