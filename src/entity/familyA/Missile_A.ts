import AbstractMissile from '~entity/abstract/AbstractMissile';
import IMovingStrategy from '~interface/strategy/IMovingStrategy';

class Missile_A extends AbstractMissile {
  private movingStrategy: IMovingStrategy;

  constructor(params, initAngle: number, initVelocity: number, movingStrategy: IMovingStrategy) {
    super(params, initAngle, initVelocity);
    this.movingStrategy = movingStrategy;
  }

  public move() {
    this.movingStrategy.updatePosition(this);
  }
}

export default Missile_A;
