import bodyParts from './body-part';

function createGallows() {
  const gallows = document.createElement('div');
  gallows.className = 'game__gallows gallow';

  const elements = ['post', 'beam', 'support', 'noose', 'bottom'];

  elements.forEach((element) => {
    const div = document.createElement('div');
    div.className = `gallow__${element}`;
    gallows.appendChild(div);
  });

  Object.entries(bodyParts).forEach(([part, svg]) => {
    const partDiv = document.createElement('div');
    partDiv.className = `gallow__${part}`;
    partDiv.innerHTML = svg; // Установка SVG кода
    partDiv.style.visibility = 'hidden';
    gallows.appendChild(partDiv);
  });

  return gallows;
}

export default createGallows;
