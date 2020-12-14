import GameObject from '~abstract-factory/entity/GameObject';
import IVisitor from '~visitor/IVisitor';

abstract class LifeTimeLimitedGameObject extends GameObject {
  private readonly bornAt: number;

  constructor(params) {
    super(params);
    this.bornAt = Date.now();
  }

  getAge(): number {
    return (Date.now() - this.bornAt) / 1000;
  }

  abstract acceptVisitor(visitor: IVisitor);
}

export default LifeTimeLimitedGameObject;
