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
        if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
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
  headerTitle.textContent = "Nonogram game";
  headerContainer.appendChild(headerTitle);
  header.appendChild(headerContainer);
  return header;
}
function createGameColumns() {
  const columnTimeToggle = document.createElement("div");
  columnTimeToggle.className = "game__column";
  const timerDiv = document.createElement("div");
  timerDiv.className = "game__timer timer";
  const spanMinutes = document.createElement("span");
  spanMinutes.className = "timer__minutes";
  spanMinutes.textContent = "00";
  const spanSeconds = document.createElement("span");
  spanSeconds.className = "timer__seconds";
  spanSeconds.textContent = "00";
  timerDiv.appendChild(spanMinutes);
  timerDiv.appendChild(document.createTextNode(":"));
  timerDiv.appendChild(spanSeconds);
  const toggleDiv = document.createElement("div");
  toggleDiv.className = "game__toggle";
  const toggleButton = document.createElement("button");
  toggleButton.className = "button-toggle button";
  toggleButton.type = "text";
  toggleButton.textContent = "toggle theme";
  toggleDiv.appendChild(toggleButton);
  columnTimeToggle.appendChild(timerDiv);
  columnTimeToggle.appendChild(toggleDiv);
  const columnButtonsThree = document.createElement("div");
  columnButtonsThree.className = "game__column";
  const buttonsThree = ["clear", "save", "sound"];
  buttonsThree.forEach((buttonText) => {
    const button = document.createElement("button");
    button.className = `button-${buttonText} button`;
    button.textContent = buttonText;
    columnButtonsThree.appendChild(button);
  });
  const columnButtonsFour = document.createElement("div");
  columnButtonsFour.className = "game__column";
  const buttonsFour = ["new game", "random game", "load game", "solution"];
  buttonsFour.forEach((buttonText) => {
    const button = document.createElement("button");
    button.className = `button-${buttonText.replace(" ", "-")} button`;
    button.textContent = buttonText;
    columnButtonsFour.appendChild(button);
  });
  return {
    columns: [columnTimeToggle, columnButtonsThree, columnButtonsFour],
    timerMinutes: spanMinutes,
    timerSeconds: spanSeconds,
    toggleButton,
    clearButton: columnButtonsThree.querySelector(".button-clear"),
    saveButton: columnButtonsThree.querySelector(".button-save"),
    soundButton: columnButtonsThree.querySelector(".button-sound"),
    newGameButton: columnButtonsFour.querySelector(".button-new"),
    randomGameButton: columnButtonsFour.querySelector(".button-random"),
    loadGameButton: columnButtonsFour.querySelector(".button-load"),
    solutionGameButton: columnButtonsFour.querySelector(".button-solution"),
  };
}
function createScoreTable() {
  const gameTableDiv = document.createElement("div");
  gameTableDiv.className = "game__table";
  const tableScore = document.createElement("table");
  tableScore.className = "results-table";
  const headerTable = document.createElement("thead");
  const lineTable = document.createElement("tr");
  const titleTableName = document.createElement("th");
  titleTableName.textContent = "name";
  const titleTableLevel = document.createElement("th");
  titleTableLevel.textContent = "level";
  const titleTableStopWatch = document.createElement("th");
  titleTableStopWatch.textContent = "stop-watch";
  lineTable.appendChild(titleTableName);
  lineTable.appendChild(titleTableLevel);
  lineTable.appendChild(titleTableStopWatch);
  headerTable.appendChild(lineTable);
  const bodyTable = document.createElement("tbody");
  const rowsData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  rowsData.forEach((rowData) => {
    const tr = document.createElement("tr");
    rowData.forEach((cellData) => {
      const td = document.createElement("td");
      td.textContent = cellData;
      tr.appendChild(td);
    });
    bodyTable.appendChild(tr);
  });
  tableScore.appendChild(headerTable);
  tableScore.appendChild(bodyTable);
  gameTableDiv.appendChild(tableScore);
  return gameTableDiv;
}
function createGameChoice() {
  const gameChoiceDiv = document.createElement("div");
  gameChoiceDiv.className = "game__choice";
  const levels = [
    {
      level: "easy",
      items: ["pushchair", "heart", "cockerel", "camel", "tetris"],
    },
    {
      level: "medium",
      items: ["cat", "dog", "rabbit", "duckling", "jellyfish"],
    },
    { level: "hard", items: ["bunny", "umbrella", "puppy", "mermaid", "bull"] },
  ];
  const buttonsChoice = [];
  const listItemsChoice = [];
  const gameItemDiv = [];
  levels.forEach(({ level, items }) => {
    const gameItemsDiv = document.createElement("div");
    gameItemsDiv.className = `game__items ${level}`;
    gameItemDiv.push(gameItemsDiv);
    const button = document.createElement("button");
    button.className = `button-choice ${level} button`;
    button.textContent = `${level} ${items.length}x${items.length}`;
    buttonsChoice.push(button);
    gameItemsDiv.appendChild(button);
    const ulChoice = document.createElement("ul");
    ulChoice.className = "name-content";
    items.forEach((item) => {
      const liChoice = document.createElement("li");
      liChoice.className = "name-content__item";
      liChoice.textContent = item;
      listItemsChoice.push(liChoice);
      ulChoice.appendChild(liChoice);
    });
    gameItemsDiv.appendChild(ulChoice);
    gameChoiceDiv.appendChild(gameItemsDiv);
  });
  return {
    gameChoiceDiv,
    gameItemDiv,
    buttonsChoice,
    listItemsChoice,
  };
}
function createGameHandling() {
  const gameHandling = document.createElement("div");
  gameHandling.classList = "game__handling";
  const { columns } = createGameColumns();
  columns.forEach((column) => gameHandling.appendChild(column));
  const gameInputs = document.createElement("div");
  gameInputs.classList = "game__inputs";
  gameHandling.appendChild(gameInputs);
  gameInputs.appendChild(createScoreTable());
  const { gameChoiceDiv } = createGameChoice();
  gameInputs.appendChild(gameChoiceDiv);
  return gameHandling;
}
function createTopHints(size, topHintsData) {
  const topHints = document.createElement("div");
  topHints.className = "game__hints top-hints";
  const maxHints = Math.max(...topHintsData.map((col) => col.length));
  for (let rowIndex = 0; rowIndex < maxHints; rowIndex += 1) {
    const topHintRow = document.createElement("div");
    topHintRow.className = "top-hints-row";
    for (let colIndex = 0; colIndex < size.columns; colIndex += 1) {
      const hintCell = document.createElement("div");
      hintCell.className = "hint-cell top-hint";
      const columnHints = topHintsData[colIndex];
      if (rowIndex < maxHints - columnHints.length) {
        hintCell.textContent = "";
      } else {
        const hintIndex = rowIndex - (maxHints - columnHints.length);
        hintCell.textContent = columnHints[hintIndex];
      }
      topHintRow.appendChild(hintCell);
    }
    topHints.appendChild(topHintRow);
  }
  return topHints;
}
function createLeftHints(size, leftHintsData) {
  const leftHints = document.createElement("div");
  leftHints.className = "hints-cell left-hints";
  for (let rowIndex = 0; rowIndex < size.rows; rowIndex += 1) {
    const leftHintRow = document.createElement("div");
    leftHintRow.className = "left-hints-row";
    const rowHints = leftHintsData[rowIndex];
    const maxHints = Math.max(...leftHintsData.map((row) => row.length));
    for (let i = 0; i < maxHints - rowHints.length; i += 1) {
      const hintCell = document.createElement("div");
      hintCell.className = "hint-cell left-hint";
      hintCell.textContent = "";
      leftHintRow.appendChild(hintCell);
    }
    for (let hintIndex = 0; hintIndex < rowHints.length; hintIndex += 1) {
      const hintCell = document.createElement("div");
      hintCell.className = "hint-cell left-hint";
      hintCell.textContent = rowHints[hintIndex];
      leftHintRow.appendChild(hintCell);
    }
    leftHints.appendChild(leftHintRow);
  }
  return leftHints;
}
const cells = [];
const gameState = [];
function createGameBoard(size) {
  const gameBoard = document.createElement("div");
  gameBoard.className = "game__board";
  for (let i = 0; i < size.rows; i += 1) {
    const gameRow = document.createElement("div");
    gameRow.className = "game__row";
    const gameStateRow = [];
    for (let j = 0; j < size.columns; j += 1) {
      const gameCell = document.createElement("div");
      gameCell.className = "game-cell";
      gameCell.dataset.row = i;
      gameCell.dataset.column = j;
      gameRow.appendChild(gameCell);
      cells.push(gameCell);
      gameStateRow.push(0);
    }
    gameBoard.appendChild(gameRow);
    gameState.push(gameStateRow);
  }
  return { gameBoard, cells, gameState };
}
function generateHints(solution) {
  const leftHints = solution.map((row) => {
    return row
      .reduce((hints, cell) => {
        if (cell) {
          if (!hints.length || hints[hints.length - 1].ended) {
            hints.push({ count: 1, ended: false });
          } else {
            hints[hints.length - 1].count += 1;
          }
        } else if (hints.length && !hints[hints.length - 1].ended) {
          hints[hints.length - 1].ended = true;
        }
        return hints;
      }, [])
      .map((hint) => hint.count);
  });
  const topHints = Array.from({ length: solution[0].length }, (_, col) => {
    return solution
      .reduce((hints, row) => {
        const cell = row[col];
        if (cell) {
          if (!hints.length || hints[hints.length - 1].ended) {
            hints.push({ count: 1, ended: false });
          } else {
            hints[hints.length - 1].count += 1;
          }
        } else if (hints.length && !hints[hints.length - 1].ended) {
          hints[hints.length - 1].ended = true;
        }
        return hints;
      }, [])
      .map((hint) => hint.count);
  });
  return { topHints, leftHints };
}
function createGameBody(puzzle) {
  const { size, solution } = puzzle;
  const hints = generateHints(solution);
  const gameBody = document.createElement("div");
  gameBody.classList = "game__body";
  const topHints = createTopHints(size, hints.topHints);
  const leftHints = createLeftHints(size, hints.leftHints);
  const { gameBoard } = createGameBoard(size);
  gameBody.appendChild(topHints);
  gameBody.appendChild(leftHints);
  gameBody.appendChild(gameBoard);
  return gameBody;
}
const puzzles = [
  {
    name: "pushchair",
    level: "easy",
    size: { rows: 5, columns: 5 },
    solution: [
      [false, true, true, false, false],
      [true, true, false, false, true],
      [true, true, true, true, false],
      [false, true, true, false, false],
      [true, false, false, true, false],
    ],
  },
  {
    name: "heart",
    level: "easy",
    size: { rows: 5, columns: 5 },
    solution: [
      [false, true, false, true, false],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [false, true, true, true, false],
      [false, false, true, false, false],
    ],
  },
  {
    name: "cockerel",
    level: "easy",
    size: { rows: 5, columns: 5 },
    solution: [
      [false, true, false, false, false],
      [true, true, false, true, true],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, true, false, false],
    ],
  },
  {
    name: "camel",
    level: "easy",
    size: { rows: 5, columns: 5 },
    solution: [
      [false, false, false, true, true],
      [true, true, false, true, false],
      [true, true, true, true, false],
      [true, false, true, false, false],
      [true, false, true, false, false],
    ],
  },
  {
    name: "tetris",
    level: "easy",
    size: { rows: 5, columns: 5 },
    solution: [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [true, false, true, false, true],
      [true, false, false, true, true],
      [true, true, false, true, true],
    ],
  },
  {
    name: "cat",
    level: "medium",
    size: { rows: 10, columns: 10 },
    solution: [
      [false, false, false, false, false, false, true, true, true, false],
      [true, false, false, false, true, false, true, false, true, true],
      [true, true, false, true, true, false, false, false, false, true],
      [true, true, true, true, true, false, false, false, false, true],
      [true, false, true, false, true, false, false, false, false, true],
      [true, true, true, true, true, false, false, true, true, true],
      [false, true, true, true, false, false, true, true, true, true],
      [false, false, true, true, true, true, true, true, true, true],
      [false, false, true, true, true, true, true, true, true, true],
      [false, false, false, true, true, true, true, false, true, true],
    ],
  },
  {
    name: "dog",
    level: "medium",
    size: { rows: 10, columns: 10 },
    solution: [
      [true, true, false, false, true, true, false, false, false, false],
      [false, false, true, true, true, false, false, false, false, false],
      [false, true, true, false, true, true, true, true, false, false],
      [false, true, true, true, true, true, true, false, false, false],
      [false, false, true, true, false, false, false, false, false, false],
      [false, true, true, true, true, true, false, false, false, true],
      [true, true, true, true, true, true, true, true, false, true],
      [true, false, true, true, true, true, true, true, true, false],
      [false, false, true, false, false, true, true, true, false, false],
      [false, true, true, false, true, true, true, false, false, false],
    ],
  },
  {
    name: "rabbit",
    level: "medium",
    size: { rows: 10, columns: 10 },
    solution: [
      [false, false, true, true, false, true, true, true, false, false],
      [false, true, false, false, true, false, false, false, true, false],
      [true, false, true, false, false, true, true, true, false, false],
      [true, true, false, false, true, true, false, false, false, false],
      [false, true, true, true, false, true, true, false, true, true],
      [true, false, false, false, true, false, false, true, false, true],
      [false, true, true, true, false, false, false, true, true, false],
      [false, false, false, true, true, false, true, true, false, false],
      [false, false, true, false, false, false, true, false, false, false],
      [false, false, true, true, true, true, true, false, false, false],
    ],
  },
  {
    name: "duckling",
    level: "medium",
    size: { rows: 10, columns: 10 },
    solution: [
      [false, false, false, true, true, true, false, false, false, false],
      [false, false, true, false, false, false, true, false, false, false],
      [false, false, true, false, true, false, true, false, false, false],
      [false, true, true, true, false, false, true, false, false, false],
      [true, true, true, true, true, false, true, false, false, false],
      [false, false, false, true, false, true, false, false, false, true],
      [false, false, true, false, false, false, true, true, true, true],
      [false, true, false, false, true, false, false, false, false, true],
      [false, true, false, false, true, true, false, false, true, true],
      [false, true, true, false, false, true, true, true, false, true],
    ],
  },
  {
    name: "jellyfish",
    level: "medium",
    size: { rows: 10, columns: 10 },
    solution: [
      [false, false, false, true, true, true, true, false, false, false],
      [false, false, true, true, false, false, true, true, false, false],
      [false, true, false, false, false, false, false, false, true, false],
      [true, false, false, true, false, false, true, false, false, true],
      [true, false, false, false, false, false, false, false, false, true],
      [true, true, true, true, true, true, true, true, true, true],
      [false, false, true, false, true, false, true, false, true, false],
      [false, true, false, false, true, false, false, true, false, true],
      [false, true, false, true, false, false, false, true, false, true],
      [true, true, false, true, false, false, false, true, false, true],
    ],
  },
  {
    name: "bunny",
    level: "hard",
    size: { rows: 15, columns: 15 },
    solution: [
      [false, true, true, true, true, true, true, false, false, false, false, false, false, false, false],
      [false, true, false, false, false, false, true, true, true, true, true, true, false, false, false],
      [false, false, true, true, false, false, false, true, false, false, false, true, true, false, false],
      [false, false, false, false, true, true, true, false, false, false, true, false, false, true, false],
      [false, false, false, false, false, false, true, true, false, false, false, false, true, true, false],
      [false, false, false, false, false, false, false, true, true, false, false, true, true, false, false],
      [false, false, false, false, false, false, true, true, false, false, true, false, false, false, false],
      [false, false, false, true, true, true, true, false, false, false, true, true, false, false, false],
      [false, false, true, true, false, false, false, false, true, false, false, false, true, false, false],
      [false, true, true, false, false, false, true, true, false, true, true, false, false, true, false],
      [true, false, true, false, false, false, false, true, true, false, false, true, true, true, false],
      [true, true, true, false, false, false, false, false, true, false, false, false, false, false, false],
      [false, false, true, true, false, false, true, true, true, true, false, false, false, false, false],
      [false, false, false, true, true, false, false, false, false, false, true, false, false, false, false],
      [true, true, false, true, true, true, true, true, true, true, true, false, true, true, true],
    ],
  },
  {
    name: "umbrella",
    level: "hard",
    size: { rows: 15, columns: 15 },
    solution: [
      [false, false, false, false, false, false, false, true, true, false, false, false, false, false, false],
      [false, false, false, true, true, true, true, true, true, true, true, false, false, false, false],
      [false, true, true, true, false, false, true, true, false, true, true, true, true, false, false],
      [true, true, false, false, false, true, true, false, false, true, false, false, true, true, false],
      [true, false, false, false, true, true, false, false, false, true, true, false, false, true, false],
      [true, true, true, true, true, false, false, false, false, false, true, false, false, true, true],
      [false, false, false, true, true, true, true, true, false, false, true, false, false, false, true],
      [false, false, false, false, false, false, true, true, true, true, true, true, false, false, true],
      [false, false, false, false, false, false, true, false, false, false, true, true, true, true, true],
      [false, false, false, false, false, true, true, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, true, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, true, true, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, true, false, false, false, false, false, false],
      [false, false, false, false, true, true, false, true, true, false, false, false, false, false, false],
      [false, true, true, false, false, true, true, true, false, false, true, false, true, true, false],
    ],
  },
  {
    name: "puppy",
    level: "hard",
    size: { rows: 15, columns: 15 },
    solution: [
      [false, false, false, true, true, true, true, true, false, false, false, false, false, false, false],
      [false, false, true, true, false, false, false, true, true, false, false, false, false, false, false],
      [false, true, true, false, false, false, false, false, true, true, false, false, false, true, false],
      [true, true, false, true, false, true, false, true, false, true, true, false, true, false, true],
      [true, false, true, false, false, false, false, true, false, false, true, false, true, false, true],
      [true, false, true, true, true, false, false, true, false, false, true, false, true, false, true],
      [true, false, true, false, false, false, true, true, false, false, true, true, false, true, false],
      [true, true, false, true, true, true, false, true, false, true, true, false, false, true, true],
      [false, false, false, false, true, false, false, false, true, true, false, false, false, false, true],
      [false, true, true, true, true, false, true, false, false, false, false, true, false, false, true],
      [true, true, false, true, true, true, false, false, true, true, true, false, false, false, true],
      [true, false, true, true, true, true, false, true, false, true, true, false, false, true, false],
      [true, true, false, false, false, true, false, true, false, false, true, true, false, true, false],
      [false, false, false, false, true, false, true, true, false, true, false, false, false, true, false],
      [false, false, false, false, true, true, true, false, false, true, true, true, true, true, false],
    ],
  },
  {
    name: "mermaid",
    level: "hard",
    size: { rows: 15, columns: 15 },
    solution: [
      [false, true, false, false, false, false, false, true, false, false, false, false, false, false, false],
      [false, true, true, false, true, true, true, true, false, false, false, false, false, false, false],
      [false, true, false, true, false, false, false, true, false, false, false, false, false, false, false],
      [false, false, true, true, true, true, true, false, false, false, false, false, false, false, false],
      [false, false, false, true, true, false, false, false, false, false, true, true, true, true, false],
      [false, false, true, false, true, false, false, false, false, false, true, true, false, true, false],
      [false, true, true, false, true, false, false, false, false, true, true, true, true, false, true],
      [true, false, false, true, false, false, false, false, true, true, true, true, false, false, true],
      [true, false, false, true, true, false, false, false, true, true, true, true, true, true, false],
      [true, false, true, false, true, true, false, false, true, true, false, false, false, true, false],
      [true, false, false, true, false, true, true, false, true, false, false, true, false, true, false],
      [true, true, false, false, false, false, false, true, false, false, false, true, false, true, false],
      [false, true, true, false, true, false, false, true, false, false, true, true, false, true, true],
      [false, false, true, true, false, false, false, true, true, true, false, true, false, false, false],
      [false, false, false, false, true, true, true, false, false, false, false, false, true, true, true],
    ],
  },
  {
    name: "bull",
    level: "hard",
    size: { rows: 15, columns: 15 },
    solution: [
      [false, false, true, true, true, true, true, false, false, true, true, true, true, false, false],
      [false, true, true, false, false, true, false, false, false, false, true, false, true, true, false],
      [true, true, false, true, true, false, false, false, false, false, false, true, false, true, true],
      [true, false, false, true, false, false, true, true, true, false, true, true, false, false, true],
      [true, true, false, false, true, true, true, true, false, true, true, false, false, true, true],
      [false, true, true, false, true, false, true, false, true, false, true, true, true, true, false],
      [false, true, true, true, false, false, false, false, false, false, false, true, true, false, false],
      [true, true, true, false, true, true, false, false, false, false, true, false, false, true, false],
      [true, false, false, false, true, true, true, false, false, true, true, true, false, false, true],
      [false, false, true, false, false, false, true, false, false, true, false, true, true, false, true],
      [true, true, true, true, false, false, true, false, false, true, false, true, false, true, true],
      [true, true, true, true, false, true, false, true, true, false, true, false, false, false, false],
      [true, true, true, false, true, false, true, true, true, true, true, false, false, false, false],
      [true, true, true, false, true, true, false, false, false, true, true, false, false, false, false],
      [true, true, false, false, false, true, true, true, true, true, false, false, false, false, false],
    ],
  },
];
const selectedPuzzle$1 = puzzles[0];
function createMain() {
  const page = document.createElement("main");
  page.className = "page";
  const pageContainer = document.createElement("div");
  pageContainer.className = "page__container game";
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(selectedPuzzle$1));
  page.appendChild(pageContainer);
  return page;
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
let timerInterval;
let timerSeconds = 0;
function startTimer(spanMinutes, spanSeconds) {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds += 1;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    spanMinutes.textContent = minutes.toString().padStart(2, "0");
    spanSeconds.textContent = seconds.toString().padStart(2, "0");
  }, 1e3);
}
function stopTimer() {
  clearInterval(timerInterval);
}
function resetTimer(spanMinutes, spanSeconds) {
  stopTimer();
  timerSeconds = 0;
  spanMinutes.textContent = "00";
  spanSeconds.textContent = "00";
}
function findPuzzleByName(name) {
  return puzzles.find((puzzle) => puzzle.name === name);
}
function updateGame(puzzle) {
  const gamePage = document.querySelector("main");
  gamePage.innerHTML = "";
  const pageContainer = document.createElement("div");
  pageContainer.className = "page__container game";
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(puzzle));
  gamePage.appendChild(pageContainer);
}
function clearCurrentGame() {
  cells.forEach((cell) => {
    cell.classList.remove("cross");
    cell.style.backgroundColor = "";
  });
}
function selectRandomPuzzle() {
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
}
function showSolution(puzzle) {
  const { solution } = puzzle;
  const cellsShow = document.querySelectorAll(".game-cell");
  let delay = 0;
  const delayIncrement = 40;
  solution.forEach((row, rowIndex) => {
    row.forEach((isFilled, colIndex) => {
      const cellIndex = rowIndex * row.length + colIndex;
      if (cellIndex < cellsShow.length) {
        setTimeout(() => {
          const cell = cellsShow[cellIndex];
          if (isFilled) {
            cell.style.backgroundColor = "black";
            cell.classList.remove("cross");
          } else {
            cell.style.backgroundColor = "";
            cell.classList.remove("cross");
          }
        }, delay);
        delay += delayIncrement;
      }
    });
  });
  setTimeout(() => {
    cellsShow.forEach((cell) => {
      cell.classList.add("blocked");
    });
    const saveButton = document.querySelector(".button-save");
    if (saveButton) {
      saveButton.disabled = true;
    }
  }, delay);
}
function checkSolution(gameState2, puzzle) {
  const { solution } = puzzle;
  for (let i = 0; i < gameState2.length; i += 1) {
    for (let j = 0; j < gameState2[i].length; j += 1) {
      const cellIsFilled = gameState2[i][j] === 1;
      if (cellIsFilled !== solution[i][j]) {
        return false;
      }
    }
  }
  return true;
}
function showWinMessage(spanMinutes, spanSeconds) {
  const minutes = parseInt(spanMinutes.textContent, 10);
  const seconds = parseInt(spanSeconds.textContent, 10);
  const totalSeconds = minutes * 60 + seconds;
  const winMessage = `Great! You have solved the nonogram in ${totalSeconds} seconds!`;
  const messageElement = document.createElement("div");
  messageElement.textContent = winMessage;
  messageElement.className = "win-message";
  const containerWinText = document.querySelector(".game__body");
  containerWinText.appendChild(messageElement);
  const audio = new Audio("./audio/win.mp3");
  audio.play();
  const cellsShow = document.querySelectorAll(".game-cell");
  cellsShow.forEach((cell) => {
    cell.classList.add("blocked");
  });
  const saveButton = document.querySelector(".button-save");
  if (saveButton) {
    saveButton.disabled = true;
  }
  return messageElement;
}
let isTimerStarted = false;
let isMusicPlaying = false;
const soundFiles = ["./audio/knopka-background.mp3", "./audio/knopka-cross.mp3", "./audio/empty.mp3"];
function handleButtonClickSounds() {
  isMusicPlaying = !isMusicPlaying;
  if (isMusicPlaying) {
    const audio = new Audio(soundFiles[2]);
    audio.play();
  } else {
    const audio = new Audio(soundFiles[2]);
    audio.pause();
  }
}
let audioFile;
function updateResultsTable(newResult) {
  let results = JSON.parse(localStorage.getItem("gameResults")) || [];
  results.unshift(newResult);
  results = results.filter((result) => result && result.stopWatch);
  results.forEach((result) => {
    const [minutes, seconds] = result.stopWatch.split(":").map(Number);
    result.timeInSeconds = minutes * 60 + seconds;
  });
  results.sort((a, b) => a.timeInSeconds - b.timeInSeconds);
  results = results.map(({ name, level, stopWatch }) => ({
    name,
    level,
    stopWatch,
  }));
  results = results.slice(0, 5);
  localStorage.setItem("gameResults", JSON.stringify(results));
  const tableBody = document.querySelector(".results-table tbody");
  results.forEach((result, index) => {
    let row = tableBody.rows[index];
    if (!row) {
      row = tableBody.insertRow();
    }
    const values = Object.values(result);
    values.forEach((value, cellIndex) => {
      let cell = row.cells[cellIndex];
      if (!cell) {
        cell = row.insertCell();
      }
      cell.textContent = value;
    });
  });
  while (tableBody.rows.length < 5) {
    const emptyRow = tableBody.insertRow();
    for (let i = 0; i < 3; i += 1) {
      emptyRow.insertCell().textContent = "";
    }
  }
}
function updateGameResults(result) {
  updateResultsTable(result);
}
function handleLeftClick(event, spanMinutes, spanSeconds, puzzle) {
  event.preventDefault();
  const cell = event.target;
  const row = parseInt(cell.dataset.row, 10);
  const column = parseInt(cell.dataset.column, 10);
  if (cell.classList.contains("cross")) {
    cell.classList.remove("cross");
    [, , audioFile] = soundFiles;
    cell.style.backgroundColor = "black";
    [audioFile] = soundFiles;
    gameState[row][column] = 1;
  } else if (cell.style.backgroundColor === "black") {
    cell.style.backgroundColor = "";
    [, , audioFile] = soundFiles;
    gameState[row][column] = 0;
  } else {
    cell.style.backgroundColor = "black";
    [audioFile] = soundFiles;
    gameState[row][column] = 1;
  }
  if (isMusicPlaying) {
    const audio = new Audio(audioFile);
    audio.play();
  }
  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }
  if (checkSolution(gameState, puzzle)) {
    showWinMessage(spanMinutes, spanSeconds);
    const newResult = {
      name: puzzle.name,
      level: puzzle.level,
      stopWatch: `${spanMinutes.textContent}:${spanSeconds.textContent}`,
    };
    updateGameResults(newResult);
    stopTimer();
  }
}
function handleRightClick(event, spanMinutes, spanSeconds, puzzle) {
  event.preventDefault();
  const cell = event.target;
  const row = parseInt(cell.dataset.row, 10);
  const column = parseInt(cell.dataset.column, 10);
  if (cell.style.backgroundColor === "black") {
    cell.style.backgroundColor = "";
    [, , audioFile] = soundFiles;
    cell.classList.add("cross");
    [, audioFile] = soundFiles;
    gameState[row][column] = 2;
  } else if (cell.classList.contains("cross")) {
    cell.classList.remove("cross");
    [, , audioFile] = soundFiles;
    gameState[row][column] = 0;
  } else {
    cell.classList.add("cross");
    [, audioFile] = soundFiles;
    gameState[row][column] = 2;
  }
  if (isMusicPlaying) {
    const audio = new Audio(audioFile);
    audio.play();
  }
  if (!isTimerStarted) {
    startTimer(spanMinutes, spanSeconds);
    isTimerStarted = true;
  }
  if (checkSolution(gameState, puzzle)) {
    showWinMessage(spanMinutes, spanSeconds);
    const newResult = {
      name: puzzle.name,
      level: puzzle.level,
      stopWatch: `${spanMinutes.textContent}:${spanSeconds.textContent}`,
    };
    updateGameResults(newResult);
    stopTimer();
  }
}
const selectedPuzzle = puzzles[0];
function handleNewGame() {
  const gamePage = document.querySelector("main");
  gamePage.innerHTML = "";
  const pageContainer = document.createElement("div");
  pageContainer.className = "page__container game";
  pageContainer.appendChild(createGameHandling());
  pageContainer.appendChild(createGameBody(selectedPuzzle));
  gamePage.appendChild(pageContainer);
  isTimerStarted = false;
  const event = new CustomEvent("newGameStarted", { detail: selectedPuzzle });
  document.dispatchEvent(event);
}
function resetIsTimerStarted() {
  isTimerStarted = false;
}
function initCellInteractive(cells2, spanMinutes, spanSeconds, puzzle) {
  cells2.forEach((cell) => {
    cell.addEventListener("click", (event) => handleLeftClick(event, spanMinutes, spanSeconds, puzzle));
    cell.addEventListener("contextmenu", (event) => handleRightClick(event, spanMinutes, spanSeconds, puzzle));
  });
}
function createToggleTheme() {
  const toggleButton = document.querySelector(".button-toggle");
  toggleButton.addEventListener("click", function clickToggleTheme() {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}
const gameData = {
  gameLoadState: null,
  // состояние игры для загрузки
  gameName: null,
  // название игры для загрузки и таблицы результатов
  gameLevel: null,
  // уровень игры для таблицы результатов
  gameTime: null,
  // время игры для таблицы результатов
  gameSize: null,
  // размер поля для загрузки
  gameSolution: null,
  // решение для загрузки подсказок
};
function setGameData(currentgameLoadState, currentGameName, currentLevel, currentTime, currentSize, currentSolution) {
  gameData.gameLoadState = currentgameLoadState;
  gameData.gameName = currentGameName;
  gameData.gameLevel = currentLevel;
  gameData.gameTime = currentTime;
  gameData.gameSize = currentSize;
  gameData.gameSolution = currentSolution;
}
function saveGame(currentgameLoadState, currentGameName, currentLevel, currentTime, currentSize, currentSolution) {
  setGameData(currentgameLoadState, currentGameName, currentLevel, currentTime, currentSize, currentSolution);
  localStorage.setItem("savedGame", JSON.stringify(gameData));
}
function loadGame() {
  const savedGame = localStorage.getItem("savedGame");
  return savedGame ? JSON.parse(savedGame) : null;
}
document.addEventListener("DOMContentLoaded", function onDOMContentLoaded() {
  const wrapper = document.createElement("div");
  wrapper.className = "wrapper";
  document.body.appendChild(wrapper);
  wrapper.appendChild(createHeader());
  wrapper.appendChild(createMain());
  wrapper.appendChild(createFooter());
  function getTimerElements() {
    return {
      spanMinutes: document.querySelector(".timer__minutes"),
      spanSeconds: document.querySelector(".timer__seconds"),
    };
  }
  const { spanMinutes, spanSeconds } = getTimerElements();
  let currentPuzzleSolution = selectedPuzzle$1;
  function clearGameState() {
    gameState.length = 0;
  }
  function clearGameCells() {
    cells.length = 0;
  }
  document.addEventListener("newGameStarted", function ff(e) {
    currentPuzzleSolution = e.detail;
  });
  initCellInteractive(cells, spanMinutes, spanSeconds, currentPuzzleSolution);
  updateResultsTable();
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  createToggleTheme();
  wrapper.addEventListener("click", function wrapperClick(event) {
    let targetElement = event.target;
    if (targetElement === event.target.closest(".button-clear")) {
      clearCurrentGame();
    }
    if (targetElement === event.target.closest(".button-sound")) {
      handleButtonClickSounds();
      const activeSound = targetElement;
      activeSound.classList.toggle("active-sound");
    }
    if (targetElement === event.target.closest(".button-save")) {
      const timerElements = getTimerElements();
      const currentGameName = currentPuzzleSolution.name;
      const currentLevel = currentPuzzleSolution.level;
      const currentSize = currentPuzzleSolution.size;
      const currentSolution = currentPuzzleSolution.solution;
      const currentTime = `${timerElements.spanMinutes.textContent}:${timerElements.spanSeconds.textContent}`;
      saveGame(gameState, currentGameName, currentLevel, currentTime, currentSize, currentSolution);
    }
    if (targetElement === event.target.closest(".button-load-game")) {
      const loadedGame = loadGame();
      if (loadedGame) {
        const { gameLoadState, gameName, gameLevel, gameTime, gameSize, gameSolution } = loadedGame;
        const currentPuzzleSolutionSave = {
          name: gameName,
          level: gameLevel,
          size: gameSize,
          solution: gameSolution,
        };
        clearGameState();
        clearGameCells();
        updateGame(currentPuzzleSolutionSave);
        updateResultsTable();
        gameLoadState.forEach((row, rowIndex) => {
          row.forEach((cellState, columnIndex) => {
            const index = rowIndex * gameLoadState[0].length + columnIndex;
            const cell = cells[index];
            if (cell) {
              if (cellState === 1) {
                cell.style.backgroundColor = "black";
              } else if (cellState === 2) {
                cell.classList.add("cross");
              } else {
                cell.style.backgroundColor = "";
              }
            }
          });
        });
      } else {
        alert("Saved game not found.");
      }
    }
    if (targetElement === event.target.closest(".button-new-game")) {
      clearCurrentGame();
      resetTimer(spanMinutes, spanSeconds);
      clearGameState();
      handleNewGame();
      updateResultsTable();
      const timerElements = getTimerElements();
      resetTimer(spanMinutes, spanSeconds);
      resetIsTimerStarted();
      initCellInteractive(cells, timerElements.spanMinutes, timerElements.spanSeconds, currentPuzzleSolution);
      createToggleTheme();
    }
    if (targetElement === event.target.closest(".button-random-game")) {
      const randomPuzzle = selectRandomPuzzle();
      clearGameState();
      updateGame(randomPuzzle);
      updateResultsTable();
      currentPuzzleSolution = randomPuzzle;
      const timerElements = getTimerElements();
      resetTimer(spanMinutes, spanSeconds);
      resetIsTimerStarted();
      initCellInteractive(cells, timerElements.spanMinutes, timerElements.spanSeconds, currentPuzzleSolution);
      createToggleTheme();
    }
    if (targetElement === event.target.closest(".button-solution")) {
      showSolution(currentPuzzleSolution);
      resetTimer(spanMinutes, spanSeconds);
    }
    while (targetElement != null && !targetElement.classList.contains("game__items")) {
      targetElement = targetElement.parentElement;
    }
    if (targetElement != null && targetElement.classList.contains("game__items")) {
      const nameContent = targetElement.querySelector(".name-content");
      const liContents = targetElement.querySelectorAll(".name-content__item");
      if (nameContent) {
        nameContent.classList.toggle("block");
      }
      if (liContents) {
        liContents.forEach((content) => {
          content.addEventListener("click", function contentUpdate() {
            const puzzleName = content.textContent;
            const puzzleNameChoice = findPuzzleByName(puzzleName);
            currentPuzzleSolution = puzzleNameChoice;
            clearGameState();
            updateGame(puzzleNameChoice);
            updateResultsTable();
            const timerElements = getTimerElements();
            resetTimer(spanMinutes, spanSeconds);
            resetIsTimerStarted();
            initCellInteractive(cells, timerElements.spanMinutes, timerElements.spanSeconds, currentPuzzleSolution);
            createToggleTheme();
          });
        });
      }
    }
  });
  document.addEventListener("click", function closeButtonsChoice(event) {
    const buttonsChoice = document.querySelectorAll(".button-choice");
    buttonsChoice.forEach((button) => {
      const nameContent = button.nextElementSibling;
      if (!button.contains(event.target) && nameContent && !nameContent.contains(event.target)) {
        nameContent.classList.remove("block");
      }
    });
  });
});
