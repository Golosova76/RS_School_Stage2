function showWinMessage(spanMinutes, spanSeconds) {
  const minutes = parseInt(spanMinutes.textContent, 10);
  const seconds = parseInt(spanSeconds.textContent, 10);
  const totalSeconds = minutes * 60 + seconds;

  const winMessage = `Great! You have solved the nonogram in ${totalSeconds} seconds!`;

  // Создание сообщения и добавление его на страницу
  const messageElement = document.createElement('div');
  messageElement.textContent = winMessage;
  messageElement.className = 'win-message';
  const containerWinText = document.querySelector('.game__body');
  containerWinText.appendChild(messageElement);

  const audio = new Audio('/audio/win.mp3');
  audio.play();

  const cellsShow = document.querySelectorAll('.game-cell');
  // Блокируем все ячейки после показа решения
  cellsShow.forEach((cell) => {
    cell.classList.add('blocked');
  });

  // блокируем кнопку save
  const saveButton = document.querySelector('.button-save');
  if (saveButton) {
    saveButton.disabled = true;
  }

  return messageElement;
}

export default showWinMessage;
