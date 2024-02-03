function createToggleTheme() {
  const toggleButton = document.querySelector('.button-toggle');

  toggleButton.addEventListener('click', function clickToggleTheme() {
    document.body.classList.toggle('dark');
    // Сохраняем выбранную тему в localStorage
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

export default createToggleTheme;
