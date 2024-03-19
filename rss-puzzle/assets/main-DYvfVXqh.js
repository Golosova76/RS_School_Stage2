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
class Component {
  constructor({ tag = "div", className = "", text = "", type }, ...children) {
    __publicField(this, "children");
    __publicField(this, "node");
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    if (type && tag.toLowerCase() === "input") {
      node.type = type;
    }
    this.node = node;
    this.children = [];
    if (children.length > 0) {
      this.appendChildren(children);
    }
  }
  append(child) {
    this.children.push(child);
    if (child.getNode) {
      this.node.append(child.getNode());
    }
  }
  appendChildren(children) {
    children.forEach((el) => {
      this.append(el);
    });
  }
  getNode() {
    return this.node;
  }
  getChildren() {
    return this.children;
  }
  setTextContent(content) {
    this.node.textContent = content;
  }
  getTextContent() {
    return this.node.textContent || "";
  }
  setAttribute(attribute, value) {
    this.node.setAttribute(attribute, value);
  }
  removeAttribute(attribute) {
    this.node.removeAttribute(attribute);
  }
  toggleClass(className) {
    this.node.classList.toggle(className);
  }
  addListener(event, listener, options = false) {
    this.node.addEventListener(event, listener, options);
  }
  removeListener(event, listener, options = false) {
    this.node.removeEventListener(event, listener, options);
  }
  destroyChildren() {
    this.children.forEach((child) => {
      var _a;
      (_a = child.destroy) == null ? void 0 : _a.call(child);
    });
    this.children.length = 0;
  }
  destroy() {
    this.destroyChildren();
    this.node.remove();
  }
}
class HeaderComponent extends Component {
  constructor() {
    super({ tag: "header", className: "header" });
    this.init();
  }
  init() {
    const headerContainer = new Component({
      tag: "div",
      className: "header__container"
    });
    const headerTitle = new Component({
      tag: "h1",
      className: "header__title",
      text: "English Puzzle"
    });
    headerContainer.append(headerTitle);
    this.append(headerContainer);
  }
}
class MainComponent extends Component {
  constructor() {
    super({ tag: "main", className: "main" });
    __publicField(this, "mainContainer");
    this.mainContainer = new Component({
      tag: "div",
      className: "main__container"
    });
    this.append(this.mainContainer);
  }
  // Метод для добавления компонентов в main__container
  appendToContainer(child) {
    this.mainContainer.getNode().prepend(child);
  }
}
class FooterComponent extends Component {
  constructor() {
    super({ tag: "footer", className: "footer" });
    this.init();
  }
  init() {
    const listContainer = new Component({
      tag: "ul",
      className: "footer__items"
    });
    const listItemYear = new Component({
      tag: "li",
      className: "footer__item",
      text: "2024"
    });
    listContainer.append(listItemYear);
    const listItemLink = new Component({
      tag: "li",
      className: "footer__item"
    });
    const link = new Component({
      tag: "a",
      className: "footer__link",
      text: "GitHub"
    });
    link.setAttribute("target", "_blank");
    link.setAttribute("href", "https://github.com/Golosova76");
    listItemLink.append(link);
    listContainer.append(listItemLink);
    this.append(listContainer);
  }
}
class FormComponent extends Component {
  constructor() {
    super({ tag: "form", className: "form" });
    this.createFormComponents();
  }
  // Метод для создания и добавления элементов формы
  createFormComponents() {
    const fieldSet = new Component({
      tag: "fieldset",
      className: "fieldset"
    });
    this.append(fieldSet);
    const legend = new Component({
      tag: "legend",
      text: "required",
      className: "legend"
    });
    fieldSet.append(legend);
    const nameLabel = new Component({
      tag: "label",
      text: "Name",
      className: "required"
    });
    nameLabel.setAttribute("for", "label-name");
    fieldSet.append(nameLabel);
    const nameInput = new Component({
      tag: "input",
      className: "input-name",
      type: "text"
    });
    nameInput.setAttribute("id", "label-name");
    nameInput.setAttribute("name", "label-name");
    nameInput.setAttribute("aria-required", "true");
    nameInput.setAttribute("required", "");
    fieldSet.append(nameInput);
    const surnameLabel = new Component({
      tag: "label",
      text: "Surname",
      className: "required"
    });
    surnameLabel.setAttribute("for", "label-surname");
    fieldSet.append(surnameLabel);
    const surnameInput = new Component({
      tag: "input",
      className: "input-name",
      type: "text"
    });
    surnameInput.setAttribute("id", "label-surname");
    surnameInput.setAttribute("name", "label-surname");
    surnameInput.setAttribute("aria-required", "true");
    surnameInput.setAttribute("required", "");
    fieldSet.append(surnameInput);
  }
  appendToFormDirectly(child) {
    this.append(child);
  }
}
class ButtonComponent extends Component {
  constructor(options) {
    super({
      tag: "button",
      className: options.className || "",
      text: options.text || ""
    });
    this.getNode().addEventListener("click", () => {
      var _a;
      return (_a = options.onClick) == null ? void 0 : _a.call(options);
    });
    if (options.type) {
      this.setAttribute("type", options.type);
    }
    if (options.id) {
      this.setAttribute("id", options.id);
    }
    if (options.disabled) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }
  }
}
class FormErrorManager {
  constructor(formComponent) {
    __publicField(this, "formComponent");
    this.formComponent = formComponent;
  }
  showError(inputName, message) {
    var _a;
    const formNode = this.formComponent.getNode();
    const inputElement = formNode.querySelector(
      `[name="${inputName}"]`
    );
    if (!inputElement)
      return;
    let errorElement = inputElement.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      (_a = inputElement.parentNode) == null ? void 0 : _a.insertBefore(
        errorElement,
        inputElement.nextSibling
      );
      inputElement.style.borderColor = "red";
    }
    errorElement.textContent = message;
  }
  clearError(inputName) {
    var _a;
    const formNode = this.formComponent.getNode();
    const inputElement = formNode.querySelector(
      `[name="${inputName}"]`
    );
    if (!inputElement)
      return;
    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
      (_a = inputElement.parentNode) == null ? void 0 : _a.removeChild(errorElement);
    }
    inputElement.style.borderColor = "";
  }
}
class FormValidator {
  // Проверка на допустимые символы (английский алфавит и дефис)
  static isValidCharacters(value) {
    const regex = /^[A-Za-z-]+$/;
    return regex.test(value);
  }
  // Проверка на заглавную первую букву
  static isInitialCapitalized(value) {
    const regex = /^[A-Z]/;
    return regex.test(value);
  }
  // Проверка минимальной длины для имени
  static isNameLengthValid(name) {
    return name.length >= 3;
  }
  // Проверка минимальной длины для фамилии
  static isSurnameLengthValid(surname) {
    return surname.length >= 4;
  }
}
class FormFieldValidator {
  static validateName(name) {
    if (!FormValidator.isValidCharacters(name)) {
      return "Name must contain only English alphabet letters and hyphen (-).";
    }
    if (!FormValidator.isInitialCapitalized(name)) {
      return "Name must start with a capital letter.";
    }
    if (!FormValidator.isNameLengthValid(name)) {
      return "Name must be at least 3 characters long.";
    }
    return null;
  }
  static validateSurname(surname) {
    if (!FormValidator.isValidCharacters(surname)) {
      return "Surname must contain only English alphabet letters and hyphen (-).";
    }
    if (!FormValidator.isInitialCapitalized(surname)) {
      return "Surname must start with a capital letter.";
    }
    if (!FormValidator.isSurnameLengthValid(surname)) {
      return "Surname must be at least 4 characters long.";
    }
    return null;
  }
}
class FormSubmitHandler {
  constructor(errorManager, onValidSubmit, form, submitButton, gameUser) {
    __publicField(this, "errorManager");
    __publicField(this, "onValidSubmit");
    __publicField(this, "form");
    __publicField(this, "submitButton");
    __publicField(this, "gameUser");
    this.errorManager = errorManager;
    this.onValidSubmit = onValidSubmit;
    this.form = form;
    this.submitButton = submitButton;
    this.gameUser = gameUser;
    this.setupInputValidationListeners();
  }
  validateFormData(changedFieldName = null) {
    const formData = new FormData(this.form.getNode());
    const name = formData.get("label-name");
    const surname = formData.get("label-surname");
    let isValid = true;
    if (changedFieldName === "label-name" || changedFieldName === null) {
      const nameError = FormFieldValidator.validateName(name);
      if (nameError) {
        isValid = false;
        this.errorManager.showError("label-name", nameError);
      } else {
        this.errorManager.clearError("label-name");
      }
    }
    if (changedFieldName === "label-surname" || changedFieldName === null) {
      const surnameError = FormFieldValidator.validateSurname(surname);
      if (surnameError) {
        isValid = false;
        this.errorManager.showError("label-surname", surnameError);
      } else {
        this.errorManager.clearError("label-surname");
      }
    }
    return isValid;
  }
  setupInputValidationListeners() {
    const inputs = this.form.getNode().querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const changedFieldName = input.getAttribute("name");
        const isFormValid = this.validateFormData(changedFieldName);
        if (isFormValid) {
          this.submitButton.removeAttribute("disabled");
        } else {
          this.submitButton.setAttribute("disabled", "");
        }
      });
    });
  }
  handle(event) {
    event.preventDefault();
    if (this.validateFormData()) {
      const formData = new FormData(this.form.getNode());
      const name = formData.get("label-name");
      const surname = formData.get("label-surname");
      this.gameUser.gameName = name;
      this.gameUser.gameSurname = surname;
      this.gameUser.saveToLocalStorage();
      this.onValidSubmit();
    }
  }
}
class User {
  constructor() {
    __publicField(this, "gameName");
    __publicField(this, "gameSurname");
    this.gameName = null;
    this.gameSurname = null;
  }
}
class EventEmitter {
  constructor() {
    __publicField(this, "events", {});
  }
  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((fn) => {
        fn(...args);
      });
    }
  }
}
const EventEmitter$1 = new EventEmitter();
class GameUser extends User {
  constructor() {
    super();
    this.loadFromLocalStorage();
    EventEmitter$1.on("logout", this.clearUserData.bind(this));
  }
  loadFromLocalStorage() {
    const data = localStorage.getItem("gameUser");
    if (data) {
      const userData = JSON.parse(data);
      this.gameName = userData.name;
      this.gameSurname = userData.surname;
    }
  }
  saveToLocalStorage() {
    const data = {
      name: this.gameName,
      surname: this.gameSurname
    };
    localStorage.setItem("gameUser", JSON.stringify(data));
  }
  clearUserData() {
    localStorage.removeItem("gameUser");
    this.gameName = null;
    this.gameSurname = null;
  }
}
class AccessScreen {
  constructor(onLoginSuccess) {
    __publicField(this, "onLoginSuccess");
    this.onLoginSuccess = onLoginSuccess;
  }
  render() {
    const submitButton = new ButtonComponent({
      className: "login-button",
      text: "Login",
      type: "submit",
      disabled: true
    });
    const form = new FormComponent();
    form.appendToFormDirectly(submitButton);
    const errorManager = new FormErrorManager(form);
    const gameUser = new GameUser();
    const formSubmitHandler = new FormSubmitHandler(
      errorManager,
      this.onLoginSuccess,
      form,
      submitButton,
      gameUser
    );
    const formElement = form.getNode();
    formElement.addEventListener("submit", (event) => {
      formSubmitHandler.handle(event);
    });
    return formElement;
  }
}
class ArticleWelcomeComponent extends Component {
  constructor() {
    super({ tag: "article", className: "article-welcome" });
    __publicField(this, "spanGreeting");
    this.spanGreeting = this.createArticleWComponents();
  }
  createArticleWComponents() {
    const divDescription = new Component({
      tag: "div",
      className: "article-welcome__text"
      // text: '2024',
    });
    const paraghOne = new Component({
      tag: "p",
      // className: 'article-welcome__text',
      text: "Embark on an enlightening journey with RSS Puzzle, a unique mini-game that combines language learning with art history to enhance your English mastery in an engaging way."
    });
    const paraghTwo = new Component({
      tag: "p",
      // className: 'article-welcome__text',
      text: "In this interactive experience, players piece together sentences from word puzzles, revealing stunning artworks by renowned painters with each level completed."
    });
    divDescription.append(paraghOne);
    divDescription.append(paraghTwo);
    const divGreetingContainer = new Component({
      tag: "div",
      className: "article-welcome__greeting"
      // text: '2024',
    });
    const spanGreeting = new Component({
      tag: "span",
      className: "article-welcome__span"
      // text: '',
    });
    divGreetingContainer.append(spanGreeting);
    this.append(divDescription);
    this.append(divGreetingContainer);
    return spanGreeting;
  }
  setUserGreeting(name, surname) {
    const greetingText = `Welcome to the game, ${name || "Гость"} ${surname || ""}!`;
    this.spanGreeting.setTextContent(greetingText);
    this.spanGreeting.getNode().classList.add("zoom-in");
  }
  appendToArticleWDirectly(child) {
    this.append(child);
  }
}
class WelcomeScreen {
  constructor(onLoginSuccess) {
    __publicField(this, "onLoginSuccess");
    this.onLoginSuccess = onLoginSuccess;
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    const startButton = new ButtonComponent({
      className: "start-button",
      text: "Start",
      type: "submit"
    });
    const articleWelcome = new ArticleWelcomeComponent();
    articleWelcome.appendToArticleWDirectly(startButton);
    const articleWelcomeElement = articleWelcome.getNode();
    const gameUser = new GameUser();
    const name = gameUser.gameName ?? "";
    const surname = gameUser.gameSurname ?? "";
    articleWelcome.setUserGreeting(name, surname);
    startButton.addListener("click", (event) => {
      event.preventDefault();
      this.onLoginSuccess();
      document.body.classList.remove("welcome-body");
    });
    return articleWelcomeElement;
  }
}
const _DynamicSizeManager = class _DynamicSizeManager {
  // Ширина контейнера в пикселях
  static calculateCardWidth(word, totalWords) {
    const baseWidthPerChar = 12;
    const outlineWidth = 2;
    const margin = 4;
    const totalMargins = margin * (totalWords - 1);
    const baseCardWidth = baseWidthPerChar * word.length + outlineWidth * 2;
    const totalBaseWidth = baseCardWidth * totalWords;
    const availableSpace = _DynamicSizeManager.containerWidth - totalBaseWidth - totalMargins;
    let cardWidth = baseCardWidth + availableSpace / totalWords;
    const minWidth = baseWidthPerChar * word.length + outlineWidth * 2;
    cardWidth = Math.max(cardWidth, minWidth);
    cardWidth = Math.floor(cardWidth);
    return `${cardWidth}px`;
  }
  static calculateFontSize(word) {
    const baseSize = 20;
    const maxLength = 10;
    const wordLength = word.length;
    if (wordLength > maxLength) {
      return `${Math.max(baseSize - (wordLength - maxLength), 16)}px`;
    }
    return `${baseSize}px`;
  }
  static applyStyles(node, word, totalWords) {
    const cardWidth = _DynamicSizeManager.calculateCardWidth(word, totalWords);
    const fontSize = _DynamicSizeManager.calculateFontSize(word);
    const newStyles = {
      width: cardWidth,
      height: "44px",
      fontSize,
      margin: "0 4px",
      textAlign: "center"
    };
    Object.assign(node.style, newStyles);
  }
};
__publicField(_DynamicSizeManager, "containerWidth", 924);
let DynamicSizeManager = _DynamicSizeManager;
class GameBlockButtons extends Component {
  constructor() {
    super({ tag: "div", className: "game__buttons" });
    __publicField(this, "gameButtonContinue", null);
    __publicField(this, "gameButtonCheck", null);
    __publicField(this, "gameButtonAuto", null);
    __publicField(this, "gameButtonLogout", null);
    this.createGameBlockButtonsComponents();
  }
  createGameBlockButtonsComponents() {
    const gameButtonAuto = new ButtonComponent({
      className: "auto-button button",
      text: "Auto-Complete",
      type: "button"
    });
    this.append(gameButtonAuto);
    this.gameButtonAuto = gameButtonAuto;
    const gameButtonContinue = new ButtonComponent({
      className: "continue-button button",
      text: "Continue",
      type: "button",
      disabled: true
    });
    this.append(gameButtonContinue);
    this.gameButtonContinue = gameButtonContinue;
    const gameButtonCheck = new ButtonComponent({
      className: "check-button button",
      text: "Check",
      type: "button",
      disabled: true
    });
    this.append(gameButtonCheck);
    this.gameButtonCheck = gameButtonCheck;
    const gameButtonLogout = new ButtonComponent({
      className: "logout-button button",
      text: "Logout",
      type: "button",
      onClick: () => {
        EventEmitter$1.emit("logout");
      }
    });
    this.append(gameButtonLogout);
    this.gameButtonLogout = gameButtonLogout;
  }
  getGameButtonContinue() {
    return this.gameButtonContinue;
  }
  getGameButtonCheck() {
    return this.gameButtonCheck;
  }
  getGameButtonAuto() {
    return this.gameButtonAuto;
  }
  getGameButtonLogout() {
    return this.gameButtonLogout;
  }
}
class GameBlockPuzzles extends Component {
  constructor() {
    super({ tag: "div", className: "game__block" });
    __publicField(this, "gamePuzzles");
    __publicField(this, "gameBlockButtons");
    __publicField(this, "gameWords");
    this.gameWords = [];
    this.createGameBlockComponents();
    this.getGameButtonContinue();
  }
  createGameBlockComponents() {
    const gameResults = new Component({
      tag: "div",
      className: "game__results"
    });
    this.append(gameResults);
    for (let i = 1; i <= 10; i += 1) {
      const gameResult = new Component({
        tag: "div",
        className: "game__result"
      });
      gameResults.append(gameResult);
      const gameSpanNumber = new Component({
        tag: "span",
        text: `${i}`,
        // Здесь i будет вашим номером предложения
        className: "game__number"
      });
      gameResult.append(gameSpanNumber);
      const gameDivWords = new Component({
        tag: "div",
        className: "game__words dropzone"
      });
      gameResult.append(gameDivWords);
      this.gameWords.push(gameDivWords);
    }
    this.gamePuzzles = new Component({
      tag: "div",
      className: "game__puzzles dropzone"
    });
    this.append(this.gamePuzzles);
    this.gameBlockButtons = new GameBlockButtons();
    this.append(this.gameBlockButtons);
    const audioGame = new Component({
      tag: "audio",
      className: "game__audio"
    });
    this.append(audioGame);
    const sourceGame = new Component({
      tag: "source",
      className: "game__source",
      type: "audio/mpeg"
    });
    sourceGame.setAttribute("src", "../../../../public/zvonkiy-schelchok.mp3");
    sourceGame.setAttribute("type", "audio/mpeg");
    audioGame.append(sourceGame);
  }
  // создание спанов и добавление в них слов
  // eslint-disable-next-line class-methods-use-this
  addWordsToContainer(words, gamePuzzles) {
    console.log("Добавление слов в контейнер:", words);
    words.forEach((word) => {
      const wordSpan = new Component({
        tag: "span",
        className: "game__puzzle",
        text: word
      });
      wordSpan.setAttribute("draggable", "true");
      const node = wordSpan.getNode();
      if (node instanceof HTMLElement) {
        DynamicSizeManager.applyStyles(node, word, words.length);
      }
      gamePuzzles.append(wordSpan);
    });
  }
  // Метод для перемещения слов из одного контейнера в другой
  // eslint-disable-next-line class-methods-use-this
  moveWordToContainer(wordElement, targetContainer) {
    targetContainer.appendChild(wordElement);
  }
  getGameButtonContinue() {
    const gameBlockButtons = this.gameBlockButtons;
    return gameBlockButtons.getGameButtonContinue();
  }
  getGameButtonCheck() {
    const gameBlockButtons = this.gameBlockButtons;
    return gameBlockButtons.getGameButtonCheck();
  }
  getGameButtonAuto() {
    const gameBlockButtons = this.gameBlockButtons;
    return gameBlockButtons.getGameButtonAuto();
  }
  getGameButtonLogout() {
    const gameBlockButtons = this.gameBlockButtons;
    return gameBlockButtons.getGameButtonLogout();
  }
}
class AnimationHelper {
  static applyStyles(element, styles) {
    Object.assign(element.style, styles);
  }
  static animateElementMovement(element, targetRect, onComplete) {
    const elementRect = element.getBoundingClientRect();
    const deltaX = targetRect.left - elementRect.left;
    const deltaY = targetRect.top - elementRect.top;
    this.applyStyles(element, {
      transition: "transform 0.5s ease",
      transform: `translate(${deltaX}px, ${deltaY}px)`
    });
    setTimeout(() => {
      this.applyStyles(element, {
        transition: "",
        transform: ""
      });
      onComplete();
    }, 500);
  }
}
class SoundManager {
  static playClickSound() {
    const clickSound = document.querySelector(
      ".game__audio"
    );
    if (clickSound) {
      clickSound.play();
    }
  }
}
class ButtonsGameManager {
  constructor(gameBlockPuzzles) {
    __publicField(this, "gameBlockPuzzles");
    this.gameBlockPuzzles = gameBlockPuzzles;
  }
  enableContinueButton() {
    const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
    if (gameButtonContinue) {
      const buttonElement = gameButtonContinue.getNode();
      if (buttonElement) {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.add("continue-effect");
      }
    }
  }
  enableCheckButton() {
    const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
    if (gameButtonCheck) {
      const buttonElement = gameButtonCheck.getNode();
      if (buttonElement) {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.add("continue-effect");
      }
    }
  }
}
class SentenceCompletionChecker {
  constructor(gameBlockPuzzles, wordDataService, roundIndex, sentenceIndex) {
    __publicField(this, "gameBlockPuzzles");
    __publicField(this, "wordDataService");
    __publicField(this, "roundIndex");
    __publicField(this, "sentenceIndex");
    __publicField(this, "currentSentenceNodes", []);
    __publicField(this, "originalSentence", []);
    this.gameBlockPuzzles = gameBlockPuzzles;
    this.wordDataService = wordDataService;
    this.roundIndex = roundIndex;
    this.sentenceIndex = sentenceIndex;
  }
  checkSentenceCompletion() {
    this.originalSentence = this.wordDataService.getOriginalSentenceForRound(this.roundIndex, this.sentenceIndex).split(" ");
    const filledTopContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) => wordComponent.getNode().childNodes.length === this.originalSentence.length
    );
    if (!filledTopContainer) {
      return { isComplete: false, isCorrect: false };
    }
    const currentSentence = Array.from(
      filledTopContainer.getNode().childNodes
    ).map((node) => {
      var _a;
      return ((_a = node.textContent) == null ? void 0 : _a.trim()) || "";
    });
    this.currentSentenceNodes = Array.from(
      filledTopContainer.getNode().childNodes
    );
    const isComplete = filledTopContainer.getNode().childNodes.length === this.originalSentence.length;
    const isCorrect = JSON.stringify(this.originalSentence) === JSON.stringify(currentSentence);
    return { isComplete, isCorrect };
  }
  // eslint-disable-next-line class-methods-use-this
  highlightIncorrectWords() {
    this.currentSentenceNodes.forEach((node, index) => {
      var _a;
      if (node instanceof Element) {
        const word = (_a = node.textContent) == null ? void 0 : _a.trim();
        if (word !== this.originalSentence[index]) {
          node.classList.add("highlight-incorrect");
        } else {
          node.classList.remove("highlight-incorrect");
        }
      }
    });
  }
  handleCheckButtonClick() {
    const { isComplete, isCorrect } = this.checkSentenceCompletion();
    if (isComplete && !isCorrect) {
      this.highlightIncorrectWords();
      setTimeout(() => {
        this.removeHighlightIncorrectWords();
      }, 7e3);
    }
  }
  // Метод для снятия подсветки с неправильных слов
  // eslint-disable-next-line class-methods-use-this
  removeHighlightIncorrectWords() {
    this.currentSentenceNodes.forEach((node) => {
      if (node instanceof Element) {
        node.classList.remove("highlight-incorrect");
      }
    });
  }
  autoCorrectSentence() {
    const { isComplete, isCorrect } = this.checkSentenceCompletion();
    if (isComplete && !isCorrect) {
      this.currentSentenceNodes.forEach((node, index) => {
        const element = node;
        if (element instanceof HTMLElement) {
          setTimeout(() => {
            element.textContent = this.originalSentence[index];
            element.classList.add("fade-move");
          }, 1e3);
        }
      });
    }
  }
}
class Draggable {
  constructor(sourceContainer, dropZones, onDropComplete) {
    __publicField(this, "draggedElement", null);
    __publicField(this, "sourceContainer");
    // Контейнер-источник
    __publicField(this, "dropZones");
    // Контейнер-приемник
    __publicField(this, "onDropComplete");
    this.sourceContainer = sourceContainer;
    this.dropZones = dropZones;
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.onDropComplete = onDropComplete;
    this.initEvents();
  }
  resetDraggedElement() {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = "1";
      this.draggedElement = null;
    }
  }
  initEvents() {
    document.addEventListener("dragstart", this.dragStart.bind(this), false);
    document.addEventListener("dragend", this.dragEnd.bind(this), false);
    [...this.dropZones, this.sourceContainer].forEach((container) => {
      container.addEventListener("dragover", this.dragOver.bind(this), false);
      container.addEventListener("drop", this.dragDrop.bind(this), false);
    });
  }
  dragStart(event) {
    if (event.target instanceof HTMLElement && event.target.getAttribute("draggable")) {
      this.draggedElement = event.target;
      event.target.style.opacity = "0.5";
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dragEnd(event) {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = "1";
      this.draggedElement = null;
    }
  }
  // eslint-disable-next-line class-methods-use-this
  dragOver(event) {
    event.preventDefault();
  }
  dragDrop(event) {
    event.preventDefault();
    if (event.target instanceof HTMLElement && this.draggedElement) {
      const target = this.dropZones.includes(event.target) ? event.target : event.target.closest(".dropzone");
      if (target) {
        target.appendChild(this.draggedElement);
        this.resetDraggedElement();
        this.onDropComplete();
      }
    }
  }
}
class ArticleGameComponent extends Component {
  constructor(wordDataService, level = 1, roundIndex = 0, sentenceIndex = 0) {
    super({ tag: "article", className: "article-game" });
    __publicField(this, "gameBlockPuzzles");
    __publicField(this, "buttonsGameManager");
    __publicField(this, "wordDataService");
    __publicField(this, "sentenceCompletionChecker");
    __publicField(this, "currentWordContainer");
    __publicField(this, "level");
    __publicField(this, "roundIndex");
    __publicField(this, "sentenceIndex");
    __publicField(this, "draggable");
    __publicField(this, "currentContainerIndex", 0);
    // Обработчик клика в отдельном методе для возможности его удаления
    __publicField(this, "handleTopBlockSpanClick", (event) => {
      if (event.target.nodeName === "SPAN") {
        const spanNode = event.target;
        this.returnSpanToLowerBlock(spanNode);
        SoundManager.playClickSound();
      }
    });
    this.gameBlockPuzzles = new GameBlockPuzzles();
    this.wordDataService = wordDataService;
    this.level = level;
    this.roundIndex = roundIndex;
    this.sentenceIndex = sentenceIndex;
    this.initGameBlockPuzzles();
    this.loadAndDisplayWords();
    this.buttonsGameManager = new ButtonsGameManager(this.gameBlockPuzzles);
    this.sentenceCompletionChecker = new SentenceCompletionChecker(
      this.gameBlockPuzzles,
      wordDataService,
      roundIndex,
      sentenceIndex
    );
    this.initDraggable();
  }
  initGameBlockPuzzles() {
    this.append(this.gameBlockPuzzles);
    return this.gameBlockPuzzles.getNode();
  }
  // Метод инициализации Draggable
  initDraggable() {
    const sourceContainer = this.gameBlockPuzzles.gamePuzzles.getNode();
    const dropZones = this.gameBlockPuzzles.gameWords.map(
      (wordComponent) => wordComponent.getNode()
    );
    this.draggable = new Draggable(
      sourceContainer,
      dropZones,
      this.checkSentenceCompletion.bind(this)
    );
  }
  // добавление слов в нижний блок
  async loadAndDisplayWords() {
    try {
      await this.wordDataService.loadData(this.level);
      const words = this.wordDataService.getShuffledSentenceForRound(
        this.roundIndex,
        // Используем свойство класса this.roundIndex
        this.sentenceIndex
        // Используем свойство класса this.sentenceIndex
      );
      this.gameBlockPuzzles.addWordsToContainer(
        words,
        this.gameBlockPuzzles.gamePuzzles
      );
      this.initPuzzleClickEvents();
    } catch (error) {
    }
  }
  // Логика добавления из нижнего блока в верхний блок
  initPuzzleClickEvents() {
    this.gameBlockPuzzles.gamePuzzles.getChildren().forEach((puzzleComponent) => {
      if (puzzleComponent.getNode) {
        const puzzleNode = puzzleComponent.getNode();
        if (puzzleNode) {
          puzzleNode.addEventListener("click", () => {
            const targetContainer = this.findEmptyWordContainer();
            if (targetContainer instanceof HTMLElement) {
              const targetRect = targetContainer.getBoundingClientRect();
              AnimationHelper.animateElementMovement(
                puzzleNode,
                targetRect,
                () => {
                  this.gameBlockPuzzles.moveWordToContainer(
                    puzzleNode,
                    targetContainer
                  );
                  this.checkSentenceCompletion();
                  puzzleNode.classList.add("landing");
                  setTimeout(() => {
                    puzzleNode.classList.remove("landing");
                  }, 500);
                }
              );
              this.initTopBlockClickEvents();
              SoundManager.playClickSound();
            }
          });
        }
      }
    });
  }
  initTopBlockClickEvents() {
    this.gameBlockPuzzles.gameWords.forEach((wordComponent) => {
      const spanNode = wordComponent.getNode();
      spanNode.removeEventListener("click", this.handleTopBlockSpanClick);
      spanNode.addEventListener("click", this.handleTopBlockSpanClick);
    });
  }
  // Логика добавления из верхнего блока в нижний блок
  returnSpanToLowerBlock(spanNode) {
    const containerGamePuzzles = this.gameBlockPuzzles.gamePuzzles.getNode();
    const targetRect = containerGamePuzzles.getBoundingClientRect();
    AnimationHelper.animateElementMovement(spanNode, targetRect, () => {
      this.sentenceCompletionChecker.removeHighlightIncorrectWords();
      containerGamePuzzles.append(spanNode);
    });
  }
  // Логика опредения в какой верхний контейнер добавлять
  findEmptyWordContainer() {
    if (this.currentWordContainer && this.currentWordContainer.childNodes.length > 0) {
      return this.currentWordContainer;
    }
    const nextEmptyContainer = this.gameBlockPuzzles.gameWords.find(
      (wordComponent) => wordComponent.getNode().childNodes.length === 0
    );
    if (nextEmptyContainer) {
      this.currentWordContainer = nextEmptyContainer.getNode();
      return this.currentWordContainer;
    }
    return this.currentWordContainer;
  }
  checkSentenceCompletion() {
    const { isComplete, isCorrect } = this.sentenceCompletionChecker.checkSentenceCompletion();
    if (isComplete) {
      const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
      if (gameButtonCheck) {
        const buttonElementCheck = gameButtonCheck.getNode();
        buttonElementCheck.classList.remove("check-hidden");
        buttonElementCheck.addEventListener("click", () => {
          this.sentenceCompletionChecker.handleCheckButtonClick();
        });
      }
      this.buttonsGameManager.enableCheckButton();
      const gameButtonAuto = this.gameBlockPuzzles.getGameButtonAuto();
      if (gameButtonAuto) {
        const buttonElementAuto = gameButtonAuto.getNode();
        buttonElementAuto.addEventListener("click", () => {
          this.sentenceCompletionChecker.autoCorrectSentence();
          const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
          if (gameButtonContinue) {
            const buttonElementContinue = gameButtonContinue.getNode();
            buttonElementContinue.classList.add("check-visible");
          }
          this.buttonsGameManager.enableContinueButton();
          if (gameButtonCheck) {
            const buttonElementCheck = gameButtonCheck.getNode();
            buttonElementCheck.classList.add("check-hidden");
          }
        });
      }
    }
    if (isCorrect) {
      const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
      if (gameButtonContinue) {
        const buttonElementContinue = gameButtonContinue.getNode();
        buttonElementContinue.classList.add("check-visible");
      }
      this.buttonsGameManager.enableContinueButton();
      const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
      if (gameButtonCheck) {
        const buttonElementCheck = gameButtonCheck.getNode();
        buttonElementCheck.classList.add("check-hidden");
      }
    }
  }
}
class WordDataService {
  constructor() {
    __publicField(this, "data", { rounds: [], roundsCount: 0 });
    __publicField(this, "baseUrl", "https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel");
  }
  async loadData(level) {
    const url = `${this.baseUrl}${level}.json`;
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      this.data = jsonData;
      console.log("Данные успешно загружены:", jsonData);
    } catch (error) {
    }
  }
  getShuffledSentenceForRound(roundIndex, sentenceIndex) {
    if (roundIndex < this.data.rounds.length) {
      const round = this.data.rounds[roundIndex];
      if (sentenceIndex < round.words.length) {
        const sentence = round.words[sentenceIndex].textExample;
        return WordDataService.shuffleArray(sentence.split(" "));
      }
    }
    return [];
  }
  // метод получения перемешенного предложения
  static shuffleArray(array) {
    const arrayCopy = array.slice();
    for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }
  // метод получения неперемешенного предложения
  getOriginalSentenceForRound(roundIndex, sentenceIndex) {
    if (roundIndex < this.data.rounds.length) {
      const round = this.data.rounds[roundIndex];
      if (sentenceIndex < round.words.length) {
        const sentence = round.words[sentenceIndex].textExample;
        return sentence;
      }
    }
    return "";
  }
}
class GameScreen {
  constructor(onLoginSuccess) {
    __publicField(this, "onLoginSuccess");
    this.onLoginSuccess = onLoginSuccess;
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    const wordDataService = new WordDataService();
    const articleGame = new ArticleGameComponent(wordDataService);
    articleGame.initGameBlockPuzzles();
    const articleGameElement = articleGame.getNode();
    return articleGameElement;
  }
}
class App {
  constructor() {
    __publicField(this, "currentState", "access");
    __publicField(this, "wrapper");
    __publicField(this, "mainComponent");
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("wrapper");
    document.body.appendChild(this.wrapper);
    const savedState = localStorage.getItem("currentState");
    this.currentState = savedState || "access";
    this.initHeader();
    this.initMainComponent();
    this.initFooter();
    this.init();
    EventEmitter$1.on("logout", this.handleLogout.bind(this));
  }
  handleLogout() {
    this.switchState("access");
  }
  initHeader() {
    const header = new HeaderComponent();
    this.wrapper.appendChild(header.getNode());
  }
  initMainComponent() {
    this.mainComponent = new MainComponent();
    this.wrapper.appendChild(this.mainComponent.getNode());
  }
  initFooter() {
    const footer = new FooterComponent();
    this.wrapper.appendChild(footer.getNode());
  }
  init() {
    let accessScreen;
    let welcomeScreen;
    let gameScreen;
    switch (this.currentState) {
      case "access":
        accessScreen = new AccessScreen(() => this.switchState("welcome"));
        this.mainComponent.appendToContainer(accessScreen.render());
        break;
      case "welcome":
        welcomeScreen = new WelcomeScreen(() => this.switchState("game"));
        this.mainComponent.appendToContainer(welcomeScreen.render());
        document.body.classList.add("welcome-body");
        break;
      case "game":
        gameScreen = new GameScreen(() => this.switchState("statistics"));
        this.mainComponent.appendToContainer(gameScreen.render());
        document.body.classList.add("game-body");
        break;
    }
  }
  switchState(newState) {
    this.currentState = newState;
    localStorage.setItem("currentState", newState);
    this.wrapper.innerHTML = "";
    this.initHeader();
    this.initMainComponent();
    this.initFooter();
    this.init();
  }
}
new App();
