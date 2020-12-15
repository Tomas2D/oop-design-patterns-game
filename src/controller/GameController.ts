import { isSpacebar } from '~utils';
import IGameModel from '~proxy/IGameModel';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { MoveCannonDown } from '~command/MoveCannonDown';
import { AimCannonUp } from '~command/AimCannonUp';
import { CannonPowerUp } from '~command/CannonPowerUp';
import { CannonPowerDown } from '~command/CannonPowerDown';
import { AimCannonDown } from '~command/AimCannonDown';
import { CannonShoot } from '~command/CannonShoot';

const keysForPressing = ['KeyP', 'KeyW', 'Space', 'KeyU', 'KeyI', 'KeyB'];

class GameController {
  private readonly model: IGameModel;
  private pressedKeys: string[] = [];

  constructor(model: IGameModel) {
    this.model = model;
    this.handleKeyPress();
  }

  /**
   * Make action based on inputs in queue
   */
  processUserInput() {
    this.pressedKeys.forEach(key => {
      if (isSpacebar(key)) {
        this.model.registerCommand(new CannonShoot(this.model));
        return;
      }

      switch (key) {
        case 'ArrowUp':
          this.model.registerCommand(new MoveCannonUp(this.model));
          break;
        case 'ArrowDown':
          this.model.registerCommand(new MoveCannonDown(this.model));
          break;
        case 'Numpad8':
          this.model.registerCommand(new AimCannonUp(this.model));
          break;
        case 'Numpad2':
          this.model.registerCommand(new AimCannonDown(this.model));
          break;
        case 'KeyQ':
          this.model.registerCommand(new CannonPowerUp(this.model));
          break;
        case 'KeyW':
          this.model.registerCommand(new CannonPowerDown(this.model));
          break;
        case 'KeyU':
          this.model.cannonPowerUp();
          break;
        case 'KeyI':
          this.model.cannonPowerDown();
          break;
        case 'KeyP':
          this.model.cannonToggleShootingMode();
          break;
        case 'KeyB':
          this.model.undoLastCommand();
          break;
      }
    });

    this.pressedKeys = this.pressedKeys.filter(key => !keysForPressing.includes(key));
  }

  /**
   * Process user input
   */
  private handleKeyPress() {
    window.addEventListener(
      'keydown',
      e => {
        if (!this.pressedKeys.includes(e.code)) {
          this.pressedKeys.push(e.code);
        }
      },
      false,
    );
    window.addEventListener(
      'keyup',
      e => {
        this.pressedKeys = this.pressedKeys.filter(key => key !== e.code);
      },
      false,
    );

    // Single press
    /*window.addEventListener(
      'keypress',
      e => {
        if (keysForPressing.includes(e.code) && !this.pressedKeys.includes(e.code)) {
          this.pressedKeys.push(e.code);
        }
      },
      false,
    );*/
  }
}

export default GameController;
