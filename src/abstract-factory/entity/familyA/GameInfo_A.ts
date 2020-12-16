import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import { ActionCounter } from '~singleton/ActionCounter';

class GameInfo_A extends AbstractGameInfo {
  getText() {
    return `Game info [A]: Enemies left: ${this.enemiesLeft}, Total score: ${this.score}, Level: ${
      this.level
    }, Total actions: ${ActionCounter.getInstance().getCount()}`;
  }

  clone(): AbstractGameInfo {
    const gameInfo = new GameInfo_A({ ...this.style }, this.levelUpSound);
    gameInfo.position = this.position.clone();
    gameInfo.level = this.level;
    gameInfo.score = this.score;
    gameInfo.enemiesLeft = this.enemiesLeft;

    return gameInfo;
  }
}

export default GameInfo_A;
