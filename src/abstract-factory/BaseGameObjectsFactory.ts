import IGameObjectFactory, { EnemyType } from '~interface/abstract-factory/IGameObjectFactory';
import { PositionShape } from '~interface/entity/PositionInterface';
import IGameModel from '~interface/proxy/IGameModel';

abstract class BaseGameObjectsFactory implements IGameObjectFactory {
  protected readonly loader: PIXI.Loader;
  protected readonly gameModel: IGameModel;

  public constructor(loader: PIXI.Loader, gameModel: IGameModel) {
    this.loader = loader;
    this.gameModel = gameModel;
  }

  abstract loadResources(): Promise<any>;

  abstract createCannon();

  abstract createMissile(position: PositionShape, angle: Number, velocity: Number);

  abstract createEnemy(position: PositionShape, type: EnemyType);

  abstract createGameInfo();

  abstract createCollision(position: PositionShape);
}

export default BaseGameObjectsFactory;
