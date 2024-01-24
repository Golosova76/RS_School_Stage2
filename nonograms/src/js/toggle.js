function createToggleTheme() {
  const toggleButton = document.querySelector('.button-toggle');

  toggleButton.addEventListener('click', function clickToggleTheme() {
    document.body.classList.toggle('dark');
  });
}

export default createToggleTheme;
