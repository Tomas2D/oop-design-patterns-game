import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';

class Enemy_B extends AbstractEnemy {
  // Prototype pattern
  clone(): Enemy_B {
    const enemy = new Enemy_B(
      {
        x: this.x,
        y: this.y,
        texture: this.texture,
        blockedMoveDirections: this.blockedMoveDirections.slice(),
        speed: this.speed,
      },
      this.hitSound,
      this.killSound,
    );

    enemy.hp = this.hp;
    enemy.anchor = this.anchor.clone();
    enemy.direction = this.direction;
    return enemy;
  }
}

export default Enemy_B;
