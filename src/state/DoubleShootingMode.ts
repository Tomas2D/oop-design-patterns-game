import IShootingMode from '~state/IShootingMode';
import AbstractCannon from '~abstract-factory/entity/AbstractCannon';

class DoubleShootingMode implements IShootingMode {
  getName(): string {
    return 'DoubleShootingMode';
  }

  shoot(cannon: AbstractCannon) {
    cannon.aimUp();
    cannon.aimUp();
    cannon.aimUp();
    cannon.primitiveShoot();
    cannon.aimDown();
    cannon.aimDown();
    cannon.aimDown();

    cannon.aimDown();
    cannon.aimDown();
    cannon.aimDown();
    cannon.primitiveShoot();
    cannon.aimUp();
    cannon.aimUp();
    cannon.aimUp();
  }
}

export default DoubleShootingMode;
