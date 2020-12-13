import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import AbstractMissile from '~entity/abstract/AbstractMissile';

class SimpleMovingStrategy implements IMovingStrategy {
  updatePosition(missile: AbstractMissile) {
    const x = missile.x + missile.getInitVelocity();
    missile.setPosition(x, missile.y);
  }
}

export default SimpleMovingStrategy;
