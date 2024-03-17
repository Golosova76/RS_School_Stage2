import { Component, InterComponent } from '../base-component';
import ButtonComponent from '../button/button';

class GameBlockButtons extends Component<InterComponent> {
  public gameButtonContinue: ButtonComponent | null = null;

  constructor() {
    super({ tag: 'div', className: 'game__buttons' });
    this.createGameBlockButtonsComponents();
  }

  private createGameBlockButtonsComponents() {
    // кнопка Continue
    const gameButtonContinue = new ButtonComponent({
      className: 'continue-button',
      text: 'continue',
      type: 'button',
      disabled: true,
    });
    this.append(gameButtonContinue);
    this.gameButtonContinue = gameButtonContinue;
  }

  public getGameButtonContinue(): ButtonComponent | null {
    return this.gameButtonContinue;
  }
}

export default GameBlockButtons;
