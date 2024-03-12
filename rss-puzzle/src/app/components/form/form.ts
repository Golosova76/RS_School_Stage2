import { Component, InterComponent } from '../base-component';

class FormComponent extends Component<InterComponent> {
  constructor() {
    super({ tag: 'form', className: 'form' });
    // Вызов метода для создания и добавления элементов формы
    this.createFormComponents();
  }

  // Метод для создания и добавления элементов формы
  private createFormComponents() {
    // Создание и добавление fieldset
    const fieldSet = new Component<InterComponent>({
      tag: 'fieldset',
      className: 'fieldset',
    });
    this.append(fieldSet);

    // Создание и добавление legend
    const legend = new Component<InterComponent>({
      tag: 'legend',
      text: 'required',
      className: 'legend',
    });
    fieldSet.append(legend);

    // Создание и добавление label для имени
    const nameLabel = new Component<InterComponent>({
      tag: 'label',
      text: 'Name',
      className: 'required',
    });
    nameLabel.setAttribute('for', 'label-name');
    fieldSet.append(nameLabel);

    // Создание и добавление input для имени
    const nameInput = new Component<InterComponent>({
      tag: 'input',
      className: 'input-name',
      type: 'text',
    });
    nameInput.setAttribute('id', 'label-name');
    nameInput.setAttribute('name', 'label-name');
    nameInput.setAttribute('aria-required', 'true');
    nameInput.setAttribute('required', '');
    fieldSet.append(nameInput);

    // Создание и добавление label для фамилии
    const surnameLabel = new Component<InterComponent>({
      tag: 'label',
      text: 'Surname',
      className: 'required',
    });
    surnameLabel.setAttribute('for', 'label-surname');
    fieldSet.append(surnameLabel);

    // Создание и добавление input для фамилии
    const surnameInput = new Component<InterComponent>({
      tag: 'input',
      className: 'input-name',
      type: 'text',
    });
    surnameInput.setAttribute('id', 'label-surname');
    surnameInput.setAttribute('name', 'label-surname');
    surnameInput.setAttribute('aria-required', 'true');
    surnameInput.setAttribute('required', '');
    fieldSet.append(surnameInput);
  }

  public appendToFormDirectly(child: Component<InterComponent>): void {
    // метод append базового класса для добавления элемента непосредственно в форму
    this.append(child);
  }
}

export default FormComponent;
