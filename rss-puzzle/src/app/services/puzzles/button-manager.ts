import ButtonComponent from '../../components/button/button';

// Определяем интерфейс, описывающий необходимые методы
interface IGameBlockPuzzles {
  getGameButtonContinue(): ButtonComponent | null;
  getGameButtonCheck(): ButtonComponent | null;
}

class ButtonsGameManager {
  private gameBlockPuzzles: IGameBlockPuzzles;

  constructor(gameBlockPuzzles: IGameBlockPuzzles) {
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
