import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import LifeTimeLimitedGameObject from '~entity/abstract/LifeTimeLimitedGameObject';

abstract class AbstractMissile extends LifeTimeLimitedGameObject {
  private initAngle: number;
  private initVelocity: number;

  constructor(params, initAngle: number, initVelocity: number) {
    super(params);
    this.initAngle = initAngle;
    this.initVelocity = initVelocity;
  }

  acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitMissile(this);
  }

  public getInitAngle(): number {
    return this.initAngle;
  }

  public getInitVelocity(): number {
    return this.initVelocity;
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public abstract move();
}

export default AbstractMissile;
