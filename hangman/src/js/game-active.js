// eslint-disable-next-line prefer-const
let gameIsActive = true;

function setGameActive(isActive) {
  gameIsActive = isActive;
}

function isGameActive() {
  return gameIsActive;
}

export { setGameActive, isGameActive };
