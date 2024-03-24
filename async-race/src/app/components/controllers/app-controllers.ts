import EventEmitter from '../../utils/event-emitter';
import AppView from '../view/appView';
import CommonService from '../../services/api-service/common-api';
import AppStatePage from '../model/state-page';
import { Page, Events, EventValue, StatePage } from '../view/common-types';

class AppControllers {
  private emitter: EventEmitter;

  private commonService: CommonService;

  private appView: AppView;

  private pageState: StatePage; // это интерфейс!!!!

  private localStorageKey = 'golosova__race-state';

  constructor(
    emitter: EventEmitter,
    commonService: CommonService,
    view: AppView
  ) {
    this.emitter = emitter;
    this.commonService = commonService;
    this.appView = view;
    this.pageState = this.getState();
    this.init();
  }

  public start(): void {
    this.appView.setView(this.pageState.currentPage);
  }

  private init(): void {
    this.emitter.on(Events.ClickNavButton, (value: EventValue) => {
      let page: Page | null = null;

      if (value.page === Page.Garage) {
        page = Page.Garage;
      } else if (value.page === Page.Winners) {
        page = Page.Winners;
      }

      if (page !== null && this.pageState.currentPage !== page) {
        this.pageState.currentPage = page;
        this.saveState();
        this.appView.setView(page);
      }
    });
    this.emitter.on(Events.SaveStatePage, () => {
      this.saveState();
    });
  }

  private getState(): StatePage {
    const lsStatePage = localStorage.getItem(this.localStorageKey);

    if (lsStatePage !== null) {
      const loadedState: unknown = JSON.parse(lsStatePage);
      return new AppStatePage(loadedState);
    }
    return new AppStatePage();
  }

  private saveState(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.pageState));
  }
}

export default AppControllers;
