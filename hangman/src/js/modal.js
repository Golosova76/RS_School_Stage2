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
  modalText.textContent = 'Congratulations! You win!';

  const modalWord = document.createElement('div');
  modalWord.className = 'modal__word';
  modalWord.textContent = 'Answer was: kindness';

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

function showGameOverModal(isWin) {
  if (!modalElements) {
    modalElements = createModal();
  }

  // Установка текста
  modalElements.modalText.textContent = isWin
    ? 'Congratulations! You win!'
    : 'Unfortunately, you lost!';
  modalElements.modalWord.textContent = `Answer was: ${currentWord}`;

  // Изменение стилей для отображения модального окна
  modalElements.modal.style.opacity = '1';
  modalElements.modal.style.visibility = 'visible';

  modalElements.modalContent.style.opacity = '1';
  document.body.appendChild(modalElements.modal);
  modalElements.modalContent.style.transform =
    'perspective(600px) translate(0px, 0px) rotateX(0deg)';
}

export { createModal, showGameOverModal };
