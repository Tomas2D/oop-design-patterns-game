import { GameModel } from '../model';
import { getMoveDirection, isSpacebar } from '../utils';

class GameController {
  private model: GameModel;
  private pressedKeys: string[] = [];

  constructor(model: GameModel) {
    this.model = model;
    this.handleKeyPress();
  }

  /**
   * Make action based on inputs in queue
   */
  public processUserInput() {
    this.pressedKeys.forEach(key => {
      const direction = getMoveDirection(key);
      if (direction !== null) {
        this.model.move(direction);
      } else if (isSpacebar(key)) {
        this.model.cannonShoot();
      }
    });

    this.pressedKeys = this.pressedKeys.filter(key => !isSpacebar(key));
  }

  /**
   * Process user input
   */
  private handleKeyPress() {
    window.addEventListener(
      'keydown',
      e => {
        if (e.code !== 'Space' && !this.pressedKeys.includes(e.code)) {
          this.pressedKeys.push(e.code);
        }
      },
      false,
    );
    window.addEventListener(
      'keypress',
      e => {
        if (e.code === 'Space' && !this.pressedKeys.includes(e.code)) {
          this.pressedKeys.push(e.code);
        }
      },
      false,
    );
    window.addEventListener(
      'keyup',
      e => {
        if (e.code !== 'Space') {
          this.pressedKeys = this.pressedKeys.filter(key => key !== e.code);
        }
      },
      false,
    );
  }
}

export default GameController;
