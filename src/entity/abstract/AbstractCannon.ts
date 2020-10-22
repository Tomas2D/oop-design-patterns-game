import GameObject, { GameObjectShape, MoveDirection } from './GameObject';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import { GAME_CONFIG } from '~config';

abstract class AbstractCannon extends GameObject {
  private power: number = 10;
  protected gameObjectFactory: IGameObjectFactory;

  move(direction: MoveDirection) {
    const oldY = this.y;
    super.move(direction);
    const newY = this.y;

    if (newY < 0 || newY > GAME_CONFIG.height - this.height) {
      this.y = oldY;
    }
  }

  constructor(params: GameObjectShape, factory: IGameObjectFactory) {
    super({
      ...params,
      blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT],
    });
    this.gameObjectFactory = factory;
  }

  public abstract shoot(): AbstractMissile;

  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitCannon(this);
  }
}

export default AbstractCannon;
