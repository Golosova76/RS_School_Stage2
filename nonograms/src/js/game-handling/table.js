function createScoreTable() {
  const gameTableDiv = document.createElement('div');
  gameTableDiv.className = 'game__table';

  const tableScore = document.createElement('table');
  tableScore.className = 'results-table';

  const headerTable = document.createElement('thead');
  const lineTable = document.createElement('tr');
  const titleTableName = document.createElement('th');
  titleTableName.textContent = 'name';
  const titleTableLevel = document.createElement('th');
  titleTableLevel.textContent = 'level';
  const titleTableStopWatch = document.createElement('th');
  titleTableStopWatch.textContent = 'stop-watch';

  // собираем thead
  lineTable.appendChild(titleTableName);
  lineTable.appendChild(titleTableLevel);
  lineTable.appendChild(titleTableStopWatch);
  headerTable.appendChild(lineTable);

  const bodyTable = document.createElement('tbody');

  const rowsData = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  rowsData.forEach((rowData) => {
    const tr = document.createElement('tr');
    rowData.forEach((cellData) => {
      const td = document.createElement('td');
      td.textContent = cellData;
      tr.appendChild(td);
    });
    bodyTable.appendChild(tr);
  });

  // собираем table
  tableScore.appendChild(headerTable);
  tableScore.appendChild(bodyTable);

  gameTableDiv.appendChild(tableScore);

  return gameTableDiv;
}

export default createScoreTable;
