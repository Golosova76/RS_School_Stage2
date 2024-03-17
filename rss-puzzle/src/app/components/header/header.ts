import { Component, InterComponent } from '../base-component';

class HeaderComponent extends Component<InterComponent> {
  constructor() {
    super({ tag: 'header', className: 'header' });
    this.init();
  }

  private init(): void {
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

    // Сборка и добавление элементов
    headerContainer.append(headerTitle);
    this.append(headerContainer);
  }
}

export default HeaderComponent;
