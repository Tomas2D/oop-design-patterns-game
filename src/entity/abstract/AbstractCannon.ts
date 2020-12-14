import GameObject, { GameObjectShape, MoveDirection } from './GameObject';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import { GAME_CONFIG } from '~config';
import IShootingMode from '~interface/state/IShootingMode';
import SingleShootingMode from '~state/SingleShootingMode';
import DoubleShootingMode from '~state/DoubleShootingMode';

abstract class AbstractCannon extends GameObject {
  private power: number = 25;
  protected gameObjectFactory: IGameObjectFactory;
  protected shootingMode: IShootingMode;

  public abstract shoot(): AbstractMissile[];
  public abstract primitiveShoot(): void;

  protected static SINGLE_SHOOTING_MODE = new SingleShootingMode();
  protected static DOUBLE_SHOOTING_MODE = new DoubleShootingMode();

  constructor(params: GameObjectShape, factory: IGameObjectFactory) {
    super({
      ...params,
      blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT],
    });
    this.gameObjectFactory = factory;
    this.shootingMode = AbstractCannon.SINGLE_SHOOTING_MODE;
  }

  move(direction: MoveDirection) {
    const oldY = this.y;
    super.move(direction);
    const newY = this.y;

    if (newY < 0 || newY > GAME_CONFIG.PIXI.height - this.height) {
      this.y = oldY;
    }
  }

  public acceptVisitor(visitor: IGameObjectVisitor) {
    visitor.visitCannon(this);
  }

  public aimUp() {
    let newAngle = this.angle - GAME_CONFIG.GAME.angleStep;
    if (newAngle < -60) {
      newAngle = -60;
    }
    this.angle = newAngle;
  }

  public aimDown() {
    let angle = this.angle + GAME_CONFIG.GAME.angleStep;
    if (angle > 0) {
      angle = 0;
    }
    this.angle = angle;
  }

  public getAngle() {
    return -1 * this.angle;
  }

  public getPower() {
    return this.power;
  }

  public powerUp() {
    this.power += 1;
  }

  public powerDown() {
    if (this.power > 1) {
      this.power -= 1;
    }
  }

  public toggleShootingMode() {
    if (this.shootingMode instanceof SingleShootingMode) {
      this.shootingMode = AbstractCannon.DOUBLE_SHOOTING_MODE;
    } else if (this.shootingMode instanceof DoubleShootingMode) {
      this.shootingMode = AbstractCannon.SINGLE_SHOOTING_MODE;
    } else {
      throw Error('shootingMode does not exists!');
    }
  }

  public getShootingMode() {
    return this.shootingMode;
  }
}

export default AbstractCannon;
