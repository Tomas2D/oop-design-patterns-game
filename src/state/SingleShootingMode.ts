import IShootingMode from '~interface/state/IShootingMode';
import AbstractCannon from '~entity/abstract/AbstractCannon';

class SingleShootingMode implements IShootingMode {
  getName(): string {
    return 'SingleShootingMode';
  }

  shoot(cannon: AbstractCannon) {
    cannon.primitiveShoot();
  }
}

export default SingleShootingMode;
