import { GameObjectShape, MoveDirection } from '~abstract-factory/entity/GameObject';
import { GAME_CONFIG } from '~config';
import IVisitor from '~visitor/IVisitor';
import { CloneableGameObjectPrototype } from '~abstract-factory/entity/CloneableGameObjectPrototype';
import { default as sound } from 'pixi-sound';

abstract class AbstractEnemy extends CloneableGameObjectPrototype {
  protected hp: number;
  protected direction: MoveDirection;

  protected hitSound: sound.Sound;
  protected killSound: sound.Sound;

  constructor(
    params: GameObjectShape,
    hitSound: sound.Sound,
    killSound: sound.Sound,
    hp: number = GAME_CONFIG.GAME.enemyHealth,
  ) {
    super(params);
    this.hp = hp;
    this.hitSound = hitSound;
    this.killSound = killSound;
  }

  acceptVisitor(visitor: IVisitor) {
    visitor.visitEnemy(this);
  }

  setMovingDirection(direction: MoveDirection) {
    this.direction = direction;
  }

  move() {
    super.move(this.direction);
    this.checkBoundaries();
  }

  private checkBoundaries() {
    if (this.y < GAME_CONFIG.GAME.statusBarHeight) {
      this.direction = MoveDirection.BOTTOM;
      super.move(this.direction);
    }

    if (this.x < GAME_CONFIG.GAME.minEnemySpawnOffset) {
      this.direction = MoveDirection.RIGHT;
      super.move(this.direction);
    }

    if (this.x + this.width > GAME_CONFIG.PIXI.width) {
      this.direction = MoveDirection.LEFT;
      super.move(this.direction);
    }

    if (this.y + this.height > GAME_CONFIG.PIXI.height) {
      this.direction = MoveDirection.TOP;
      super.move(this.direction);
    }
  }

  hitEnemy(power: number) {
    this.hp -= power;
    if (this.hp <= 0) {
      this.killSound.play();
      this.hp = 0;
    } else {
      this.hitSound.play();
    }
  }

  getHp() {
    return this.hp;
  }

  abstract clone();
}

export default AbstractEnemy;
