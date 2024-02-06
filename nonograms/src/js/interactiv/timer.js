let timerInterval;
let timerSeconds = 0;

function startTimer(spanMinutes, spanSeconds) {
  clearInterval(timerInterval); // очистка предыдущего интервала
  timerInterval = setInterval(() => {
    timerSeconds += 1;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    // eslint-disable-next-line no-param-reassign
    spanMinutes.textContent = minutes.toString().padStart(2, '0');
    // eslint-disable-next-line no-param-reassign
    spanSeconds.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer(spanMinutes, spanSeconds) {
  stopTimer();
  timerSeconds = 0;
  // eslint-disable-next-line no-param-reassign
  spanMinutes.textContent = '00';
  // eslint-disable-next-line no-param-reassign
  spanSeconds.textContent = '00';
}

function continueTimer(spanMinutes, spanSeconds, initialSeconds) {
  stopTimer(); // Останавливаем текущий таймер, если он запущен
  timerSeconds = initialSeconds; // Устанавливаем начальное время из LS

  timerInterval = setInterval(() => {
    timerSeconds += 1;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    // eslint-disable-next-line no-param-reassign
    spanMinutes.textContent = minutes.toString().padStart(2, '0');
    // eslint-disable-next-line no-param-reassign
    spanSeconds.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

export { startTimer, stopTimer, resetTimer, continueTimer };
