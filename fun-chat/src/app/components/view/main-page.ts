// import Router from '../../utils/router';
import { View } from '../model/common';

class MainView implements View {
  public container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('main-container');
    document.body.appendChild(this.container);
    this.initializeContent();
  }

  private initializeContent(): void {
    const mainShadow = document.createElement('div');
    mainShadow.classList.add('shadow-main');
    this.container.appendChild(mainShadow);

    const title = document.createElement('h1');
    title.textContent = 'Fun Chat';
    title.classList.add('title-about');
    mainShadow.appendChild(title);
  }
}

export default MainView;
