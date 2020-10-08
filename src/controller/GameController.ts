import { GameModel } from '../model';
import { keyPressConverter } from '../utils';

class GameController {
  private model: GameModel;
  private pressedKeys: string[] = [];

  constructor(model: GameModel) {
    this.model = model;
    this.observePressedKeys();
  }

  /**
   * Make action based on inputs in queue
   */
  public processUserInput() {
    this.pressedKeys.forEach(key => {
      const direction = keyPressConverter(key);
      if (direction !== null) {
        this.model.move(direction);
      }
    });
  }

  /**
   * Process user input
   */
  private observePressedKeys() {
    window.addEventListener(
      'keydown',
      e => {
        if (!this.pressedKeys.includes(e.key)) {
          this.pressedKeys.push(e.key);
        }
      },
      false,
    );
    window.addEventListener(
      'keyup',
      e => {
        this.pressedKeys = this.pressedKeys.filter(key => key !== e.key);
      },
      false,
    );
  }
}

export default GameController;
