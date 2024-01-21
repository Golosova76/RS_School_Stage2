function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header__container';
  const headerTitle = document.createElement('h1');
  headerTitle.className = 'header__title';
  headerTitle.textContent = 'Nonogram game';
  headerContainer.appendChild(headerTitle);
  header.appendChild(headerContainer);
  return header;
}

export default createHeader;
