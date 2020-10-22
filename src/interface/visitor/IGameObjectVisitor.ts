import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';

interface IGameObjectVisitor {
  visitCannon(cannon: AbstractCannon);
  visitMissile(missile: AbstractMissile);
}

export default IGameObjectVisitor;
