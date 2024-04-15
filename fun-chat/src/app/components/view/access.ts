import Router from '../../utils/router';
import { View } from '../model/common';

class AccessView implements View {
  private form: HTMLFormElement;

  public container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('access-container');
    document.body.appendChild(this.container);

    // this.container = container;
    this.form = this.createForm();
    this.container.appendChild(this.form);
  }

  createForm() {
    const form = document.createElement('form');
    const usernameInput = this.createInputElement('Enter your name', 'text');
    const passwordInput = this.createInputElement('Enter password', 'password');
    const submitButton = this.createButtonElement(
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
    form.appendChild(submitButton);
    form.appendChild(infoButton);

    return form;
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
