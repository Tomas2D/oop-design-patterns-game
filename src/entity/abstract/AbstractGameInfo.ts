import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

abstract class AbstractGameInfo {
  public abstract getText(): string;
  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitGameInfo(this);
  }
}

export default AbstractGameInfo;
