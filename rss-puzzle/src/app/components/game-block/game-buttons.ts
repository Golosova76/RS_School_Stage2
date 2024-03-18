import { Component, InterComponent } from '../base-component';
import ButtonComponent from '../button/button';
import EventEmitter from '../../utils/event-emitter';

class GameBlockButtons extends Component<InterComponent> {
  public gameButtonContinue: ButtonComponent | null = null;

  public gameButtonCheck: ButtonComponent | null = null;

  public gameButtonAuto: ButtonComponent | null = null;

  public gameButtonLogout: ButtonComponent | null = null;

  constructor() {
    super({ tag: 'div', className: 'game__buttons' });
    this.createGameBlockButtonsComponents();
  }

  private createGameBlockButtonsComponents() {
    // кнопка Auto-Complete
    const gameButtonAuto = new ButtonComponent({
      className: 'auto-button button',
      text: 'Auto-Complete',
      type: 'button',
    });
    this.append(gameButtonAuto);
    this.gameButtonAuto = gameButtonAuto;

    // кнопка Continue
    const gameButtonContinue = new ButtonComponent({
      className: 'continue-button button',
      text: 'Continue',
      type: 'button',
      disabled: true,
    });
    this.append(gameButtonContinue);
    this.gameButtonContinue = gameButtonContinue;

    // кнопка Continue
    const gameButtonCheck = new ButtonComponent({
      className: 'check-button button',
      text: 'Check',
      type: 'button',
      disabled: true,
    });
    this.append(gameButtonCheck);
    this.gameButtonCheck = gameButtonCheck;

    // кнопка Continue
    const gameButtonLogout = new ButtonComponent({
      className: 'logout-button button',
      text: 'Logout',
      type: 'button',
      onClick: () => {
        EventEmitter.emit('logout');
      },
    });
    this.append(gameButtonLogout);
    this.gameButtonLogout = gameButtonLogout;
  }

  public getGameButtonContinue(): ButtonComponent | null {
    return this.gameButtonContinue;
  }

  public getGameButtonCheck(): ButtonComponent | null {
    return this.gameButtonCheck;
  }

  public getGameButtonAuto(): ButtonComponent | null {
    return this.gameButtonAuto;
  }

  public getGameButtonLogout(): ButtonComponent | null {
    return this.gameButtonLogout;
  }
}

export default GameBlockButtons;
