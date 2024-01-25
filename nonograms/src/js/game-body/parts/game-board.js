function createGameBoard(size) {
  const gameBoard = document.createElement('div');
  gameBoard.className = 'game__board';

  for (let i = 0; i < size.rows; i += 1) {
    const gameRow = document.createElement('div');
    gameRow.className = 'game__row';

    for (let j = 0; j < size.columns; j += 1) {
      const gameCell = document.createElement('div');
      gameCell.className = 'game-cell';
      gameRow.appendChild(gameCell);
    }

    gameBoard.appendChild(gameRow);
  }

  return gameBoard;
}

export default createGameBoard;
