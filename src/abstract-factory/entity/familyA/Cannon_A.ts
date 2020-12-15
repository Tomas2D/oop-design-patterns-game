import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';

class Cannon_A extends AbstractCannon {
  protected shootingBatch: AbstractMissile[] = [];

  primitiveShoot() {
    const missile = this.gameObjectFactory.createMissile(
      {
        x: this['vertexData'][2], // preserve rotation
        y: this['vertexData'][3], // preserve rotation
      },
      this.getAngle(),
      this.getPower(),
    );

    missile.angle = this.angle;
    this.shootingBatch.push(missile);
  }

  shoot() {
    this.shootingBatch.length = 0;
    this.shootingMode.shoot(this);

    return this.shootingBatch;
  }

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
    );

    cannon.angle = this.angle;
    cannon.power = this.power;
    cannon.shootingMode = this.shootingMode;
    cannon.shootingBatch = this.shootingBatch.slice();
    return cannon;
  }
}

export default Cannon_A;
