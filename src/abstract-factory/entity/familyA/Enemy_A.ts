import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';

class Enemy_A extends AbstractEnemy {
  // Prototype pattern
  clone(): AbstractEnemy {
    const enemy = new Enemy_A({
      x: this.x,
      y: this.y,
      texture: this.texture,
      blockedMoveDirections: this.blockedMoveDirections.slice(),
      speed: this.speed,
    });

    enemy.hp = this.hp;
    enemy.anchor = this.anchor.clone();
    enemy.direction = this.direction;
    return enemy;
  }
}

export default Enemy_A;
