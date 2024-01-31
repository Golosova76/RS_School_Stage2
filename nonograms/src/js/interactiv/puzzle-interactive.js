// import { findPuzzleByName, updateGame } from '@js/game-utilities';
// import createGameChoice from '@js/game-handling/choice';

// const { gameItemDiv } = createGameChoice();

function handClickChoice(event) {
  console.log('Обработчик клика вызван:', event.currentTarget);
  // Определение текущего div, на котором произошёл клик
  const currentDiv = event.currentTarget;
  // Получение элемента name-content внутри текущего div
  const nameContent = currentDiv.querySelector('.name-content');
  if (nameContent) {
    // Добавление дополнительного класса
    nameContent.classList.add('block');
  }
}

function initPuzzleSelection(divs) {
  divs.forEach((div) => {
    console.log('Назначение обработчика для:', div);
    div.addEventListener('click', handClickChoice);
  });
}

export default initPuzzleSelection;
