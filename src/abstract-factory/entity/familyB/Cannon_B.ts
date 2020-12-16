import AbstractCannon from '~abstract-factory/entity/AbstractCannon';

class Cannon_B extends AbstractCannon {
  clone(): Cannon_B {
    const cannon = new Cannon_B(
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

export default Cannon_B;
