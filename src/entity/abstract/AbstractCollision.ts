import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import LifeTimeLimitedGameObject from '~entity/abstract/LifeTimeLimitedGameObject';

class AbstractCollision extends LifeTimeLimitedGameObject {
  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitCollision(this);
  }
}

export default AbstractCollision;
