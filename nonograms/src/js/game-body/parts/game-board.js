const cells = []; // массив для клеток (обработка)
const gameState = []; // Создание массива состояний игры

function createGameBoard(size) {
  const gameBoard = document.createElement('div');
  gameBoard.className = 'game__board';

  for (let i = 0; i < size.rows; i += 1) {
    const gameRow = document.createElement('div');
    gameRow.className = 'game__row';
    const gameStateRow = []; // Создание строки для массива состояний

    for (let j = 0; j < size.columns; j += 1) {
      const gameCell = document.createElement('div');
      gameCell.className = 'game-cell';
      gameCell.dataset.row = i; // атрибут строки
      gameCell.dataset.column = j; // атрибут столбца
      gameRow.appendChild(gameCell);
      cells.push(gameCell); // добавление клетки в массив
      gameStateRow.push(0); // Инициализация состояния клетки "не закрашена"
    }

    gameBoard.appendChild(gameRow);
    gameState.push(gameStateRow); // Добавление строки в массив состояний
  }

  return { gameBoard, cells, gameState };
}

export { createGameBoard, cells, gameState };
