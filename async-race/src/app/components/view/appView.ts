import GarageView from './garage/garage';
import WinnersView from './winners/winners';
import UnionPage from './union/union-page';
import EventEmitter from '../../utils/event-emitter';
import { Page } from '../model/state-page';
import Car from '../model/car-class';

class AppView {
  private emitter: EventEmitter;

  private unionPage: UnionPage;

  private garageView: GarageView;

  private winnersView: WinnersView;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.garageView = new GarageView(emitter);
    this.winnersView = new WinnersView(emitter);
    this.unionPage = new UnionPage(emitter);
    document.body.append(this.unionPage.getElement());
    this.unionPage.addPage(this.garageView);
    this.unionPage.addPage(this.winnersView);
  }

  public setView(page: Page): void {
    if (page === Page.Garage) {
      this.garageView.setVisibility(true);
      this.winnersView.setVisibility(false);
    } else {
      this.garageView.setVisibility(false);
      this.winnersView.setVisibility(true);
    }
  }

  public setCars(cars: Car[], total: number, page: number): void {
    this.garageView.setCars(cars, total, page);
  }
}

export default AppView;
