import IGameObjectFactory, { EnemyType } from '~abstract-factory/IGameObjectFactory';
import IGameModel from '~proxy/IGameModel';
import { IPosition } from '~abstract-factory/entity/IPosition';

abstract class BaseGameObjectsFactory implements IGameObjectFactory {
  protected readonly loader: PIXI.Loader;
  protected readonly gameModel: IGameModel;

  constructor(loader: PIXI.Loader, gameModel: IGameModel) {
    this.loader = loader;
    this.gameModel = gameModel;
  }

  abstract loadResources(): Promise<any>;

  abstract createCannon();

  abstract createMissile(position: IPosition, angle: Number, velocity: Number);

  abstract createEnemy(position: IPosition, type: EnemyType);

  abstract createGameInfo();

  abstract createCollision(position: IPosition);
}

export default BaseGameObjectsFactory;
