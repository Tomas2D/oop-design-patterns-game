import GameObject from './GameObject';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

class AbstractEnemy extends GameObject {
  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitEnemy(this);
  }
}

export default AbstractEnemy;
