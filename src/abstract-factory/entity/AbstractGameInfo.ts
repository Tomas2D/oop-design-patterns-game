import * as PIXI from 'pixi.js';
import IVisitor from '~visitor/IVisitor';
import { ICloneable } from '~prototype/ICloneable';

abstract class AbstractGameInfo extends PIXI.Text implements ICloneable {
  abstract getText(): string;

  protected enemiesLeft = 0;
  protected score = 0;
  protected level = 0;

  public setScore(score: number) {
    this.score = score;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public setEnemiesLeft(enemiesLeft: number) {
    this.enemiesLeft = enemiesLeft;
  }

  acceptVisitor(visitor: IVisitor) {
    visitor.visitGameInfo(this);
  }

  abstract clone();
}

export default AbstractGameInfo;
