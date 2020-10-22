import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import Cannon_A from '~entity/familyA/Cannon_A';
import Missile_A from '~entity/familyA/Missile_A';
import { PositionShape } from '~interface/entity/PositionInterface';

abstract class BaseGameObjectsFactory implements IGameObjectFactory {
  protected readonly resources: PIXI.IResourceDictionary;

  public constructor(resources: PIXI.IResourceDictionary) {
    this.resources = resources;
  }

  abstract createCannon();

  abstract createMissile(position: PositionShape);

  abstract createEnemy(position: PositionShape);

  abstract createGameInfo();
}

export default BaseGameObjectsFactory;
