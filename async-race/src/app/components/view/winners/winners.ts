import EventEmitter from '../../../utils/event-emitter';
import { View } from '../common-types';

class WinnersView implements View {
  private emitter: EventEmitter;

  private elements;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.elements = {
      root: document.createElement('div'),
    };
    this.init();
  }

  public getElement(): HTMLElement {
    return this.elements.root;
  }

  public setVisibility(visibility: boolean): void {
    const { root } = this.elements;
    if (visibility) {
      root.classList.remove('hidden');
    } else {
      root.classList.add('hidden');
    }
  }

  private init(): void {
    const { root } = this.elements;
    root.className = 'page__winners winners';
    root.innerText = 'HELLO!!!';
  }
}
export default WinnersView;
