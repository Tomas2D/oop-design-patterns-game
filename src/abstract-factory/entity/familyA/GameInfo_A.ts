import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

class GameInfo_A extends AbstractGameInfo {
  getText() {
    return `Game info [A]: Enemies left: ${this.enemiesLeft}, Total score: ${this.score}, Level: ${this.level}`;
  }
}

export default GameInfo_A;
