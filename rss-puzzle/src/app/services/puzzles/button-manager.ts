import ButtonComponent from '../../components/button/button';
import { Component, InterComponent } from '../../components/base-component';

// Определяем интерфейс, описывающий необходимые методы
export interface InterGameBlockPuzzles {
  getGameButtonContinue(): ButtonComponent | null;
  getGameButtonCheck(): ButtonComponent | null;
  gameWords: Component<InterComponent>[];
}

class ButtonsGameManager {
  private gameBlockPuzzles: InterGameBlockPuzzles;

  constructor(gameBlockPuzzles: InterGameBlockPuzzles) {
    this.gameBlockPuzzles = gameBlockPuzzles;
  }

  enableContinueButton() {
    const gameButtonContinue = this.gameBlockPuzzles.getGameButtonContinue();
    if (gameButtonContinue) {
      const buttonElement = gameButtonContinue.getNode() as HTMLButtonElement;
      if (buttonElement) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.add('continue-effect');
      }
    }
  }

  enableCheckButton() {
    const gameButtonCheck = this.gameBlockPuzzles.getGameButtonCheck();
    if (gameButtonCheck) {
      const buttonElement = gameButtonCheck.getNode() as HTMLButtonElement;
      if (buttonElement) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.add('continue-effect');
      }
    }
  }
}

export default ButtonsGameManager;
