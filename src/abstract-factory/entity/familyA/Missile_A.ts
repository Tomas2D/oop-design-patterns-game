import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import IMovingStrategy from '~strategy/IMovingStrategy';

class Missile_A extends AbstractMissile {
  protected movingStrategy: IMovingStrategy;

  constructor(params, initAngle: number, initVelocity: number, movingStrategy: IMovingStrategy) {
    super(params, initAngle, initVelocity);
    this.movingStrategy = movingStrategy;
  }

  move() {
    this.movingStrategy.updatePosition(this);
  }

  // Prototype pattern
  clone(): Missile_A {
    const missile = new Missile_A(
      {
        x: this.x,
        y: this.y,
        texture: this.texture,
        blockedMoveDirections: this.blockedMoveDirections.slice(),
        speed: this.speed,
      },
      this.initAngle,
      this.initVelocity,
      this.movingStrategy,
    );

    missile.anchor = this.anchor.clone();
    return missile;
  }
}

export default Missile_A;
