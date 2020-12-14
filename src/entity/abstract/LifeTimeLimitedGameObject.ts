import GameObject from '~entity/abstract/GameObject';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

abstract class LifeTimeLimitedGameObject extends GameObject {
  private readonly bornAt: number;

  public constructor(params) {
    super(params);
    this.bornAt = Date.now();
  }

  public getAge(): number {
    return (Date.now() - this.bornAt) / 1000;
  }

  public abstract acceptVisitor(visitor: IGameObjectVisitor);
}

export default LifeTimeLimitedGameObject;
