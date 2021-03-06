import AbstractCannon from '~abstract-factory/entity/AbstractCannon';

class Cannon_A extends AbstractCannon {
  clone(): Cannon_A {
    const cannon = new Cannon_A(
      {
        x: this.x,
        y: this.y,
        angle: this.angle,
        speed: this.speed,
        texture: this.texture,
      },
      this.gameObjectFactory,
      this.shootSound,
    );

    cannon.angle = this.angle;
    cannon.power = this.power;
    cannon.shootingMode = this.shootingMode;
    cannon.shootingBatch = this.shootingBatch.slice();
    return cannon;
  }
}

export default Cannon_A;
