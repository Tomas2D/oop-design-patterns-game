import LifeTimeLimitedGameObject from '~abstract-factory/entity/LifeTimeLimitedGameObject';
import IVisitor from '~visitor/IVisitor';

abstract class AbstractCollision extends LifeTimeLimitedGameObject {
  acceptVisitor(visitor: IVisitor) {
    visitor.visitCollision(this);
  }

  abstract clone();
}

export default AbstractCollision;
