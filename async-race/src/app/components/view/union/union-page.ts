import EventEmitter from '../../../utils/event-emitter';
import { View, Page, Events } from '../common-types';

class UnionPage implements View {
  private element: HTMLElement;

  private page: HTMLElement;

  private emitter: EventEmitter;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.element = document.createElement('div'); // верхний блок одинаковый на 2х страницах (2кнопки)
    this.page = document.createElement('div'); // сама страница
    this.init();
  }

  // добавляем нужную страницу (в вызове ставим) в UnionPage
  public addPage(view: View): void {
    this.page.append(view.getElement());
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private init(): void {
    this.element.className = 'race';
    const navButtons = document.createElement('div');
    navButtons.className = 'race__nav nav';
    const garageButton = this.createNavButton(Page.Garage, 'Garage');
    navButtons.append(garageButton);
    const winnersButton = this.createNavButton(Page.Winners, 'Winners');
    navButtons.append(winnersButton);
    this.element.append(navButtons);
    this.page.className = 'race__page page';
    this.element.append(this.page);
  }

  private createNavButton(page: Page, title: string): HTMLElement {
    const navButton = document.createElement('button');
    navButton.className = 'nav__button button';
    navButton.innerText = title;
    navButton.onclick = (): void =>
      this.emitter.emit(Events.ClickNavButton, { page });
    return navButton;
  }
}

export default UnionPage;
