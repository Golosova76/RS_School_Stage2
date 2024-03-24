import EventEmitter from '../../../utils/event-emitter';
import { View } from '../common-types';
import CarUIManager from './cars';

class GarageView implements View {
  private emitter: EventEmitter;

  private uiManager: CarUIManager;

  private elements;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.elements = {
      root: document.createElement('div'),
    };
    this.uiManager = new CarUIManager();
    this.init();
  }

  public getElement(): HTMLElement {
    return this.elements.root;
  }

  public setVisibility(visibility: boolean): void {
    if (visibility) {
      this.elements.root.classList.remove('hidden');
    } else {
      this.elements.root.classList.add('hidden');
    }
  }

  private init(): void {
    const { root } = this.elements;
    root.className = 'page__garage garage';
    const newCar = this.uiManager.createNewCarBlock();
    root.append(newCar);
    const updateCar = this.uiManager.createUpdateCarBlock();
    root.append(updateCar);
  }
}

export default GarageView;
