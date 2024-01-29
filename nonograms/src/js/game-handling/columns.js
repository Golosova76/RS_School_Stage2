function createGameColumns() {
  // first column
  const columnTimeToggle = document.createElement('div');
  columnTimeToggle.className = 'game__column';

  const timerDiv = document.createElement('div');
  timerDiv.className = 'game__timer timer';

  const spanMinutes = document.createElement('span');
  spanMinutes.className = 'timer__minutes';
  spanMinutes.textContent = '00';

  const spanSeconds = document.createElement('span');
  spanSeconds.className = 'timer__seconds';
  spanSeconds.textContent = '00';

  timerDiv.appendChild(spanMinutes);
  timerDiv.appendChild(document.createTextNode(':'));
  timerDiv.appendChild(spanSeconds);

  const toggleDiv = document.createElement('div');
  toggleDiv.className = 'game__toggle';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'button-toggle button';
  toggleButton.type = 'text';
  toggleButton.textContent = 'toggle theme';

  toggleDiv.appendChild(toggleButton);

  columnTimeToggle.appendChild(timerDiv);
  columnTimeToggle.appendChild(toggleDiv);

  // second column
  const columnButtonsThree = document.createElement('div');
  columnButtonsThree.className = 'game__column';

  const buttonsThree = ['clear', 'save', 'sound'];
  buttonsThree.forEach((buttonText) => {
    const button = document.createElement('button');
    button.className = `button-${buttonText} button`;
    button.textContent = buttonText;
    columnButtonsThree.appendChild(button);
  });

  // third column
  const columnButtonsFour = document.createElement('div');
  columnButtonsFour.className = 'game__column';

  const buttonsFour = ['new game', 'random game', 'load game', 'solution'];
  buttonsFour.forEach((buttonText) => {
    const button = document.createElement('button');
    button.className = `button-${buttonText.replace(' ', '-')} button`;
    button.textContent = buttonText;
    columnButtonsFour.appendChild(button);
  });

  return {
    columns: [columnTimeToggle, columnButtonsThree, columnButtonsFour],
    timerMinutes: spanMinutes,
    timerSeconds: spanSeconds,
    toggleButton,
    clearButton: columnButtonsThree.querySelector('.button-clear'),
    saveButton: columnButtonsThree.querySelector('.button-save'),
    soundButton: columnButtonsThree.querySelector('.button-sound'),
    newGameButton: columnButtonsFour.querySelector('.button-new'),
    randomGameButton: columnButtonsFour.querySelector('.button-random'),
    loadGameButton: columnButtonsFour.querySelector('.button-load'),
    solutionGameButton: columnButtonsFour.querySelector('.button-solution'),
  };
}

export default createGameColumns;
