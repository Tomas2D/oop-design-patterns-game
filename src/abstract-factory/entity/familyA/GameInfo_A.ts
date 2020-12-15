import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

class GameInfo_A extends AbstractGameInfo {
  getText() {
    return `Game info [A]: Enemies left: ${this.enemiesLeft}, Total score: ${this.score}, Level: ${this.level}`;
  }

  clone(): AbstractGameInfo {
    const gameInfo = new GameInfo_A(this.getText(), { ...this.style });
    gameInfo.position = this.position.clone();
    return gameInfo;
  }
}

export default GameInfo_A;
