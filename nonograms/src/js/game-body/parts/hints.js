const MAX_HINTS = 5;

function createTopHints(size) {
  const topHints = document.createElement('div');
  topHints.className = 'game__hints top-hints';

  // hints только 5! в каждом столбце!
  for (let i = 0; i < MAX_HINTS; i += 1) {
    const topHintRow = document.createElement('div');
    topHintRow.className = 'top-hints-row';

    for (let j = 0; j < size.columns; j += 1) {
      const hintCell = document.createElement('div');
      hintCell.className = 'hint-cell top-hint';
      hintCell.textContent = ''; // пусто
      topHintRow.appendChild(hintCell);
    }

    topHints.appendChild(topHintRow);
  }
  return topHints;
}

function createLeftHints(size) {
  const leftHints = document.createElement('div');
  leftHints.className = 'hints-cell left-hints';

  for (let i = 0; i < size.rows; i += 1) {
    const leftHintRow = document.createElement('div');
    leftHintRow.className = 'left-hints-row';

    // hints только 5! в каждой строке!
    for (let j = 0; j < MAX_HINTS; j += 1) {
      const hintCell = document.createElement('div');
      hintCell.className = 'hint-cell left-hint';
      hintCell.textContent = ''; // пусто
      leftHintRow.appendChild(hintCell);
    }

    leftHints.appendChild(leftHintRow);
  }
  return leftHints;
}

export { createTopHints, createLeftHints };
