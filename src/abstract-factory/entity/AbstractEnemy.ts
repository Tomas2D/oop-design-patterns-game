import { GameObjectPrototype } from '~abstract-factory/entity/GameObjectPrototype';
import { GameObjectShape, MoveDirection } from '~abstract-factory/entity/GameObject';
import { GAME_CONFIG } from '~config';
import IVisitor from '~visitor/IVisitor';

class AbstractEnemy extends GameObjectPrototype {
  private hp: number;
  private direction: MoveDirection;

  constructor(params: GameObjectShape, hp: number = GAME_CONFIG.GAME.enemyHealth) {
    super(params);
    this.hp = hp;
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

  // Prototype pattern
  clone(): AbstractEnemy {
    const enemy = new AbstractEnemy(
      {
        x: this.x,
        y: this.y,
        texture: this.texture,
        blockedMoveDirections: this.blockedMoveDirections.slice(),
        speed: this.speed,
      },
      this.hp,
    );

    enemy.anchor = this.anchor.clone();
    return enemy;
  }

  hitEnemy(power: number) {
    this.hp -= power;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  getHp() {
    return this.hp;
  }
}

export default AbstractEnemy;
