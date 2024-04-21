import Router from '../../utils/router';
import { View } from '../model/common';
import Validator from '../../utils/validate';
import webSocketClient from '../../services/websocket-service';
import ModalShowUserAuth from '../../utils/show-modal';

class AccessView implements View {
  private form: HTMLFormElement;

  public container: HTMLDivElement;

  private submitButton!: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('access-container');
    document.body.appendChild(this.container);

    this.form = this.createForm();
    this.container.appendChild(this.form);

    this.submitButton.disabled = true;

    const modalShowUserAuth = new ModalShowUserAuth();

    webSocketClient.onMessage((event) => {
      const serverMessage = JSON.parse(event.data);
      console.log(serverMessage);
      if (serverMessage.type === 'USER_LOGIN') {
        Router.navigateTo('main');
      } else if (serverMessage.type === 'ERROR') {
        // Вызов функции, которая показывает модальное окно с ошибкой
        modalShowUserAuth.showModal(serverMessage.payload.error);
      }
    });
  }

  createForm() {
    const form = document.createElement('form');
    const usernameInput = this.createInputElement('Enter your name', 'text');
    const passwordInput = this.createInputElement('Enter password', 'password');
    this.submitButton = this.createButtonElement(
      'Login',
      'submit',
      'submit-button'
    );
    const infoButton = this.createButtonElement(
      'Info',
      'button',
      'info-button'
    );

    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(this.submitButton);
    form.appendChild(infoButton);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmission(usernameInput, passwordInput);
    });

    return form;
  }

  // eslint-disable-next-line class-methods-use-this
  private handleFormSubmission(...inputs: HTMLInputElement[]): void {
    const allValid = inputs.every((input) => {
      Validator.validateInput(input);
      if (input.parentNode) {
        const errorSpanExists =
          input.parentNode.querySelector('span.error-message');
        return !errorSpanExists;
      }
      return false;
    });

    if (allValid) {
      const loginDataAG = {
        user: {
          login: inputs[0].value,
          password: inputs[1].value,
        },
      };
      sessionStorage.setItem('loginDataAG', JSON.stringify(loginDataAG.user));

      webSocketClient.sendRequest('USER_LOGIN', loginDataAG);
    } else {
      this.submitButton.disabled = true;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private createInputElement(
    placeholder: string,
    type: string
  ): HTMLInputElement {
    const input: HTMLInputElement = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.className = 'form-input';
    input.dataset.validated = 'false';

    input.addEventListener('input', () => {
      Validator.validateInput(input);
      if (
        input.parentNode &&
        !input.parentNode.querySelector('span.error-message')
      ) {
        input.dataset.validated = 'true'; // Отмечаем поле как валидно, если ошибок нет
      } else {
        input.dataset.validated = 'false'; // Отмечаем поле как невалидно, если есть ошибки
      }
      this.checkFormValidity();
    });
    return input;
  }

  private checkFormValidity() {
    const inputs = this.form.querySelectorAll('input.form-input');
    const allValid = Array.from(inputs).every((input) => {
      return (input as HTMLElement).dataset.validated === 'true';
    });

    this.submitButton.disabled = !allValid;
  }

  // eslint-disable-next-line class-methods-use-this
  private createButtonElement(
    text: string,
    type: 'button' | 'submit' | 'reset',
    className: string
  ): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = text;
    button.type = type;
    button.className = className;
    // класс Router для навигации
    if (text === 'Info') {
      button.addEventListener('click', () => Router.navigateTo('about'));
    }
    return button;
  }
}

export default AccessView;
