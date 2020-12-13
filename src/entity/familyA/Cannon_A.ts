import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';

class Cannon_A extends AbstractCannon {
  private shootingBatch: AbstractMissile[] = [];

  public primitiveShoot() {
    const missile = this.gameObjectFactory.createMissile(
      {
        x: this.position.x + 15,
        y: this.position.y - 15,
      },
      this.getAngle(),
      this.getPower(),
    );

    this.shootingBatch.push(missile);
  }

  public shoot() {
    this.shootingBatch.length = 0;

    this.shootingMode.shoot(this);

    return this.shootingBatch;
  }
}

export default Cannon_A;
