import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import { IPosition } from '~abstract-factory/entity/IPosition';

export enum EnemyType {
  A,
  B,
}

export enum FamilyType {
  A,
  B,
}

interface IGameObjectFactory {
  createCannon(): AbstractCannon;
  createMissile(position: IPosition, angle: Number, velocity: Number): AbstractMissile;
  createEnemy(position: IPosition, type: EnemyType): AbstractEnemy;
  createCollision(position: IPosition): AbstractCollision;
  createGameInfo(): AbstractGameInfo;

  loadResources(): Promise<any>;

  isLoaderLoading(): Boolean;
}

export default IGameObjectFactory;
