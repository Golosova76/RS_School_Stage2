class ModalShowUserLogout {
  // eslint-disable-next-line class-methods-use-this
  public showModalErrorLogout(errorMessage: string): void {
    let modal = document.querySelector('.modal') as HTMLElement;

    if (!modal) {
      modal = document.createElement('div');
      modal.classList.add('modal');

      const modalBody = document.createElement('div');
      modalBody.classList.add('modal__body');

      const modalContent = document.createElement('div');
      modalContent.classList.add('modal__content');
      modalContent.textContent = errorMessage;

      modalBody.appendChild(modalContent);
      modal.appendChild(modalBody);
      document.body.appendChild(modal);

      modal.addEventListener('click', () => {
        modal.classList.remove('popup-open');
      });
    } else {
      const modalContent = modal.querySelector(
        '.modal__content'
      ) as HTMLElement;
      modalContent.textContent = errorMessage;
    }

    // Плавное появление модального окна
    setTimeout(() => {
      modal.classList.add('popup-open');
    }, 10); // Небольшая задержка перед добавлением класса для анимации
  }

  // eslint-disable-next-line class-methods-use-this
  public hideModal(): void {
    const modal = document.querySelector('.modal') as HTMLElement | null;
    if (modal) {
      modal.classList.remove('popup-open');
    }
  }
}

export default ModalShowUserLogout;
