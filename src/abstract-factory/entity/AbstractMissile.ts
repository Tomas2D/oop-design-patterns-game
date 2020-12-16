import LifeTimeLimitedGameObject from '~abstract-factory/entity/LifeTimeLimitedGameObject';
import IVisitor from '~visitor/IVisitor';

abstract class AbstractMissile extends LifeTimeLimitedGameObject {
  protected initAngle: number;
  protected initVelocity: number;

  protected constructor(params, initAngle: number, initVelocity: number) {
    super(params);
    this.initAngle = initAngle;
    this.initVelocity = initVelocity;
  }

  acceptVisitor(visitor: IVisitor) {
    visitor.visitMissile(this);
  }

  getInitAngle(): number {
    return this.initAngle;
  }

  getInitVelocity(): number {
    return this.initVelocity;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  abstract move();
}

export default AbstractMissile;
