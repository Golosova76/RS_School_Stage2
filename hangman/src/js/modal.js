import { currentWord } from './main-page/words';

function createModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalBody = document.createElement('div');
  modalBody.className = 'modal__body';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal__content';

  const modalText = document.createElement('div');
  modalText.className = 'modal__text';

  const modalWord = document.createElement('div');
  modalWord.className = 'modal__word';

  const playAgainButton = document.createElement('button');
  playAgainButton.className = 'modal__button';
  playAgainButton.textContent = 'Play again';
  // playAgainButton.addEventListener('click', resetGame);

  // Сборка модального окна
  modalContent.appendChild(modalText);
  modalContent.appendChild(modalWord);
  modalContent.appendChild(playAgainButton);
  modalBody.appendChild(modalContent);
  modal.appendChild(modalBody);

  return { modal, modalContent, modalText, modalWord, playAgainButton };
}

let modalElements = null;
console.log(modalElements);

function showGameOverModal(isWin) {
  console.log(modalElements);
  if (!modalElements) {
    modalElements = createModal();
    console.log(modalElements);
  }

  // Использование modalText и modalWord из modalElements
  modalElements.modalText.textContent = isWin
    ? 'Поздравляем! Вы выиграли!'
    : 'К сожалению, вы проиграли.';
  modalElements.modalWord.textContent = `Загаданное слово было: ${currentWord}`;

  // Показ модального окна

  modalElements.modal.style.opacity = '1';
  modalElements.modal.style.visibility = 'visible';

  modalElements.modalContent.style.opacity = '1';
  modalElements.modalContent.style.transform =
    'perspective(600px) translate(0px, 0px) rotateX(0deg)';
}

export { createModal, showGameOverModal };
