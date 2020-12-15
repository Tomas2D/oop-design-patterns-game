import { GameObjectShape, MoveDirection } from './GameObject';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import IGameObjectFactory from '~abstract-factory/IGameObjectFactory';
import { GAME_CONFIG } from '~config';
import IShootingMode from '~state/IShootingMode';
import SingleShootingMode from '~state/SingleShootingMode';
import DoubleShootingMode from '~state/DoubleShootingMode';
import IVisitor from '~visitor/IVisitor';
import { CloneableGameObjectPrototype } from '~abstract-factory/entity/CloneableGameObjectPrototype';

abstract class AbstractCannon extends CloneableGameObjectPrototype {
  protected power: number = GAME_CONFIG.GAME.cannonPower;
  protected gameObjectFactory: IGameObjectFactory;
  protected shootingMode: IShootingMode;

  abstract shoot(): AbstractMissile[];

  abstract primitiveShoot(): void;

  protected static SINGLE_SHOOTING_MODE = new SingleShootingMode();
  protected static DOUBLE_SHOOTING_MODE = new DoubleShootingMode();

  constructor(params: GameObjectShape | PIXI.Sprite, factory: IGameObjectFactory) {
    super({
      ...params,
      blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT],
    });
    this.gameObjectFactory = factory;
    this.shootingMode = AbstractCannon.SINGLE_SHOOTING_MODE;
    this.anchor.set(0.5, 0.5);
    this.angle = 0;
  }

  move(direction: MoveDirection) {
    const oldY = this.y;
    super.move(direction);
    const newY = this.y;

    // Prevent going out of bound
    if (newY < this.height / 2 + GAME_CONFIG.GAME.statusBarHeight || newY > GAME_CONFIG.PIXI.height - this.height / 2) {
      this.y = oldY;
    }
  }

  acceptVisitor(visitor: IVisitor) {
    visitor.visitCannon(this);
  }

  aimUp() {
    let angle = this.angle - GAME_CONFIG.GAME.angleStep;
    if (angle < -60) {
      angle = -60;
    }
    this.angle = angle;
  }

  aimDown() {
    let angle = this.angle + GAME_CONFIG.GAME.angleStep;
    if (angle > 30) {
      angle = 30;
    }
    this.angle = angle;
  }

  getAngle() {
    return this.angle;
  }

  getPower() {
    return this.power;
  }

  powerUp() {
    this.power += 1;
  }

  powerDown() {
    if (this.power > 1) {
      this.power -= 1;
    }
  }

  toggleShootingMode() {
    if (this.shootingMode instanceof SingleShootingMode) {
      this.shootingMode = AbstractCannon.DOUBLE_SHOOTING_MODE;
    } else if (this.shootingMode instanceof DoubleShootingMode) {
      this.shootingMode = AbstractCannon.SINGLE_SHOOTING_MODE;
    } else {
      throw Error('shootingMode does not exists!');
    }
  }

  getShootingMode() {
    return this.shootingMode;
  }

  abstract clone();
}

export default AbstractCannon;
