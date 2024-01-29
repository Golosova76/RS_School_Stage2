function createGameChoice() {
  const gameChoiceDiv = document.createElement('div');
  gameChoiceDiv.className = 'game__choice';

  const levels = [
    {
      level: 'easy',
      items: ['pushchair', 'heart', 'cockerel', 'camel', 'tetris'],
    },
    {
      level: 'medium',
      items: ['cat', 'dog', 'rabbit', 'duckling', 'jellyfish'],
    },
    { level: 'hard', items: ['bunny', 'umbrella', 'puppy', 'mermaid', 'bull'] },
  ];

  const buttonsChoice = [];
  const listItemsChoice = [];

  levels.forEach(({ level, items }) => {
    const gameItemsDiv = document.createElement('div');
    gameItemsDiv.className = `game__items ${level}`;

    const button = document.createElement('button');
    button.className = `button-choice ${level} button`;
    button.textContent = `${level} ${items.length}x${items.length}`;
    buttonsChoice.push(button);
    gameItemsDiv.appendChild(button);

    const ulChoice = document.createElement('ul');
    ulChoice.className = 'name-content';
    // ul.style.display = 'none'; // Скрыть список по умолчанию

    items.forEach((item) => {
      const liChoice = document.createElement('li');
      liChoice.className = 'name-content__item';
      liChoice.textContent = item;
      listItemsChoice.push(liChoice);
      ulChoice.appendChild(liChoice);
    });

    gameItemsDiv.appendChild(ulChoice);
    gameChoiceDiv.appendChild(gameItemsDiv);
  });

  return {
    gameChoiceDiv,
    buttonsChoice,
    listItemsChoice,
  };
}

export default createGameChoice;
