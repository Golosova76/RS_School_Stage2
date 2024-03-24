import { StatePage, Page } from '../view/common-types';

class AppStatePage implements StatePage {
  public currentPage: Page = Page.Garage;

  public garagePage = 1;

  public winnersPage = 1;

  constructor(statePage?: unknown) {
    if (statePage !== null && typeof statePage === 'object') {
      if (
        'currentPage' in statePage &&
        (statePage.currentPage === Page.Garage ||
          statePage.currentPage === Page.Winners)
      ) {
        this.currentPage = statePage.currentPage;
      }

      if (
        'garagePage' in statePage &&
        typeof statePage.garagePage === 'number'
      ) {
        this.garagePage = statePage.garagePage;
      }

      if (
        'winnersPage' in statePage &&
        typeof statePage.winnersPage === 'number'
      ) {
        this.winnersPage = statePage.winnersPage;
      }
    }
  }
}

export default AppStatePage;
