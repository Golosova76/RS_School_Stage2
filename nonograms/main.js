import '@styles/style.scss';
// import createHeader from '@js/header.js';
// import createMain from '@js/page';
// import createFooter from '@js/footer.js';
import createToggleTheme from '@js/toggle';

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.appendChild(wrapper);

  createToggleTheme();

  // wrapper.appendChild(createHeader());
  // wrapper.appendChild(createMain());
  // wrapper.appendChild(createFooter());

  /*
  const toggleButton = document.querySelector('.button-toggle');
  console.log(toggleButton);

  toggleButton.addEventListener('click', function fg() {
    document.body.classList.toggle('dark');
  });
  */
});
