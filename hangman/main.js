import '@styles/style.scss';
import createHeader from '@js/header.js';
import createFooter from '@js/footer.js';
import createMain from '@js/main-page/page';

document.addEventListener('DOMContentLoaded', function onDOMContentLoaded() {
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  document.body.appendChild(wrapper);

  wrapper.appendChild(createHeader());
  wrapper.appendChild(createMain());
  wrapper.appendChild(createFooter());
  console.log(wrapper.innerHTML);
});
