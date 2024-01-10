function createGallows() {
  const gallows = document.createElement('div');
  gallows.className = 'game__gallows gallow';

  const elements = ['post', 'beam', 'support', 'noose', 'bottom'];

  elements.forEach((element) => {
    const div = document.createElement('div');
    div.className = `gallow__${element}`;
    gallows.appendChild(div);
  });

  const parts = [
    'head',
    'body',
    'left-arm',
    'right-arm',
    'left-leg',
    'right-leg',
  ];

  parts.forEach((part) => {
    const partDiv = document.createElement('div');
    partDiv.className = `gallow__${part}`;
    gallows.appendChild(partDiv);
  });

  return gallows;
}

export default createGallows;
