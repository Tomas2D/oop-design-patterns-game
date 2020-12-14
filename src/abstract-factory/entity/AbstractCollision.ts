import LifeTimeLimitedGameObject from '~abstract-factory/entity/LifeTimeLimitedGameObject';
import IVisitor from '~visitor/IVisitor';

class AbstractCollision extends LifeTimeLimitedGameObject {
  acceptVisitor(visitor: IVisitor) {
    visitor.visitCollision(this);
  }
}

export default AbstractCollision;
