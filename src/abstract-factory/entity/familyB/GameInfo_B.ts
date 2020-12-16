import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

class GameInfo_B extends AbstractGameInfo {
  getText() {
    return `Game info [B]: Enemies left: ${this.enemiesLeft}, Total score: ${this.score}, Level: ${this.level}`;
  }

  clone(): AbstractGameInfo {
    const gameInfo = new GameInfo_B({ ...this.style }, this.levelUpSound);
    gameInfo.position = this.position.clone();
    gameInfo.level = this.level;
    gameInfo.score = this.score;
    gameInfo.enemiesLeft = this.enemiesLeft;

    return gameInfo;
  }
}

export default GameInfo_B;
