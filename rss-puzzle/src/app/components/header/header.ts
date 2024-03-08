import { Component, InterComponent } from '../base-component';

class HeaderComponent extends Component<InterComponent> {
  constructor() {
    super({ tag: 'header', className: 'header' });

    // Создание контейнера списка
    const headerContainer = new Component<InterComponent>({
      tag: 'div',
      className: 'header__container',
    });

    // Создание элемента списка с текстом
    const headerTitle = new Component<InterComponent>({
      tag: 'h1',
      className: 'header__title',
      text: 'English Puzzle',
    });
    headerContainer.append(headerTitle);

    // Добавление в header
    this.append(headerContainer);
  }
}

export default HeaderComponent;
