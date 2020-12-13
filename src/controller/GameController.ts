import { getMoveDirection, isSpacebar } from '../utils';
import IGameModel from '~interface/proxy/IGameModel';
import { MoveDirection } from '~entity/abstract/GameObject';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { MoveCannonDown } from '~command/MoveCannonDown';
import CareTaker from '~memento/CareTaker';

const keysForPressing = ['KeyP', 'KeyW', 'Space'];

class GameController {
  private model: IGameModel;
  private pressedKeys: string[] = [];

  constructor(model: IGameModel) {
    this.model = model;
    this.handleKeyPress();
  }

  /**
   * Make action based on inputs in queue
   */
  public processUserInput() {
    this.pressedKeys.forEach(key => {
      if (isSpacebar(key)) {
        this.model.cannonShoot();
        return;
      }

      switch (key) {
        case 'ArrowUp':
          this.model.registerCommand(new MoveCannonUp(this.model));
          break;
        case 'ArrowDown':
          this.model.registerCommand(new MoveCannonDown(this.model));
          break;
        // case MoveDirection.LEFT:
        //   this.model.registerCommand(new MoveCannonUp(this.model));
        //   break;
        // case MoveDirection.RIGHT:
        //   this.model.registerCommand(new MoveCannonUp(this.model));
        //   break;
        case 'Numpad8':
          this.model.aimCannonUp();
          break;
        case 'Numpad2':
          this.model.aimCannonDown();
          break;
        case 'KeyQ':
          this.model.cannonPowerUp();
          break;
        case 'KeyW':
          this.model.cannonPowerDown();
          break;
        case 'KeyP':
          this.model.cannonToggleShootingMode();
          break;
        case 'KeyB':
          this.model.undoLastCommand();
          break;
        default:
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
