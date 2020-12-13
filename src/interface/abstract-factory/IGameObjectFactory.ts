import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import { PositionShape } from '~interface/entity/PositionInterface';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';

interface IGameObjectFactory {
  createCannon(): AbstractCannon;
  createMissile(position: PositionShape, angle: Number, velocity: Number): AbstractMissile;
  createEnemy(position: PositionShape): AbstractEnemy;
  createGameInfo(): AbstractGameInfo;
}

export default IGameObjectFactory;
