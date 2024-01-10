import createWordsSection from './words';

function createBody() {
  const wordBody = document.createElement('div');
  wordBody.className = 'game__body';

  wordBody.appendChild(createWordsSection());

  return wordBody;
}

export default createBody;
