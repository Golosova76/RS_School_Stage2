import Router from '../../utils/router';
import { View } from '../model/common';
import Validator from '../../utils/validate';

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
    // this.submitButton.disabled = true;
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
      // this.submitButton.disabled = !allValid;
      Router.navigateTo('main');
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
    return input;
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
