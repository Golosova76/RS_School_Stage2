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
    const mainShadow = document.createElement('main');
    mainShadow.classList.add('main-shadow');
    this.container.appendChild(mainShadow);

    this.createHeader(mainShadow);
    this.createBody(mainShadow);
    this.createFooter(mainShadow);
  }

  // eslint-disable-next-line class-methods-use-this
  private createHeader(parent: HTMLElement): void {
    const section = document.createElement('section');
    section.className = 'main-header';

    // Создание и добавление блока пользователя
    const userDiv = document.createElement('div');
    userDiv.className = 'main-user';
    const userText = document.createElement('span');
    userText.className = 'user-text';
    userText.textContent = 'User: ';
    const userTitle = document.createElement('span');
    userTitle.className = 'user-title';
    userDiv.appendChild(userText);
    userDiv.appendChild(userTitle);

    // Создание и добавление заголовка
    const title = document.createElement('h1');
    title.className = 'main-title';
    title.textContent = 'Fun Chat';

    // Создание и добавление кнопок
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'main-button';
    const infoButton = document.createElement('button');
    infoButton.className = 'main-info button';
    infoButton.textContent = 'Info';
    const logoutButton = document.createElement('button');
    logoutButton.className = 'main-logout button';
    logoutButton.textContent = 'Logout';
    buttonDiv.appendChild(infoButton);
    buttonDiv.appendChild(logoutButton);

    // Добавление всех созданных элементов в блок
    section.appendChild(userDiv);
    section.appendChild(title);
    section.appendChild(buttonDiv);

    // Добавление в родительский элемент
    parent.appendChild(section);
  }

  // eslint-disable-next-line class-methods-use-this
  private createBody(parent: HTMLElement): void {
    const section = document.createElement('section');
    section.className = 'main-body';

    // Создание и добавление боковой панели слева
    const asideLeft = document.createElement('aside');
    asideLeft.className = 'main-left';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'main-search';
    searchInput.placeholder = 'Search...';
    const userList = document.createElement('ul');
    userList.className = 'main-users';
    asideLeft.appendChild(searchInput);
    asideLeft.appendChild(userList);

    // Создание и добавление основного содержимого справа
    const articleRight = document.createElement('article');
    articleRight.className = 'main-right';
    const dialogUserDiv = document.createElement('div');
    dialogUserDiv.className = 'main-dialog-user';
    const dialogContentDiv = document.createElement('div');
    dialogContentDiv.className = 'main-dialog-content';
    const messageSpan = document.createElement('span');
    messageSpan.className = 'info-message';
    messageSpan.textContent = 'Select the user to send the message to...';
    const hiddenMessageSpan = document.createElement('span');
    hiddenMessageSpan.className = 'info-message';
    hiddenMessageSpan.textContent = 'Write your first post...';
    hiddenMessageSpan.hidden = true;
    dialogContentDiv.appendChild(messageSpan);
    dialogContentDiv.appendChild(hiddenMessageSpan);
    const dialogInputDiv = document.createElement('div');
    dialogInputDiv.className = 'main-dialog-input';
    const messageInput = document.createElement('input');
    messageInput.type = 'text';
    messageInput.className = 'main-message';
    messageInput.placeholder = 'Message...';
    const sendButton = document.createElement('button');
    sendButton.className = 'main-message-input button';
    sendButton.textContent = 'Send';
    sendButton.disabled = true;
    dialogInputDiv.appendChild(messageInput);
    dialogInputDiv.appendChild(sendButton);

    articleRight.appendChild(dialogUserDiv);
    articleRight.appendChild(dialogContentDiv);
    articleRight.appendChild(dialogInputDiv);

    // Добавление созданных элементов в блок
    section.appendChild(asideLeft);
    section.appendChild(articleRight);

    // Добавление в родительский элемент
    parent.appendChild(section);
  }

  // eslint-disable-next-line class-methods-use-this
  private createFooter(parent: HTMLElement): void {
    const section = document.createElement('section');
    section.className = 'main-footer';

    // Создание и добавление ссылки на RSSchool
    const linkSchool = document.createElement('a');
    linkSchool.href = 'https://rs.school/';
    linkSchool.className = 'main-link-school';
    linkSchool.target = '_blank';
    linkSchool.textContent = 'RSSchool';

    // Создание и добавление ссылки на GitHub
    const linkGit = document.createElement('a');
    linkGit.href = 'https://github.com/Golosova76';
    linkGit.className = 'main-link-git';
    linkGit.target = '_blank';
    linkGit.textContent = 'Anna Golosova';

    const spanYear = document.createElement('span');
    spanYear.className = 'main-year';
    spanYear.textContent = '2024';

    // Добавление всех созданных элементов в блок
    section.appendChild(linkSchool);
    section.appendChild(linkGit);
    section.appendChild(spanYear);

    // Добавление в родительский элемент
    parent.appendChild(section);
  }
}

export default MainView;
