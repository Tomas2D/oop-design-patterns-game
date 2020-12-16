import AbstractCollision from '~abstract-factory/entity/AbstractCollision';

class Collision_B extends AbstractCollision {
  clone(): Collision_B {
    return new Collision_B({
      x: this.x,
      y: this.y,
      texture: this.texture,
      speed: this.speed,
    });
  }
}

export default Collision_B;
