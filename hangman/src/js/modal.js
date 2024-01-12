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

  // Добавляем модальное окно в DOM
  document.body.appendChild(modal);

  return modal;
}

export default createModal;
