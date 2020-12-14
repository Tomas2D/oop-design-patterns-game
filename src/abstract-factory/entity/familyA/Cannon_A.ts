import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';

class Cannon_A extends AbstractCannon {
  private shootingBatch: AbstractMissile[] = [];

  primitiveShoot() {
    const missile = this.gameObjectFactory.createMissile(
      {
        x: this['vertexData'][2],
        y: this['vertexData'][3],
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
}

export default Cannon_A;
