import { Component, InterComponent } from '../base-component';

class MainComponent extends Component<InterComponent> {
  private mainContainer: Component<InterComponent>;

  constructor() {
    super({ tag: 'main', className: 'main' });

    // Создание контейнера списка
    this.mainContainer = new Component<InterComponent>({
      tag: 'div',
      className: 'main__container',
    });
    this.append(this.mainContainer);
  }

  // Метод для добавления компонентов в main__container
  appendToContainer(child: InterComponent): void {
    this.mainContainer.append(child);
  }
}

export default MainComponent;
