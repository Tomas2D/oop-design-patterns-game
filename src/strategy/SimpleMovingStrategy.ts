import IMovingStrategy from '~strategy/IMovingStrategy';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';

class SimpleMovingStrategy implements IMovingStrategy {
  updatePosition(missile: AbstractMissile) {
    const x = missile.x + missile.getInitVelocity();
    missile.setPosition(x, missile.y);
  }
}

export default SimpleMovingStrategy;
