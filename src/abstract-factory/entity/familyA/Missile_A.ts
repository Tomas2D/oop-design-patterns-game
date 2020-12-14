import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import IMovingStrategy from '~strategy/IMovingStrategy';

class Missile_A extends AbstractMissile {
  private movingStrategy: IMovingStrategy;

  constructor(params, initAngle: number, initVelocity: number, movingStrategy: IMovingStrategy) {
    super(params, initAngle, initVelocity);
    this.movingStrategy = movingStrategy;
  }

  move() {
    this.movingStrategy.updatePosition(this);
  }
}

export default Missile_A;
