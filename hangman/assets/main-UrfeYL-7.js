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
function createHeader() {
  const header = document.createElement("header");
  header.className = "header";
  const headerContainer = document.createElement("div");
  headerContainer.className = "header__container";
  const headerTitle = document.createElement("h1");
  headerTitle.className = "header__title";
  headerTitle.textContent = "HANGMAN GAME";
  headerContainer.appendChild(headerTitle);
  header.appendChild(headerContainer);
  return header;
}
function createFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  const footerContainer = document.createElement("div");
  footerContainer.className = "footer__container";
  const footerYear = document.createElement("div");
  footerYear.className = "footer__year";
  footerYear.textContent = "2024";
  const footerLink = document.createElement("a");
  footerLink.className = "footer__link";
  footerLink.textContent = "Anna Golosova";
  footerLink.href = "https://github.com/Golosova76";
  footerLink.target = "_blank";
  footerContainer.appendChild(footerYear);
  footerContainer.appendChild(footerLink);
  footer.appendChild(footerContainer);
  return footer;
}
const bodyParts = {
  head: `<svg xmlns="http://www.w3.org/2000/svg" width="101" height="101" viewBox="0 0 101 101" fill="none">
        <circle cx="50.5" cy="50.5" r="48" stroke="black" stroke-width="5"/>
        </svg>`,
  body: `<svg xmlns="http://www.w3.org/2000/svg" width="5" height="131" viewBox="0 0 5 131" fill="none">
              <rect width="5" height="131" fill="black"/>
              </svg>`,
  "left-arm": `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="81" viewBox="0 0 68 81" fill="none">
                <rect x="63.7964" width="5" height="100" transform="rotate(39.64 63.7964 0)" fill="black"/>
                </svg>`,
  "right-arm": `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="81" viewBox="0 0 68 81" fill="none">
                  <rect y="3.18951" width="5" height="100" transform="rotate(-39.6353 0 3.18951)" fill="black"/>
                  </svg>`,
  "left-leg": `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="81" viewBox="0 0 68 81" fill="none">
                  <rect x="63.7964" width="5" height="100" transform="rotate(39.64 63.7964 0)" fill="black"/>
                  </svg>`,
  "right-leg": `<svg xmlns="http://www.w3.org/2000/svg" width="68" height="81" viewBox="0 0 68 81" fill="none">
                <rect y="3.18951" width="5" height="100" transform="rotate(-39.6353 0 3.18951)" fill="black"/>
                </svg>`
};
function createGallows() {
  const gallows = document.createElement("div");
  gallows.className = "game__gallows gallow";
  const combinedElements = [
    "post",
    "beam",
    "support",
    "noose",
    "bottom",
    ...Object.keys(bodyParts)
  ];
  combinedElements.forEach((element) => {
    const div = document.createElement("div");
    div.className = `gallow__${element}`;
    if (bodyParts[element]) {
      div.innerHTML = bodyParts[element];
      div.style.visibility = "hidden";
    }
    gallows.appendChild(div);
  });
  return gallows;
}
const words = [
  "lesson",
  "matrix",
  "quiz",
  "campus",
  "market",
  "ketchup",
  "kindness",
  "title",
  "tinfoil",
  "queue",
  "mass",
  "strength",
  "hope",
  "animal",
  "people",
  "student"
];
const hints = [
  "What can you cook but can not eat.",
  "The cultural, social, or political environment in which something develops.",
  "An informal test or examination of a student or class.",
  "The buildings of a college or university and the land that surrounds them.",
  "A place or event at which people meet in order to buy and sell things.",
  "A thick sauce made from tomatoes that is eaten cold with food.",
  "The quality of being friendly, generous, and considerate.",
  "A descriptive heading or caption, as of a chapter, section, or other part of a book.",
  "Shiny, metal material, as thin as paper, that is used especially for wrapping food in order to store it or cook it.",
  "A list of jobs that a computer has to do.",
  "A large amount or number of something.",
  "The quality or state of being physically strong.",
  "A feeling of expectation and desire for a particular thing to happen.",
  "Something that lives and moves but is not a person, bird, fish, or insect.",
  "More than one person.",
  "Someone who is studying at a school or university."
];
let currentWord = "";
let currentHint = "";
let lastWordIndex = -1;
function getLastWordIndex() {
  return lastWordIndex;
}
function createWordsSection() {
  const wordsSection = document.createElement("div");
  wordsSection.className = "game__words";
  const wordDiv = document.createElement("div");
  wordDiv.className = "game__word";
  let wordIndex;
  let isNewWord = false;
  while (!isNewWord) {
    wordIndex = Math.floor(Math.random() * words.length);
    if (wordIndex !== getLastWordIndex()) {
      isNewWord = true;
    }
  }
  lastWordIndex = wordIndex;
  const word = words[wordIndex];
  currentWord = word;
  const hint = hints[wordIndex];
  currentHint = hint;
  console.log(word);
  console.log(hint);
  for (let i = 0; i < word.length; i += 1) {
    const letterSpan = document.createElement("span");
    letterSpan.className = "letter";
    const underlineSpan = document.createElement("span");
    underlineSpan.className = "underline";
    const letterContentSpan = document.createElement("span");
    letterContentSpan.className = "letter-content";
    letterContentSpan.textContent = word[i];
    letterContentSpan.style.visibility = "hidden";
    letterSpan.appendChild(letterContentSpan);
    letterSpan.appendChild(underlineSpan);
    wordDiv.appendChild(letterSpan);
  }
  const hintDiv = document.createElement("div");
  hintDiv.className = "game__hint";
  const hintLabel = document.createElement("span");
  hintLabel.className = "hint";
  hintLabel.textContent = "Hint: ";
  hintDiv.appendChild(hintLabel);
  const hintText = document.createElement("span");
  hintText.className = "hint-text";
  hintText.textContent = hint;
  hintDiv.appendChild(hintText);
  const incorrectDiv = document.createElement("div");
  incorrectDiv.className = "incorrect-text";
  const incorrectText = document.createElement("span");
  incorrectText.className = "incorrect-text";
  incorrectText.textContent = "Incorrect guesses: ";
  incorrectDiv.appendChild(incorrectText);
  const prevSpan = document.createElement("span");
  prevSpan.className = "prev";
  prevSpan.textContent = "0";
  incorrectDiv.appendChild(prevSpan);
  const slash = document.createTextNode(" / ");
  incorrectDiv.appendChild(slash);
  const nextSpan = document.createElement("span");
  nextSpan.className = "next";
  nextSpan.textContent = "6";
  incorrectDiv.appendChild(nextSpan);
  wordsSection.appendChild(wordDiv);
  wordsSection.appendChild(hintDiv);
  wordsSection.appendChild(incorrectDiv);
  return wordsSection;
}
function createModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  const modalBody = document.createElement("div");
  modalBody.className = "modal__body";
  const modalContent = document.createElement("div");
  modalContent.className = "modal__content";
  const modalText = document.createElement("div");
  modalText.className = "modal__text";
  modalText.textContent = "Congratulations! You win!";
  const modalWord = document.createElement("div");
  modalWord.className = "modal__word";
  modalWord.textContent = "Answer was: kindness";
  const playAgainButton = document.createElement("button");
  playAgainButton.className = "modal__button";
  playAgainButton.textContent = "Play again";
  modalContent.appendChild(modalText);
  modalContent.appendChild(modalWord);
  modalContent.appendChild(playAgainButton);
  modalBody.appendChild(modalContent);
  modal.appendChild(modalBody);
  return { modal, modalContent, modalText, modalWord, playAgainButton };
}
let modalElements = null;
function showGameOverModal(isWin) {
  if (!modalElements) {
    modalElements = createModal();
  }
  modalElements.modalText.textContent = isWin ? "Congratulations! You win!" : "Unfortunately, you lost!";
  modalElements.modalWord.textContent = `Answer was: ${currentWord}`;
  modalElements.modal.style.opacity = "1";
  modalElements.modal.style.visibility = "visible";
  modalElements.modalContent.style.opacity = "1";
  document.body.appendChild(modalElements.modal);
  modalElements.modalContent.style.transform = "perspective(600px) translate(0px, 0px) rotateX(0deg)";
}
function hideModal() {
  if (modalElements && modalElements.modal) {
    modalElements.modal.style.opacity = "0";
    modalElements.modal.style.visibility = "hidden";
    modalElements.modalContent.style.opacity = "0";
    modalElements.modalContent.style.transform = "perspective(600px) translate(0px, -100%) rotateX(45deg)";
  }
}
let gameIsActive = true;
function setGameActive(isActive) {
  gameIsActive = isActive;
}
function isGameActive() {
  return gameIsActive;
}
function resetGame() {
  hideModal();
  setIncorrectCounter(0);
  updateIncorrectCounterDisplay();
  createWordsSection();
  updateHint();
  updateWord();
  hideBodyParts();
  setupPlayAgainButton();
  const buttons = document.querySelectorAll(".button__key");
  buttons.forEach((button) => {
    button.disabled = false;
  });
  setGameActive(true);
}
let incorrectCounter = 0;
const maxIncorrectCount = 6;
function setIncorrectCounter(value) {
  incorrectCounter = value;
}
function getIncorrectCounter() {
  return incorrectCounter;
}
function updateWordDisplay(letter) {
  const lowerCaseLetter = letter.toLowerCase();
  const wordSpans = document.querySelectorAll(".letter-content");
  const underlineSpans = document.querySelectorAll(".underline");
  for (let i = 0; i < currentWord.length; i += 1) {
    if (currentWord[i] === lowerCaseLetter) {
      if (wordSpans[i] && underlineSpans[i]) {
        wordSpans[i].style.visibility = "visible";
        underlineSpans[i].style.visibility = "hidden";
      }
    }
  }
}
function updateIncorrectCounterDisplay() {
  const prevSpan = document.querySelector(".prev");
  if (prevSpan) {
    prevSpan.textContent = getIncorrectCounter();
  }
}
function updateHint() {
  const hintTextElement = document.querySelector(".hint-text");
  hintTextElement.textContent = currentHint;
}
function updateWord() {
  const letterContentSpans = document.querySelectorAll(".letter-content");
  const underlineSpans = document.querySelectorAll(".underline");
  if (currentWord.length !== letterContentSpans.length) {
    const letterSpans = document.querySelectorAll(".letter");
    letterSpans.forEach((span) => span.remove());
    letterContentSpans.forEach((span) => span.remove());
    underlineSpans.forEach((span) => span.remove());
    const wordDiv = document.querySelector(".game__word");
    for (let i = 0; i < currentWord.length; i += 1) {
      const letterSpan = document.createElement("span");
      letterSpan.className = "letter";
      const underlineSpan = document.createElement("span");
      underlineSpan.className = "underline";
      underlineSpan.style.visibility = "visible";
      const letterContentSpan = document.createElement("span");
      letterContentSpan.className = "letter-content";
      letterContentSpan.textContent = currentWord[i];
      letterContentSpan.style.visibility = "hidden";
      letterSpan.appendChild(letterContentSpan);
      letterSpan.appendChild(underlineSpan);
      wordDiv.appendChild(letterSpan);
    }
  } else {
    letterContentSpans.forEach((span, index) => {
      span.textContent = currentWord[index];
      span.style.visibility = "hidden";
    });
  }
}
const bodyPartsOrder = [
  "gallow__head",
  "gallow__body",
  "gallow__left-arm",
  "gallow__right-arm",
  "gallow__left-leg",
  "gallow__right-leg"
];
function showBodyPart() {
  if (getIncorrectCounter() < maxIncorrectCount) {
    const partToShow = document.querySelector(
      `.${bodyPartsOrder[getIncorrectCounter()]}`
    );
    if (partToShow) {
      partToShow.style.visibility = "visible";
    }
  }
}
function hideBodyParts() {
  bodyPartsOrder.forEach((partClass) => {
    const partToHide = document.querySelector(`.${partClass}`);
    if (partToHide) {
      partToHide.style.visibility = "hidden";
    }
  });
}
function checkWordCorrect() {
  const displayLetters = document.querySelectorAll(".letter-content");
  const displayWord = Array.from(displayLetters).map(
    (span) => span.style.visibility === "visible" ? span.textContent : "_"
  ).join("");
  return displayWord === currentWord;
}
function setupPlayAgainButton() {
  if (modalElements && modalElements.playAgainButton) {
    modalElements.playAgainButton.removeEventListener("click", resetGame);
    modalElements.playAgainButton.addEventListener("click", resetGame);
  }
}
function handleLetterClick(letter) {
  const buttons = document.querySelectorAll(".button__key");
  buttons.forEach((button) => {
    if (button.textContent === letter) {
      button.disabled = true;
    }
  });
  updateWordDisplay(letter);
  const isWordCorrect = checkWordCorrect();
  if (!currentWord.includes(letter.toLowerCase())) {
    showBodyPart();
    setIncorrectCounter(getIncorrectCounter() + 1);
    updateIncorrectCounterDisplay();
  }
  if (getIncorrectCounter() === 6) {
    showGameOverModal(false);
    setGameActive(false);
    setupPlayAgainButton();
    modalElements.playAgainButton.addEventListener("click", resetGame);
  } else if (isWordCorrect) {
    showGameOverModal(true);
    setGameActive(false);
    setupPlayAgainButton();
    modalElements.playAgainButton.addEventListener("click", resetGame);
  }
}
function createKeyboard() {
  const keyboard = document.createElement("div");
  keyboard.className = "game__keyboards";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "button__key button";
    button.textContent = letter;
    button.addEventListener("click", () => {
      handleLetterClick(letter);
    });
    keyboard.appendChild(button);
  });
  return keyboard;
}
function createBody() {
  const wordBody = document.createElement("div");
  wordBody.className = "game__body";
  wordBody.appendChild(createWordsSection());
  wordBody.appendChild(createKeyboard());
  return wordBody;
}
function createMain() {
  const page = document.createElement("main");
  page.className = "page";
  const pageContainer = document.createElement("div");
  pageContainer.className = "page__container game";
  pageContainer.appendChild(createGallows());
  pageContainer.appendChild(createBody());
  page.appendChild(pageContainer);
  return page;
}
document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  document.body.appendChild(wrapper);
  const { modal } = createModal();
  wrapper.appendChild(modal);
  wrapper.appendChild(createHeader());
  wrapper.appendChild(createMain());
  wrapper.appendChild(createFooter());
  document.addEventListener("keydown", function addEventListenerKey(event) {
    if (isGameActive()) {
      const pressedKeyCode = event.code;
      if (pressedKeyCode.startsWith("Key")) {
        const pressedKey = pressedKeyCode.charAt(3).toUpperCase();
        handleLetterClick(pressedKey);
      }
    }
  });
});
