import bodyParts from './body-part';

function createGallows() {
  const gallows = document.createElement('div');
  gallows.className = 'game__gallows gallow';

  const combinedElements = [
    'post',
    'beam',
    'support',
    'noose',
    'bottom',
    ...Object.keys(bodyParts),
  ];

  combinedElements.forEach((element) => {
    const div = document.createElement('div');
    div.className = `gallow__${element}`;

    if (bodyParts[element]) {
      div.innerHTML = bodyParts[element]; // Установка SVG для частей тела
      div.style.visibility = 'hidden';
    }

    gallows.appendChild(div);
  });

  return gallows;
}

export default createGallows;
