import GameObject from '~entity/abstract/GameObject';

class LifeTimeLimitedGameObject extends GameObject {
  private bornAt: Date;

  public getAge(): number {
    return Date.now() - this.bornAt.getTime();
  }
}

export default LifeTimeLimitedGameObject;
