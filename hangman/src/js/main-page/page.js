import createGallows from './gallows';
import createBody from './body';

function createMain() {
  const page = document.createElement('main');
  page.className = 'page';

  const pageContainer = document.createElement('div');
  pageContainer.className = 'page__container game';

  pageContainer.appendChild(createGallows());
  pageContainer.appendChild(createBody());
  page.appendChild(pageContainer);

  return page;
}

export default createMain;
