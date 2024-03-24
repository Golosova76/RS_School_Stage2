import { DEFAULT_COLOR } from '../common-types';

class CarUIManager {
  element!: HTMLDivElement;

  name!: HTMLInputElement;

  color!: HTMLInputElement;

  button!: HTMLButtonElement;

  // eslint-disable-next-line class-methods-use-this
  public createInputBlock(type: 'create' | 'update'): {
    element: HTMLDivElement;
    name: HTMLInputElement;
    color: HTMLInputElement;
    button: HTMLButtonElement;
  } {
    const element = document.createElement('div');
    element.className = `garage__${type}-car`;
    const name = document.createElement('input');
    name.className = 'garage__name-input';
    element.append(name);
    const color = document.createElement('input');
    color.className = 'garage__color-input';
    color.type = 'color';
    color.value = DEFAULT_COLOR;
    element.append(color);
    const button = document.createElement('button');
    button.className = 'button';
    button.innerText = type === 'create' ? 'CREATE' : 'UPDATE';
    element.append(button);

    return { element, name, color, button };
  }

  public createNewCarBlock(): HTMLElement {
    const newCarBlock = this.createInputBlock('create');
    return newCarBlock.element;
  }

  public createUpdateCarBlock(): HTMLElement {
    const updateCarBlock = this.createInputBlock('update');
    return updateCarBlock.element;
  }
}

export default CarUIManager;
