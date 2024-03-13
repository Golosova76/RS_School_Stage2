import { Component, InterComponent } from '../base-component';

class FooterComponent extends Component<InterComponent> {
  constructor() {
    super({ tag: 'footer', className: 'footer' });
    this.init();
  }

  private init(): void {
    // Создание контейнера списка
    const listContainer = new Component<InterComponent>({
      tag: 'ul',
      className: 'footer__items',
    });

    // Создание элемента списка с текстом
    const listItemYear = new Component<InterComponent>({
      tag: 'li',
      className: 'footer__item',
      text: '2024',
    });
    listContainer.append(listItemYear);

    // Создание элемента списка с ссылкой
    const listItemLink = new Component<InterComponent>({
      tag: 'li',
      className: 'footer__item',
    });
    const link = new Component<InterComponent>({
      tag: 'a',
      className: 'footer__link',
      text: 'GitHub',
    });
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'https://github.com/Golosova76');
    listItemLink.append(link);
    listContainer.append(listItemLink);

    // Добавление списка в footer
    this.append(listContainer);
  }
}

export default FooterComponent;
