import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import { GameObjectPrototype } from '~entity/abstract/GameObjectPrototype';
import { GameObjectShape } from '~entity/abstract/GameObject';
import { GAME_CONFIG } from '~config';

class AbstractEnemy extends GameObjectPrototype {
  public hp: number;

  constructor(params: GameObjectShape, hp: number = GAME_CONFIG.GAME.enemyHealth) {
    super(params);
    this.hp = hp;
  }

  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitEnemy(this);
  }

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
}

export default AbstractEnemy;
