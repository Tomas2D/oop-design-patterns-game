import GameObject, { GameObjectShape, MoveDirection } from './GameObject';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';

abstract class AbstractCannon extends GameObject {
  protected gameObjectFactory: IGameObjectFactory;

  constructor(params: GameObjectShape, factory: IGameObjectFactory) {
    super({
      ...params,
      blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT],
    });
    this.gameObjectFactory = factory;
  }

  public abstract shoot(): AbstractMissile;
}

export default AbstractCannon;
