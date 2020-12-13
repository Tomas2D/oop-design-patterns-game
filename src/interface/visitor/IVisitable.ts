import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

interface IVisitable {
  acceptVisitor(visitor: IGameObjectVisitor): void;
}

export default IVisitable;
