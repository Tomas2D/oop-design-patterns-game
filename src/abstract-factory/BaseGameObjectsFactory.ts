import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import { PositionShape } from '~interface/entity/PositionInterface';
import IGameModel from '~interface/proxy/IGameModel';

abstract class BaseGameObjectsFactory implements IGameObjectFactory {
  protected readonly resources: PIXI.IResourceDictionary;
  protected readonly gameModel: IGameModel;

  public constructor(resources: PIXI.IResourceDictionary, gameModel: IGameModel) {
    this.resources = resources;
    this.gameModel = gameModel;
  }

  abstract createCannon();

  abstract createMissile(position: PositionShape, angle: Number, velocity: Number);

  abstract createEnemy(position: PositionShape);

  abstract createGameInfo();
}

export default BaseGameObjectsFactory;
