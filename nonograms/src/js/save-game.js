const gameData = {
  gameLoadState: null, // состояние игры для загрузки
  gameName: null, // название игры для загрузки и таблицы результатов
  gameLevel: null, // уровень игры для таблицы результатов
  gameTime: null, // время игры для таблицы результатов
  gameSize: null, // размер поля для загрузки
  gameSolution: null, // решение для загрузки подсказок
};
// начальные значения

// Функция для установки новых значений gameData тк нельзя export let
function setGameData(
  currentgameLoadState,
  currentGameName,
  currentLevel,
  currentTime,
  currentSize,
  currentSolution
) {
  gameData.gameLoadState = currentgameLoadState;
  gameData.gameName = currentGameName;
  gameData.gameLevel = currentLevel;
  gameData.gameTime = currentTime;
  gameData.gameSize = currentSize;
  gameData.gameSolution = currentSolution;
}

// Функция для сохранения игры
function saveGame(
  currentgameLoadState,
  currentGameName,
  currentLevel,
  currentTime,
  currentSize,
  currentSolution
) {
  setGameData(
    currentgameLoadState,
    currentGameName,
    currentLevel,
    currentTime,
    currentSize,
    currentSolution
  );
  localStorage.setItem('savedGame', JSON.stringify(gameData));
}

// функция для загрузки игры
function loadGame() {
  const savedGame = localStorage.getItem('savedGame');
  return savedGame ? JSON.parse(savedGame) : null;
}

export { saveGame, loadGame };
