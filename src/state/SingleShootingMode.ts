import IShootingMode from '~state/IShootingMode';
import AbstractCannon from '~abstract-factory/entity/AbstractCannon';

class SingleShootingMode implements IShootingMode {
  getName(): string {
    return 'SingleShootingMode';
  }

  shoot(cannon: AbstractCannon) {
    cannon.primitiveShoot();
  }
}

export default SingleShootingMode;
