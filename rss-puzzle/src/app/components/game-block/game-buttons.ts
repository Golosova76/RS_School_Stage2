import { Component, InterComponent } from '../base-component';
import ButtonComponent from '../button/button';

class GameBlockButtons extends Component<InterComponent> {
  public gameButtonContinue: ButtonComponent | null = null;

  public gameButtonCheck: ButtonComponent | null = null;

  constructor() {
    super({ tag: 'div', className: 'game__buttons' });
    this.createGameBlockButtonsComponents();
  }

  private createGameBlockButtonsComponents() {
    // кнопка Continue
    const gameButtonContinue = new ButtonComponent({
      className: 'continue-button',
      text: 'Continue',
      type: 'button',
      disabled: true,
    });
    this.append(gameButtonContinue);
    this.gameButtonContinue = gameButtonContinue;

    // кнопка Continue
    const gameButtonCheck = new ButtonComponent({
      className: 'check-button',
      text: 'Check',
      type: 'button',
      disabled: true,
    });
    this.append(gameButtonCheck);
    this.gameButtonCheck = gameButtonCheck;
  }

  public getGameButtonContinue(): ButtonComponent | null {
    return this.gameButtonContinue;
  }

  public getGameButtonCheck(): ButtonComponent | null {
    return this.gameButtonCheck;
  }
}

export default GameBlockButtons;
