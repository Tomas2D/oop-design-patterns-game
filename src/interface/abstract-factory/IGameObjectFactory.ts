import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import { PositionShape } from '~interface/entity/PositionInterface';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import AbstractCollision from '~entity/abstract/AbstractCollision';

export enum EnemyType {
  A,
  B,
}

interface IGameObjectFactory {
  createCannon(): AbstractCannon;
  createMissile(position: PositionShape, angle: Number, velocity: Number): AbstractMissile;
  createEnemy(position: PositionShape, type: EnemyType): AbstractEnemy;
  createCollision(position: PositionShape): AbstractCollision;
  createGameInfo(): AbstractGameInfo;

  loadResources(): Promise<any>;
}

export default IGameObjectFactory;
