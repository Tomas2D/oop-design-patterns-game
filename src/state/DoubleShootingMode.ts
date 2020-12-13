import IShootingMode from '~interface/state/IShootingMode';
import AbstractCannon from '~entity/abstract/AbstractCannon';

class DoubleShootingMode implements IShootingMode {
  getName(): string {
    return 'DoubleShootingMode';
  }

  shoot(cannon: AbstractCannon) {
    cannon.aimUp();
    cannon.primitiveShoot();
    cannon.aimDown();
    cannon.aimDown();
    cannon.aimDown();
    cannon.primitiveShoot();
    cannon.aimUp();
    cannon.aimUp();
  }
}

export default DoubleShootingMode;
