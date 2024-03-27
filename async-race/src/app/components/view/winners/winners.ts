import EventEmitter from '../../../utils/event-emitter';
import { View, SortValue, Events } from '../common-types';

class WinnersView implements View {
  private emitter: EventEmitter;

  private elements;

  constructor(emitter: EventEmitter) {
    this.emitter = emitter;
    this.elements = {
      root: document.createElement('div'),
      title: {
        totalCount: document.createElement('span'),
        page: document.createElement('span'),
      },
      table: {
        head: {
          idSort: document.createElement('span'),
          winsSort: document.createElement('span'),
          timeSort: document.createElement('span'),
        },
        body: document.createElement('tbody'),
      },
      pagination: {
        prevButton: document.createElement('button'),
        nextButton: document.createElement('button'),
      },
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
    const title = document.createElement('h2');
    title.className = 'winners__title';
    title.append('Winners (', this.elements.title.totalCount, ')');
    root.append(title);
    const pageTitle = document.createElement('h3');
    pageTitle.className = 'winners__page-title';
    pageTitle.append('Page #', this.elements.title.page);
    root.append(pageTitle);

    const table = this.createWinnerTable();
    root.append(table);

    const pagination = this.createPagination();
    root.append(pagination);
  }

  private createWinnerTable(): HTMLElement {
    const tableWinners = document.createElement('table');
    tableWinners.className = 'winners__table table';
    const headTable = document.createElement('thead');
    headTable.className = 'table__head';
    const createThTable = (
      name: string,
      sortValue?: SortValue
    ): HTMLElement => {
      const th = document.createElement('th');
      th.className = 'table__th';
      th.innerText = name;
      if (sortValue) {
        const span = this.elements.table.head[`${sortValue}Sort`];
        th.classList.add('table__th_sort');
        th.append(span);
        th.onclick = (): void => {
          this.emitter.emit(Events.ClickWinnersSort, { sortValue });
        };
      }
      return th;
    };
    const thNumber = createThTable('#');
    headTable.append(thNumber);
    const thId = createThTable('Id', SortValue.Id);
    headTable.append(thId);
    const thCar = createThTable('Car');
    headTable.append(thCar);
    const thName = createThTable('Name');
    headTable.append(thName);
    const thWins = createThTable('Wins', SortValue.Wins);
    headTable.append(thWins);
    const thTime = createThTable('Best time(seconds)', SortValue.Time);
    headTable.append(thTime);
    tableWinners.append(headTable);
    tableWinners.append(this.elements.table.body);
    return tableWinners;
  }

  private createPagination(): HTMLElement {
    const pagination = document.createElement('div');
    pagination.className = 'winners__pagination pagination';
    const { prevButton } = this.elements.pagination;
    prevButton.className = 'pagination__btn btn btn_primary';
    prevButton.innerText = 'PREV';
    prevButton.disabled = true;
    prevButton.onclick = (): void => {
      this.emitter.emit(Events.ClickWinnersPrevButton, {});
    };
    pagination.append(prevButton);
    const { nextButton } = this.elements.pagination;
    nextButton.className = 'pagination__btn btn btn_primary';
    nextButton.innerText = 'NEXT';
    nextButton.disabled = true;
    nextButton.onclick = (): void => {
      this.emitter.emit(Events.ClickWinnersNextButton, {});
    };
    pagination.append(nextButton);

    return pagination;
  }
}
export default WinnersView;
