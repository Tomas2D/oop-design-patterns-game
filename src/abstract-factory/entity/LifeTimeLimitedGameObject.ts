import IVisitor from '~visitor/IVisitor';
import { CloneableGameObjectPrototype } from '~abstract-factory/entity/CloneableGameObjectPrototype';

abstract class LifeTimeLimitedGameObject extends CloneableGameObjectPrototype {
  private bornAt: number;

  constructor(params) {
    super(params);
    this.bornAt = Date.now();
  }

  getAge(): number {
    return (Date.now() - this.bornAt) / 1000;
  }

  resetBornAt(): void {
    this.bornAt = Date.now();
  }

  abstract acceptVisitor(visitor: IVisitor);

  abstract clone();
}

export default LifeTimeLimitedGameObject;
