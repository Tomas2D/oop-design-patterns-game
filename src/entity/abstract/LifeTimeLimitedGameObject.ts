import GameObject from '~entity/abstract/GameObject';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

abstract class LifeTimeLimitedGameObject extends GameObject {
  private bornAt: Date;

  public constructor(params) {
    super(params);
    this.bornAt = new Date();
  }

  public getAge(): number {
    return Date.now() - this.bornAt.getTime();
  }

  public abstract acceptVisitor(visitor: IGameObjectVisitor);
}

export default LifeTimeLimitedGameObject;
