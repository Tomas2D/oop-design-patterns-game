import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import { PositionShape } from '~interface/entity/PositionInterface';

interface IGameObjectFactory {
  createCannon(): AbstractCannon;
  createMissile(position: PositionShape): AbstractMissile;
}

export default IGameObjectFactory;
