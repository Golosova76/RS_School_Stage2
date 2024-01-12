import { createWordsSection } from './words';
import createKeyboard from './keyboard';

function createBody() {
  const wordBody = document.createElement('div');
  wordBody.className = 'game__body';

  wordBody.appendChild(createWordsSection());
  wordBody.appendChild(createKeyboard());

  return wordBody;
}

export default createBody;
