// import { createGameBoard } from '@js/game-body/parts/game-board';

function handleLeftClick(event) {
  event.preventDefault();
  const cell = event.target;

  if (cell.classList.contains('cross')) {
    // если cell содержит крестик, убираем его и красим
    cell.classList.remove('cross');
    cell.style.backgroundColor = 'black';
  } else if (cell.style.backgroundColor === 'black') {
    // если cell закрашена снимаем краску
    cell.style.backgroundColor = '';
  } else {
    // если нет краски и крестика - красим
    cell.style.backgroundColor = 'black';
  }
}

function handleRightClick(event) {
  event.preventDefault();
  const cell = event.target;

  if (cell.style.backgroundColor === 'black') {
    // если cell закрашена, убираем, ставим х
    cell.style.backgroundColor = '';
    cell.classList.add('cross');
  } else if (cell.classList.contains('cross')) {
    // если стоит х убираем его
    cell.classList.remove('cross');
  } else {
    // если нет х и нет закрашивания ставим х
    cell.classList.add('cross');
  }
}

// слушатель клика правой и левой кнопки мыши по клеткам игрового поля
function initCellInteractive(cells) {
  cells.forEach((cell) => {
    cell.addEventListener('click', handleLeftClick);
    cell.addEventListener('contextmenu', handleRightClick);
  });
}

export default initCellInteractive;
