import IVisitor from '~visitor/IVisitor';

interface IVisitable {
  acceptVisitor(visitor: IVisitor): void;
}

export default IVisitable;
