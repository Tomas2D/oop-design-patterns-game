import IMovingStrategy from '~strategy/IMovingStrategy';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import { convertAngleToRad } from '~strategy/utils';

class SimpleMovingStrategy implements IMovingStrategy {
  updatePosition(missile: AbstractMissile) {
    const x = missile.x + missile.getInitVelocity();
    const y = missile.y - Math.sin(convertAngleToRad(missile)) * missile.getInitVelocity();

    missile.setPosition(x, y);
  }
}

export default SimpleMovingStrategy;
