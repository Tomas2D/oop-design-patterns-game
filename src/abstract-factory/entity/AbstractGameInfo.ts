import * as PIXI from 'pixi.js';
import IVisitor from '~visitor/IVisitor';
import { ICloneable } from '~prototype/ICloneable';
import { default as sound } from 'pixi-sound';

abstract class AbstractGameInfo extends PIXI.Text implements ICloneable {
  abstract getText(): string;

  protected enemiesLeft = 0;
  protected score = 0;
  protected level = 0;

  protected levelUpSound: sound.Sound;

  constructor(style: any, levelUpSound: PIXI.sound.Sound) {
    super('', style);
    this.levelUpSound = levelUpSound;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public levelUp() {
    this.level++;
    this.levelUpSound.play();
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
