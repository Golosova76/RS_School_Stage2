function generateHints(solution) {
  // генерация левых подсказок для каждой строки
  const leftHints = solution.map((row) => {
    return row
      .reduce((hints, cell) => {
        if (cell) {
          if (!hints.length || hints[hints.length - 1].ended) {
            hints.push({ count: 1, ended: false });
          } else {
            // eslint-disable-next-line no-param-reassign
            hints[hints.length - 1].count += 1;
          }
        } else if (hints.length && !hints[hints.length - 1].ended) {
          // eslint-disable-next-line no-param-reassign
          hints[hints.length - 1].ended = true;
        }
        return hints;
      }, [])
      .map((hint) => hint.count); // только закрашенные
  });

  // генерация правых подсказок для каждого столбца
  const topHints = Array.from({ length: solution[0].length }, (_, col) => {
    return solution
      .reduce((hints, row) => {
        const cell = row[col];
        if (cell) {
          if (!hints.length || hints[hints.length - 1].ended) {
            hints.push({ count: 1, ended: false });
          } else {
            // eslint-disable-next-line no-param-reassign
            hints[hints.length - 1].count += 1;
          }
        } else if (hints.length && !hints[hints.length - 1].ended) {
          // eslint-disable-next-line no-param-reassign
          hints[hints.length - 1].ended = true;
        }
        return hints;
      }, [])
      .map((hint) => hint.count); // только закрашенные
  });

  return { topHints, leftHints };
}

export default generateHints;
