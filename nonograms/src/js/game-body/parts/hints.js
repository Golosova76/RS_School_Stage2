function createTopHints(size, topHintsData) {
  const topHints = document.createElement('div');
  topHints.className = 'game__hints top-hints';

  // Находим макс кол-во hints (length) в столбце, чтобы определить кол-во рядов
  const maxHints = Math.max(...topHintsData.map((col) => col.length));

  // генерация top hints
  for (let rowIndex = 0; rowIndex < maxHints; rowIndex += 1) {
    const topHintRow = document.createElement('div');
    topHintRow.className = 'top-hints-row';

    // Для каждого столбца создаем ячейку hints
    for (let colIndex = 0; colIndex < size.columns; colIndex += 1) {
      const hintCell = document.createElement('div');
      hintCell.className = 'hint-cell top-hint';

      // массив hints для текущего столбца
      const columnHints = topHintsData[colIndex];

      // Если текущий ряд выше чем кол-во hints в столбце, добавляем пустую ячейку
      if (rowIndex < maxHints - columnHints.length) {
        hintCell.textContent = '';
      } else {
        // добавляем число из hints
        const hintIndex = rowIndex - (maxHints - columnHints.length);
        hintCell.textContent = columnHints[hintIndex];
      }

      topHintRow.appendChild(hintCell);
    }

    topHints.appendChild(topHintRow);
  }

  return topHints;
}

function createLeftHints(size, leftHintsData) {
  const leftHints = document.createElement('div');
  leftHints.className = 'hints-cell left-hints';

  // генерация left hints
  for (let rowIndex = 0; rowIndex < size.rows; rowIndex += 1) {
    const leftHintRow = document.createElement('div');
    leftHintRow.className = 'left-hints-row';

    // массив hints для текущей строки
    const rowHints = leftHintsData[rowIndex];

    // ННаходим макс кол-во hints (length) в ряду, чтобы определить кол-во ячеек
    const maxHints = Math.max(...leftHintsData.map((row) => row.length));

    // Если в ряду меньше hints, чем maxHints, добавляем пустые ячейки для выравнивания
    for (let i = 0; i < maxHints - rowHints.length; i += 1) {
      const hintCell = document.createElement('div');
      hintCell.className = 'hint-cell left-hint';
      hintCell.textContent = '';
      leftHintRow.appendChild(hintCell);
    }

    // Заполняем ячейки данными hints
    for (let hintIndex = 0; hintIndex < rowHints.length; hintIndex += 1) {
      const hintCell = document.createElement('div');
      hintCell.className = 'hint-cell left-hint';
      hintCell.textContent = rowHints[hintIndex];
      leftHintRow.appendChild(hintCell);
    }

    leftHints.appendChild(leftHintRow);
  }

  return leftHints;
}

export { createTopHints, createLeftHints };
