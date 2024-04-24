import Router from '../../utils/router';
import { View, Users, User, MessageInfo } from '../model/common';
import webSocketClient from '../../services/websocket-service';
import userService from '../../services/user-service';
import ModalShowUserLogout from '../../utils/show-modal-error-logout';
import MessageUsers from '../../utils/message';

class MainView implements View {
  public container: HTMLDivElement;

  userList!: HTMLElement;

  dialogUserDiv!: HTMLElement;

  dialogContentDiv!: HTMLElement;

  private userElements: Record<string, HTMLElement> = {};

  private currentActiveUserName: string | null = null;

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
      } else if (serverMessage.type === 'USER_ACTIVE') {
        this.updateUserList(serverMessage.payload.users);
      } else if (serverMessage.type === 'USER_INACTIVE') {
        // this.updateUserList(serverMessage.payload.users);
      } else if (serverMessage.type === 'USER_EXTERNAL_LOGIN') {
        this.updateUserYU(serverMessage.payload.user.login, true);
      } else if (serverMessage.type === 'USER_EXTERNAL_LOGOUT') {
        const logoutUserLogin = serverMessage.payload.user.login;
        this.removeUser(logoutUserLogin);
      } else if (serverMessage.type === 'MSG_SEND') {
        // Обработка получения или подтверждения отправки сообщения
        const messageData = serverMessage.payload.message;
        this.displayMessage(messageData);
      }
    });
  }

  // Функция для отображения сообщения в DOM
  // eslint-disable-next-line class-methods-use-this
  public displayMessage(messageData: MessageInfo): void {
    const newMessage = new MessageUsers();
    console.log(messageData.text);
    newMessage.setMessageText(messageData.text);
    newMessage.setMessageDate(new Date(messageData.datetime).toLocaleString());

    let statusText = 'Pending';

    if (messageData.status.isDelivered) {
      statusText = 'Delivered';
    }
    if (messageData.status.isReaded) {
      statusText = 'Read';
    }

    newMessage.setMessageStatus(statusText);
    newMessage.appendToParent(this.dialogContentDiv);
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
        this.handleUserElement(login, status);
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
    this.userList.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // Проверяем, что клик был сделан по элементу списка
      if (target.tagName === 'SPAN' || target.tagName === 'LI') {
        const userLi = target.closest('li') as HTMLElement | null;
        if (userLi) {
          const username = userLi.textContent?.trim();
          const statusIndicator = userLi.querySelector(
            '.status-indicator'
          ) as HTMLElement | null;
          const isActive = statusIndicator?.style.backgroundColor === 'green';
          if (username) {
            this.currentActiveUserName = username;
          }
          this.updateUserDialog(username, isActive);
        }
      }
    });
    asideLeft.appendChild(searchInput);
    asideLeft.appendChild(this.userList);

    // Создание и добавление основного содержимого справа
    const articleRight = document.createElement('article');
    articleRight.className = 'main-right';
    this.dialogUserDiv = document.createElement('div');
    this.dialogUserDiv.className = 'main-dialog-user';
    this.dialogContentDiv = document.createElement('div');
    this.dialogContentDiv.className = 'main-dialog-content';
    const messageSpan = document.createElement('span');
    messageSpan.className = 'info-message';
    messageSpan.textContent = 'Select the user to send the message to...';
    const hiddenMessageSpan = document.createElement('span');
    hiddenMessageSpan.className = 'info-message';
    hiddenMessageSpan.textContent = 'Write your first post...';
    hiddenMessageSpan.hidden = true;
    this.dialogContentDiv.appendChild(messageSpan);
    this.dialogContentDiv.appendChild(hiddenMessageSpan);
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
    // Включение кнопки отправки при наличии текста
    messageInput.addEventListener('input', () => {
      sendButton.disabled = !messageInput.value.trim();
    });
    sendButton.addEventListener('click', () => {
      const messageText = messageInput.value;
      // Подготовка и отправка сообщения
      const messagePayload = {
        message: {
          to: this.currentActiveUserName,
          text: messageText,
        },
      };
      webSocketClient.sendRequest('MSG_SEND', messagePayload);

      // Очистка поля ввода после отправки сообщения
      messageInput.value = '';
    });
    dialogInputDiv.appendChild(messageInput);
    dialogInputDiv.appendChild(sendButton);

    articleRight.appendChild(this.dialogUserDiv);
    articleRight.appendChild(this.dialogContentDiv);
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

  // добавление спанов с логином и в сети в контейнер
  public updateUserDialog(
    username: string | undefined,
    isActive: boolean | undefined
  ) {
    // Очистить предыдущее содержимое
    this.dialogUserDiv.innerHTML = '';

    // Создать элементы для отображения информации
    const usernameSpan = document.createElement('span');
    usernameSpan.textContent = username ?? 'Неизвестный пользователь';

    const statusSpanUser = document.createElement('span');
    statusSpanUser.textContent = isActive ? 'в сети' : 'не в сети';

    // Добавить стили для наглядности (опционально)
    statusSpanUser.style.color = isActive ? 'green' : 'red';

    // Добавить элементы в div
    this.dialogUserDiv.appendChild(usernameSpan);
    // dialogUserDiv.appendChild(document.createTextNode(' ')); // Добавляем пробел между спанами
    this.dialogUserDiv.appendChild(statusSpanUser);
  }

  private updateUserList(users: Users) {
    const sessionUser = sessionStorage.getItem('loginDataAG');
    if (sessionUser === null) {
      return;
    }
    const userData = JSON.parse(sessionUser);
    const currentUserLogin = userData.login;

    users.forEach((user: User) => {
      if (user.login !== currentUserLogin) {
        this.handleUserElement(user.login, user.isLogined);
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

  private handleUserElement(login: string, isActive: boolean) {
    let userElement = this.userElements[login];
    if (!userElement) {
      userElement = document.createElement('li');
      const statusIndicator = document.createElement('span');
      statusIndicator.className = 'status-indicator';
      userElement.appendChild(statusIndicator);
      userElement.appendChild(document.createTextNode(login));
      this.userList.appendChild(userElement);
      this.userElements[login] = userElement;
    }
    const statusIndicator = userElement.querySelector(
      '.status-indicator'
    ) as HTMLSpanElement;
    statusIndicator.style.backgroundColor = isActive ? 'green' : 'black';
  }

  private removeUser(login: string) {
    if (this.userElements[login]) {
      // Удаляем элемент из DOM
      this.userList.removeChild(this.userElements[login]);
      // Удаляем элемент из словаря активных пользователей
      delete this.userElements[login];
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public fetchUsers() {
    webSocketClient.sendRequest('USER_ACTIVE', null);
    webSocketClient.sendRequest('USER_INACTIVE', null);
  }
}

export default MainView;
