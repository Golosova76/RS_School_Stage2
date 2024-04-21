import Router from '../../utils/router';
import { View, Users, User } from '../model/common';
import webSocketClient from '../../services/websocket-service';
import userService from '../../services/user-service';
import ModalShowUserLogout from '../../utils/show-modal-error-logout';

class MainView implements View {
  public container: HTMLDivElement;

  userList!: HTMLElement;

  private userElements: Record<string, HTMLElement> = {};

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('main-container');
    document.body.appendChild(this.container);
    this.initializeContent();
    this.fetchUsers();
    const modalShowUserLogout = new ModalShowUserLogout();
    webSocketClient.onMessage((event) => {
      const serverMessage = JSON.parse(event.data);
      if (serverMessage.type === 'USER_LOGOUT') {
        Router.navigateTo('access');
        sessionStorage.clear();
        userService.isLogined = false;
      } else if (serverMessage.type === 'ERROR') {
        // Вызов функции, которая показывает модальное окно с ошибкой
        modalShowUserLogout.showModalErrorLogout(serverMessage.payload.error);
      } else if (
        serverMessage.type === 'USER_ACTIVE' ||
        serverMessage.type === 'USER_INACTIVE'
      ) {
        this.updateUserList(serverMessage.payload.users);
      } else if (serverMessage.type === 'USER_EXTERNAL_LOGIN') {
        this.updateUserYU(serverMessage.payload.user.login, true);
      }
    });
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
  private updateUserYU(login: string, status: boolean) {
    const changeUserElement = Object.values(this.userElements).find((elem) => {
      return elem.innerText === login;
    });
    if (status) {
      if (changeUserElement) {
        const statusIndicator = changeUserElement.querySelector(
          '.status-indicator'
        ) as HTMLSpanElement;
        statusIndicator.style.backgroundColor = 'green';
      } else {
        this.createUser(login, status);
      }
    }
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
    const sessionUser = sessionStorage.getItem('loginDataAG');
    // Проверка, что данные пользователя действительно были получены
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      // Установка логина пользователя как текста для элемента userTitle
      userTitle.textContent = userData.login;
    } else {
      // Если данных в sessionStorage нет, установить текст по умолчанию
      userTitle.textContent = 'No user name';
    }
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
    if (infoButton.textContent === 'Info') {
      infoButton.addEventListener('click', () => Router.navigateTo('about'));
    }
    const logoutButton = document.createElement('button');
    logoutButton.className = 'main-logout button';
    logoutButton.textContent = 'Logout';
    logoutButton.addEventListener('click', (event) => {
      event.preventDefault();
      // Проверка, что данные пользователя действительно были получены
      if (sessionUser) {
        const userData = JSON.parse(sessionUser);
        const loginDataAG = {
          user: {
            login: userData.login,
            password: userData.password,
          },
        };
        webSocketClient.sendRequest('USER_LOGOUT', loginDataAG);
      }
      // webSocketClient.sendRequest('USER_LOGOUT', loginDataAG);
    });
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

    // Создание и добавление боковой панели слева (список users)
    const asideLeft = document.createElement('aside');
    asideLeft.className = 'main-left';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'main-search';
    searchInput.placeholder = 'Search...';
    this.userList = document.createElement('ul');
    this.userList.className = 'main-users';
    asideLeft.appendChild(searchInput);
    asideLeft.appendChild(this.userList);

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
  /*
  private updateUserList(users: Users) {
    this.userList.innerHTML = ''; // Очищаем текущий список
    users.forEach((user: User) => {
      const userstList = document.createElement('li');

      const statusIndicator = document.createElement('span');
      statusIndicator.className = 'status-indicator';
      statusIndicator.style.backgroundColor = user.isLogined
        ? 'green'
        : 'black';
      userstList.appendChild(statusIndicator);
      userstList.appendChild(document.createTextNode(user.login));
      this.userList.appendChild(userstList);
    });
  }
*/

  private updateUserList(users: Users) {
    const sessionUser = sessionStorage.getItem('loginDataAG');
    if (sessionUser === null) {
      return;
    }
    const userData = JSON.parse(sessionUser);
    const currentUserLogin = userData.login;

    // Добавляем новых пользователей или обновляем информацию о существующих

    users.forEach((user: User) => {
      if (user.login !== currentUserLogin) {
        let userstListItem = this.userElements[user.login];
        if (!userstListItem) {
          // Создаем новый элемент списка для пользователя
          userstListItem = document.createElement('li');
          const statusIndicator = document.createElement('span');
          statusIndicator.className = 'status-indicator';
          statusIndicator.style.backgroundColor = user.isLogined
            ? 'green'
            : 'black';
          userstListItem.appendChild(statusIndicator);
          userstListItem.appendChild(document.createTextNode(user.login));
          this.userList.appendChild(userstListItem);
          this.userElements[user.login] = userstListItem;
        } else {
          // Обновляем статус индикатора для существующего пользователя
          const statusIndicator = userstListItem.querySelector(
            '.status-indicator'
          ) as HTMLSpanElement;
          statusIndicator.style.backgroundColor = user.isLogined
            ? 'green'
            : 'black';
        }
      }
    });
    // Удаляем элементы пользователей, которые больше не существуют в актуальном списке
    Object.keys(this.userElements).forEach((login) => {
      if (!users.some((user) => user.login === login)) {
        this.userList.removeChild(this.userElements[login]);
        delete this.userElements[login];
      }
    });
  }

  private createUser(login: string, active: boolean) {
    // Создаем новый элемент списка для пользователя
    const userstListItem = document.createElement('li');
    const statusIndicator = document.createElement('span');
    statusIndicator.className = 'status-indicator';
    statusIndicator.style.backgroundColor = active ? 'green' : 'black';
    userstListItem.appendChild(statusIndicator);
    userstListItem.appendChild(document.createTextNode(login));
    this.userList.appendChild(userstListItem);
    this.userElements[login] = userstListItem;
  }

  // eslint-disable-next-line class-methods-use-this
  public fetchUsers() {
    webSocketClient.sendRequest('USER_ACTIVE', null);
    webSocketClient.sendRequest('USER_INACTIVE', null);
  }
}

export default MainView;
