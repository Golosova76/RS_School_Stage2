import { Component, InterComponent } from '../base-component';

// Определение типа для параметров кнопки
type ButtonOptions = {
  className?: string;
  text?: string;
  type?: string; // 'submit', 'button', 'reset'
  id?: string;
  disabled?: boolean;
  // еще параметры
};

class ButtonComponent extends Component<InterComponent> {
  constructor(options: ButtonOptions) {
    super({
      tag: 'button',
      className: options.className || '', // Установка класса, если он передан
      text: options.text || '', // Установка текста кнопки, если он передан
    });

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

    // добавить другие атрибуты и их обработку
  }
}

export default ButtonComponent;
