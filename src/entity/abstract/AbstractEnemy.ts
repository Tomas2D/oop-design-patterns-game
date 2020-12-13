import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import { GameObjectPrototype } from '~entity/abstract/GameObjectPrototype';

class AbstractEnemy extends GameObjectPrototype {
  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitEnemy(this);
  }

  clone(): GameObjectPrototype {
    const enemy = new AbstractEnemy({
      x: this.x,
      y: this.y,
      texture: this.texture,
      blockedMoveDirections: this.blockedMoveDirections.slice(),
      speed: this.speed,
    });

    enemy.anchor = this.anchor.clone();
    return enemy;
  }
}

export default AbstractEnemy;
