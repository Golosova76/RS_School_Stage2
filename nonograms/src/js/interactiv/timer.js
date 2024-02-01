/*
let timerInterval;
let timerSeconds = 0;

function startTimer(spanMinutes, spanSeconds) {
  timerInterval = setInterval(() => {
    timerSeconds += 1;
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    spanMinutes.textContent = minutes.toString().padStart(2, '0');
    spanSeconds.textContent = seconds.toString().padStart(2, '0');
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer(spanMinutes, spanSeconds) {
  stopTimer();
  timerSeconds = 0;
  spanMinutes.textContent = '00';
  spanSeconds.textContent = '00';
}

export { startTimer, stopTimer, resetTimer };
*/
