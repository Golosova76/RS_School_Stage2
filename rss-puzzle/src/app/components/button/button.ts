import { Component, InterComponent } from '../base-component';

// Определение типа для параметров кнопки
type ButtonOptions = {
  className?: string;
  text?: string;
  type?: string; // 'submit', 'button', 'reset'
  id?: string;
  disabled?: boolean;
  onClick?: () => void;
};

class ButtonComponent extends Component<InterComponent> {
  constructor(options: ButtonOptions) {
    super({
      tag: 'button',
      className: options.className || '',
      text: options.text || '',
    });

    this.getNode().addEventListener('click', () => options.onClick?.());

    // Установка типа кнопки, если он передан
    if (options.type) {
      this.setAttribute('type', options.type);
    }

    // Установка идентификатора, если он передан
    if (options.id) {
      this.setAttribute('id', options.id);
    }

    // Установка атрибута disabled, если он передан и равен true
    if (options.disabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }
}

export default ButtonComponent;
