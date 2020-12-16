import IGameModel from '~proxy/IGameModel';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { MoveCannonDown } from '~command/MoveCannonDown';
import { AimCannonUp } from '~command/AimCannonUp';
import { CannonPowerUp } from '~command/CannonPowerUp';
import { CannonPowerDown } from '~command/CannonPowerDown';
import { AimCannonDown } from '~command/AimCannonDown';
import { CannonShoot } from '~command/CannonShoot';
import { CannonToggleShootingMode } from '~command/CannonToggleShootingMode';
import { ToggleGravityMode } from '~command/ToggleGravityMode';

class GameController {
  private readonly model: IGameModel;
  private pressedKeys: string[] = [];

  constructor(model: IGameModel) {
    this.model = model;
    this.handleKeyPress();
  }

  private static SINGLE_KEYS = ['KeyP', 'KeyQ', 'KeyW', 'Space', 'KeyU', 'KeyI', 'KeyB', 'KeyG', 'KeyL'];

  /**
   * Make action based on inputs in queue
   */
  processUserInput() {
    this.pressedKeys.forEach(key => {
      switch (key) {
        case 'ArrowUp':
          this.model.registerCommand(new MoveCannonUp(this.model));
          break;
        case 'ArrowDown':
          this.model.registerCommand(new MoveCannonDown(this.model));
          break;
        case 'Space':
          this.model.registerCommand(new CannonShoot(this.model));
          break;
        case 'ArrowLeft':
          this.model.registerCommand(new AimCannonUp(this.model));
          break;
        case 'ArrowRight':
          this.model.registerCommand(new AimCannonDown(this.model));
          break;
        case 'KeyQ':
          this.model.registerCommand(new CannonPowerUp(this.model));
          break;
        case 'KeyW':
          this.model.registerCommand(new CannonPowerDown(this.model));
          break;
        case 'KeyP':
          this.model.registerCommand(new CannonToggleShootingMode(this.model));
          break;
        case 'KeyG':
          this.model.registerCommand(new ToggleGravityMode(this.model));
          break;
        case 'KeyL':
          this.model.toggleGameObjectFactory();
          break;
        case 'KeyB':
          this.model.undoLastCommand();
          break;
      }
    });

    this.pressedKeys = this.pressedKeys.filter(key => !GameController.SINGLE_KEYS.includes(key));
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
  }
}

export default GameController;
