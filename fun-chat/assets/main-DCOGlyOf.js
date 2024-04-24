var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
class Router {
  static navigateTo(route) {
    window.location.hash = route;
  }
}
class Validator {
  static validateLength(value, minLength = 4) {
    return value.length >= minLength;
  }
  static validateCharacters(value) {
    return /^[A-Za-z]+$/.test(value);
  }
  static validateUppercase(value) {
    return /[A-Z]/.test(value);
  }
  static validateInput(input) {
    const { value, parentNode } = input;
    if (!parentNode) {
      return;
    }
    const errors = [];
    if (!this.validateLength(value)) {
      errors.push("Must be at least 4 characters long.");
    }
    if (!this.validateCharacters(value)) {
      errors.push("Only English letters allowed.");
    }
    if (!this.validateUppercase(value)) {
      errors.push("Must contain at least one uppercase letter.");
    }
    const oldSpans = parentNode.querySelectorAll("span.error-message");
    oldSpans.forEach((span) => span.remove());
    errors.forEach((error) => {
      const span = document.createElement("span");
      span.textContent = error;
      span.className = "error-message";
      parentNode.appendChild(span);
    });
  }
}
class WebSocketClient {
  constructor(url) {
    __publicField(this, "socket", null);
    __publicField(this, "url");
    // идентификатор для отслеживания отдельных запросов, увеличивается с каждым новым запросом.
    __publicField(this, "requestId", 0);
    // массив функций-обработчиков сообщений, которые вызываются при получении сообщения.
    // может потребоваться выполнить несколько различных действий при получении одного! сообщения
    __publicField(this, "messageHandlers", []);
    this.url = url;
  }
  // Создаёт новый объект WebSocket и устанавливает обработчики событий: onopen, onmessage, onerror, и onclose
  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onmessage = (event) => {
      console.log("Message received: ", event.data);
      this.handleMessage(event);
    };
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
  }
  // eslint-disable-next-line class-methods-use-this
  handleOpen() {
    console.log("WebSocket connection established.");
  }
  handleMessage(event) {
    this.messageHandlers.forEach((handler) => handler(event));
  }
  // eslint-disable-next-line class-methods-use-this
  handleError(event) {
    console.error("WebSocket error: ", event);
  }
  handleClose(event) {
    console.log("WebSocket connection closed: ", event.reason);
    this.socket = null;
    this.reconnect();
  }
  reconnect() {
    console.log("Attempting to reconnect...");
    setTimeout(() => this.connect(), 5e3);
  }
  // Регистрация нового обработчика сообщений
  onMessage(handler) {
    this.messageHandlers.push(handler);
  }
  // Генерация уникального ID для запроса
  generateRequestId() {
    this.requestId++;
    return this.requestId.toString();
  }
  // Метод для отправки структурированных запросов
  sendRequest(type, payload) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected.");
      return;
    }
    const request = {
      id: this.generateRequestId(),
      // Генерация ID для запроса
      type,
      payload
    };
    this.socket.send(JSON.stringify(request));
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
const webSocketClient = new WebSocketClient("ws://127.0.0.1:4000");
webSocketClient.connect();
class ModalShowUserAuth {
  // eslint-disable-next-line class-methods-use-this
  showModal(errorMessage) {
    let modal = document.querySelector(".modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.classList.add("modal");
      const modalBody = document.createElement("div");
      modalBody.classList.add("modal__body");
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal__content");
      modalContent.textContent = errorMessage;
      modalBody.appendChild(modalContent);
      modal.appendChild(modalBody);
      document.body.appendChild(modal);
      modal.addEventListener("click", () => {
        modal.classList.remove("popup-open");
      });
    } else {
      const modalContent = modal.querySelector(
        ".modal__content"
      );
      modalContent.textContent = errorMessage;
    }
    setTimeout(() => {
      modal.classList.add("popup-open");
    }, 10);
  }
  // eslint-disable-next-line class-methods-use-this
  hideModal() {
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("popup-open");
    }
  }
}
class UserService {
  constructor() {
    __publicField(this, "isLogined", false);
  }
}
const userService = new UserService();
class AccessView {
  constructor() {
    __publicField(this, "form");
    __publicField(this, "container");
    __publicField(this, "submitButton");
    this.container = document.createElement("div");
    this.container.classList.add("access-container");
    document.body.appendChild(this.container);
    this.form = this.createForm();
    this.container.appendChild(this.form);
    this.submitButton.disabled = true;
    const modalShowUserAuth = new ModalShowUserAuth();
    webSocketClient.onMessage((event) => {
      const serverMessage = JSON.parse(event.data);
      if (serverMessage.type === "USER_LOGIN") {
        Router.navigateTo("main");
        userService.isLogined = true;
      } else if (serverMessage.type === "ERROR") {
        modalShowUserAuth.showModal(serverMessage.payload.error);
      }
    });
  }
  createForm() {
    const form = document.createElement("form");
    const usernameInput = this.createInputElement("Enter your name", "text");
    const passwordInput = this.createInputElement("Enter password", "password");
    this.submitButton = this.createButtonElement(
      "Login",
      "submit",
      "submit-button"
    );
    const infoButton = this.createButtonElement(
      "Info",
      "button",
      "info-button"
    );
    form.appendChild(usernameInput);
    form.appendChild(passwordInput);
    form.appendChild(this.submitButton);
    form.appendChild(infoButton);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmission(usernameInput, passwordInput);
    });
    return form;
  }
  // eslint-disable-next-line class-methods-use-this
  handleFormSubmission(...inputs) {
    const allValid = inputs.every((input) => {
      Validator.validateInput(input);
      if (input.parentNode) {
        const errorSpanExists = input.parentNode.querySelector("span.error-message");
        return !errorSpanExists;
      }
      return false;
    });
    if (allValid) {
      const loginDataAG = {
        user: {
          login: inputs[0].value,
          password: inputs[1].value
        }
      };
      sessionStorage.setItem("loginDataAG", JSON.stringify(loginDataAG.user));
      webSocketClient.sendRequest("USER_LOGIN", loginDataAG);
    } else {
      this.submitButton.disabled = true;
    }
  }
  // eslint-disable-next-line class-methods-use-this
  createInputElement(placeholder, type) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.className = "form-input";
    input.dataset.validated = "false";
    input.addEventListener("input", () => {
      Validator.validateInput(input);
      if (input.parentNode && !input.parentNode.querySelector("span.error-message")) {
        input.dataset.validated = "true";
      } else {
        input.dataset.validated = "false";
      }
      this.checkFormValidity();
    });
    return input;
  }
  checkFormValidity() {
    const inputs = this.form.querySelectorAll("input.form-input");
    const allValid = Array.from(inputs).every((input) => {
      return input.dataset.validated === "true";
    });
    this.submitButton.disabled = !allValid;
  }
  // eslint-disable-next-line class-methods-use-this
  createButtonElement(text, type, className) {
    const button = document.createElement("button");
    button.textContent = text;
    button.type = type;
    button.className = className;
    if (text === "Info") {
      button.addEventListener("click", () => Router.navigateTo("about"));
    }
    return button;
  }
}
class AboutView {
  constructor() {
    __publicField(this, "container");
    this.container = document.createElement("div");
    this.container.classList.add("about-container");
    document.body.appendChild(this.container);
    this.initializeContent();
  }
  initializeContent() {
    const aboutShadow = document.createElement("div");
    aboutShadow.classList.add("shadow-about");
    this.container.appendChild(aboutShadow);
    const title = document.createElement("h1");
    title.textContent = "Fun Chat";
    title.classList.add("title-about");
    aboutShadow.appendChild(title);
    const description = document.createElement("p");
    description.textContent = "The application is designed to demonstrate the Fun Chat assignment in the RSSchool JS/FE 2023Q3 course. Users and messages are deleted once a day.";
    description.classList.add("text-about");
    aboutShadow.appendChild(description);
    const authorLink = document.createElement("a");
    authorLink.textContent = "Anna Golosova";
    authorLink.href = "https://github.com/Golosova76";
    authorLink.target = "_blank";
    authorLink.classList.add("link-about");
    aboutShadow.appendChild(authorLink);
    const backButton = document.createElement("button");
    backButton.textContent = "Go home";
    backButton.classList.add("button-about");
    backButton.addEventListener("click", () => Router.navigateTo("access"));
    aboutShadow.appendChild(backButton);
  }
}
class ModalShowUserLogout {
  // eslint-disable-next-line class-methods-use-this
  showModalErrorLogout(errorMessage) {
    let modal = document.querySelector(".modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.classList.add("modal");
      const modalBody = document.createElement("div");
      modalBody.classList.add("modal__body");
      const modalContent = document.createElement("div");
      modalContent.classList.add("modal__content");
      modalContent.textContent = errorMessage;
      modalBody.appendChild(modalContent);
      modal.appendChild(modalBody);
      document.body.appendChild(modal);
      modal.addEventListener("click", () => {
        modal.classList.remove("popup-open");
      });
    } else {
      const modalContent = modal.querySelector(
        ".modal__content"
      );
      modalContent.textContent = errorMessage;
    }
    setTimeout(() => {
      modal.classList.add("popup-open");
    }, 10);
  }
  // eslint-disable-next-line class-methods-use-this
  hideModal() {
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.classList.remove("popup-open");
    }
  }
}
class MessageUsers {
  constructor() {
    __publicField(this, "container");
    __publicField(this, "messageText");
    __publicField(this, "messageDate");
    __publicField(this, "statusSpan");
    this.container = this.createMessageStructure();
  }
  // eslint-disable-next-line class-methods-use-this
  createMessageStructure() {
    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "user-message-container";
    const messageContainer = document.createElement("div");
    messageContainer.className = "message-container";
    const messageControls = document.createElement("div");
    messageControls.className = "message-controls";
    const youUser = document.createElement("span");
    youUser.className = "you-user";
    this.messageDate = document.createElement("span");
    this.messageDate.className = "message-date";
    messageControls.appendChild(youUser);
    messageControls.appendChild(this.messageDate);
    this.messageText = document.createElement("div");
    this.messageText.className = "message-text";
    const messageStatus = document.createElement("div");
    messageStatus.className = "message-status";
    this.statusSpan = document.createElement("span");
    this.statusSpan.className = "status";
    messageStatus.appendChild(this.statusSpan);
    messageContainer.appendChild(messageControls);
    messageContainer.appendChild(this.messageText);
    messageContainer.appendChild(messageStatus);
    userMessageContainer.appendChild(messageContainer);
    return userMessageContainer;
  }
  setMessageText(text) {
    this.messageText.textContent = text;
  }
  setMessageDate(date) {
    this.messageDate.textContent = date;
  }
  setMessageStatus(status) {
    this.statusSpan.textContent = status;
  }
  appendToParent(parentElement) {
    parentElement.appendChild(this.container);
  }
}
class MainView {
  constructor() {
    __publicField(this, "container");
    __publicField(this, "userList");
    __publicField(this, "dialogUserDiv");
    __publicField(this, "dialogContentDiv");
    __publicField(this, "userElements", {});
    __publicField(this, "currentActiveUserName", null);
    this.container = document.createElement("div");
    this.container.classList.add("main-container");
    document.body.appendChild(this.container);
    this.initializeContent();
    this.fetchUsers();
    const modalShowUserLogout = new ModalShowUserLogout();
    webSocketClient.onMessage((event) => {
      const serverMessage = JSON.parse(event.data);
      if (serverMessage.type === "USER_LOGOUT") {
        Router.navigateTo("access");
        sessionStorage.clear();
        userService.isLogined = false;
      } else if (serverMessage.type === "ERROR") {
        modalShowUserLogout.showModalErrorLogout(serverMessage.payload.error);
      } else if (serverMessage.type === "USER_ACTIVE") {
        this.updateUserList(serverMessage.payload.users);
      } else if (serverMessage.type === "USER_INACTIVE")
        ;
      else if (serverMessage.type === "USER_EXTERNAL_LOGIN") {
        this.updateUserYU(serverMessage.payload.user.login, true);
      } else if (serverMessage.type === "USER_EXTERNAL_LOGOUT") {
        const logoutUserLogin = serverMessage.payload.user.login;
        this.removeUser(logoutUserLogin);
      } else if (serverMessage.type === "MSG_SEND") {
        const messageData = serverMessage.payload.message;
        this.displayMessage(messageData);
      }
    });
  }
  // Функция для отображения сообщения в DOM
  // eslint-disable-next-line class-methods-use-this
  displayMessage(messageData) {
    const newMessage = new MessageUsers();
    console.log(messageData.text);
    newMessage.setMessageText(messageData.text);
    newMessage.setMessageDate(new Date(messageData.datetime).toLocaleString());
    let statusText = "Pending";
    if (messageData.status.isDelivered) {
      statusText = "Delivered";
    }
    if (messageData.status.isReaded) {
      statusText = "Read";
    }
    newMessage.setMessageStatus(statusText);
    newMessage.appendToParent(this.dialogContentDiv);
  }
  initializeContent() {
    const mainShadow = document.createElement("main");
    mainShadow.classList.add("main-shadow");
    this.container.appendChild(mainShadow);
    this.createHeader(mainShadow);
    this.createBody(mainShadow);
    this.createFooter(mainShadow);
  }
  // eslint-disable-next-line class-methods-use-this
  updateUserYU(login, status) {
    const changeUserElement = Object.values(this.userElements).find((elem) => {
      return elem.innerText === login;
    });
    if (status) {
      if (changeUserElement) {
        const statusIndicator = changeUserElement.querySelector(
          ".status-indicator"
        );
        statusIndicator.style.backgroundColor = "green";
      } else {
        this.handleUserElement(login, status);
      }
    }
  }
  // eslint-disable-next-line class-methods-use-this
  createHeader(parent) {
    const section = document.createElement("section");
    section.className = "main-header";
    const userDiv = document.createElement("div");
    userDiv.className = "main-user";
    const userText = document.createElement("span");
    userText.className = "user-text";
    userText.textContent = "User: ";
    const userTitle = document.createElement("span");
    userTitle.className = "user-title";
    const sessionUser = sessionStorage.getItem("loginDataAG");
    if (sessionUser) {
      const userData = JSON.parse(sessionUser);
      userTitle.textContent = userData.login;
    } else {
      userTitle.textContent = "No user name";
    }
    userDiv.appendChild(userText);
    userDiv.appendChild(userTitle);
    const title = document.createElement("h1");
    title.className = "main-title";
    title.textContent = "Fun Chat";
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "main-button";
    const infoButton = document.createElement("button");
    infoButton.className = "main-info button";
    infoButton.textContent = "Info";
    if (infoButton.textContent === "Info") {
      infoButton.addEventListener("click", () => Router.navigateTo("about"));
    }
    const logoutButton = document.createElement("button");
    logoutButton.className = "main-logout button";
    logoutButton.textContent = "Logout";
    logoutButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (sessionUser) {
        const userData = JSON.parse(sessionUser);
        const loginDataAG = {
          user: {
            login: userData.login,
            password: userData.password
          }
        };
        webSocketClient.sendRequest("USER_LOGOUT", loginDataAG);
      }
    });
    buttonDiv.appendChild(infoButton);
    buttonDiv.appendChild(logoutButton);
    section.appendChild(userDiv);
    section.appendChild(title);
    section.appendChild(buttonDiv);
    parent.appendChild(section);
  }
  // eslint-disable-next-line class-methods-use-this
  createBody(parent) {
    const section = document.createElement("section");
    section.className = "main-body";
    const asideLeft = document.createElement("aside");
    asideLeft.className = "main-left";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "main-search";
    searchInput.placeholder = "Search...";
    this.userList = document.createElement("ul");
    this.userList.className = "main-users";
    this.userList.addEventListener("click", (event) => {
      var _a;
      const target = event.target;
      if (target.tagName === "SPAN" || target.tagName === "LI") {
        const userLi = target.closest("li");
        if (userLi) {
          const username = (_a = userLi.textContent) == null ? void 0 : _a.trim();
          const statusIndicator = userLi.querySelector(
            ".status-indicator"
          );
          const isActive = (statusIndicator == null ? void 0 : statusIndicator.style.backgroundColor) === "green";
          if (username) {
            this.currentActiveUserName = username;
          }
          this.updateUserDialog(username, isActive);
        }
      }
    });
    asideLeft.appendChild(searchInput);
    asideLeft.appendChild(this.userList);
    const articleRight = document.createElement("article");
    articleRight.className = "main-right";
    this.dialogUserDiv = document.createElement("div");
    this.dialogUserDiv.className = "main-dialog-user";
    this.dialogContentDiv = document.createElement("div");
    this.dialogContentDiv.className = "main-dialog-content";
    const messageSpan = document.createElement("span");
    messageSpan.className = "info-message";
    messageSpan.textContent = "Select the user to send the message to...";
    const hiddenMessageSpan = document.createElement("span");
    hiddenMessageSpan.className = "info-message";
    hiddenMessageSpan.textContent = "Write your first post...";
    hiddenMessageSpan.hidden = true;
    this.dialogContentDiv.appendChild(messageSpan);
    this.dialogContentDiv.appendChild(hiddenMessageSpan);
    const dialogInputDiv = document.createElement("div");
    dialogInputDiv.className = "main-dialog-input";
    const messageInput = document.createElement("input");
    messageInput.type = "text";
    messageInput.className = "main-message";
    messageInput.placeholder = "Message...";
    const sendButton = document.createElement("button");
    sendButton.className = "main-message-input button";
    sendButton.textContent = "Send";
    sendButton.disabled = true;
    messageInput.addEventListener("input", () => {
      sendButton.disabled = !messageInput.value.trim();
    });
    sendButton.addEventListener("click", () => {
      const messageText = messageInput.value;
      const messagePayload = {
        message: {
          to: this.currentActiveUserName,
          text: messageText
        }
      };
      webSocketClient.sendRequest("MSG_SEND", messagePayload);
      messageInput.value = "";
    });
    dialogInputDiv.appendChild(messageInput);
    dialogInputDiv.appendChild(sendButton);
    articleRight.appendChild(this.dialogUserDiv);
    articleRight.appendChild(this.dialogContentDiv);
    articleRight.appendChild(dialogInputDiv);
    section.appendChild(asideLeft);
    section.appendChild(articleRight);
    parent.appendChild(section);
  }
  // eslint-disable-next-line class-methods-use-this
  createFooter(parent) {
    const section = document.createElement("section");
    section.className = "main-footer";
    const linkSchool = document.createElement("a");
    linkSchool.href = "https://rs.school/";
    linkSchool.className = "main-link-school";
    linkSchool.target = "_blank";
    linkSchool.textContent = "RSSchool";
    const linkGit = document.createElement("a");
    linkGit.href = "https://github.com/Golosova76";
    linkGit.className = "main-link-git";
    linkGit.target = "_blank";
    linkGit.textContent = "Anna Golosova";
    const spanYear = document.createElement("span");
    spanYear.className = "main-year";
    spanYear.textContent = "2024";
    section.appendChild(linkSchool);
    section.appendChild(linkGit);
    section.appendChild(spanYear);
    parent.appendChild(section);
  }
  // добавление спанов с логином и в сети в контейнер
  updateUserDialog(username, isActive) {
    this.dialogUserDiv.innerHTML = "";
    const usernameSpan = document.createElement("span");
    usernameSpan.textContent = username ?? "Неизвестный пользователь";
    const statusSpanUser = document.createElement("span");
    statusSpanUser.textContent = isActive ? "в сети" : "не в сети";
    statusSpanUser.style.color = isActive ? "green" : "red";
    this.dialogUserDiv.appendChild(usernameSpan);
    this.dialogUserDiv.appendChild(statusSpanUser);
  }
  updateUserList(users) {
    const sessionUser = sessionStorage.getItem("loginDataAG");
    if (sessionUser === null) {
      return;
    }
    const userData = JSON.parse(sessionUser);
    const currentUserLogin = userData.login;
    users.forEach((user) => {
      if (user.login !== currentUserLogin) {
        this.handleUserElement(user.login, user.isLogined);
      }
    });
    Object.keys(this.userElements).forEach((login) => {
      if (!users.some((user) => user.login === login)) {
        this.userList.removeChild(this.userElements[login]);
        delete this.userElements[login];
      }
    });
  }
  handleUserElement(login, isActive) {
    let userElement = this.userElements[login];
    if (!userElement) {
      userElement = document.createElement("li");
      const statusIndicator2 = document.createElement("span");
      statusIndicator2.className = "status-indicator";
      userElement.appendChild(statusIndicator2);
      userElement.appendChild(document.createTextNode(login));
      this.userList.appendChild(userElement);
      this.userElements[login] = userElement;
    }
    const statusIndicator = userElement.querySelector(
      ".status-indicator"
    );
    statusIndicator.style.backgroundColor = isActive ? "green" : "black";
  }
  removeUser(login) {
    if (this.userElements[login]) {
      this.userList.removeChild(this.userElements[login]);
      delete this.userElements[login];
    }
  }
  // eslint-disable-next-line class-methods-use-this
  fetchUsers() {
    webSocketClient.sendRequest("USER_ACTIVE", null);
    webSocketClient.sendRequest("USER_INACTIVE", null);
  }
}
class App {
  constructor() {
    __publicField(this, "currentView", null);
    __publicField(this, "route", () => {
      const sessionUser = sessionStorage.getItem("loginDataAG");
      if (this.currentView) {
        document.body.removeChild(this.currentView.container);
        this.currentView = null;
      }
      if (!sessionUser) {
        if (window.location.hash !== "#access") {
          window.location.hash = "#access";
        }
      } else if (!userService.isLogined) {
        const userData = JSON.parse(sessionUser ?? "");
        const loginDataAG = {
          user: {
            login: userData.login,
            password: userData.password
          }
        };
        webSocketClient.sendRequest("USER_LOGIN", loginDataAG);
      }
      switch (window.location.hash) {
        case "#main":
          this.currentView = new MainView();
          this.currentView.fetchUsers();
          break;
        case "#about":
          this.currentView = new AboutView();
          break;
        case "#access":
        default:
          this.currentView = new AccessView();
          break;
      }
    });
    window.addEventListener("hashchange", this.route);
    window.addEventListener("load", this.route);
  }
  start() {
    this.route();
  }
}
const app = new App();
app.start();
