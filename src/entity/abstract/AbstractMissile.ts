import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import LifeTimeLimitedGameObject from '~entity/abstract/LifeTimeLimitedGameObject';

class AbstractMissile extends LifeTimeLimitedGameObject {
  acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitMissile(this);
  }
}

export default AbstractMissile;
