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

  return modal;
}

function showGameOverModal(isWin) {
  const modal = createModal();

  // Найдите элементы внутри модального окна
  const modalContent = modal.querySelector('.modal__content');
  const modalText = modal.querySelector('.modal__text');
  const modalWord = modal.querySelector('.modal__word');

  // Установка текста
  modalText.textContent = isWin
    ? 'Congratulations! You win!'
    : 'Unfortunately, you lost!';
  modalWord.textContent = `Answer was: ${currentWord}`;

  // Изменение стилей для отображения модального окна
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';

  modal.style.display = 'none'; // Сначала скрыть
  modal.style.display = 'block'; // Затем снова показать

  modalContent.style.opacity = '1';
  document.body.appendChild(modal);
  modalContent.style.transform =
    'perspective(600px) translate(0px, 0px) rotateX(0deg)';
}

export { createModal, showGameOverModal };
