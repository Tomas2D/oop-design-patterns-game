import AbstractCollision from '~abstract-factory/entity/AbstractCollision';

class Collision_A extends AbstractCollision {
  clone(): Collision_A {
    return new Collision_A({
      x: this.x,
      y: this.y,
      texture: this.texture,
      speed: this.speed,
    });
  }
}

export default Collision_A;
