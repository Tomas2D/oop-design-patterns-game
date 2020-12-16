import { GameObjectShape, MoveDirection } from './GameObject';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import IGameObjectFactory from '~abstract-factory/IGameObjectFactory';
import { GAME_CONFIG } from '~config';
import IShootingMode from '~state/IShootingMode';
import SingleShootingMode from '~state/SingleShootingMode';
import DoubleShootingMode from '~state/DoubleShootingMode';
import IVisitor from '~visitor/IVisitor';
import { CloneableGameObjectPrototype } from '~abstract-factory/entity/CloneableGameObjectPrototype';
import { default as sound } from 'pixi-sound';

abstract class AbstractCannon extends CloneableGameObjectPrototype {
  protected power: number = GAME_CONFIG.GAME.cannonPower;
  protected gameObjectFactory: IGameObjectFactory;
  protected shootingMode: IShootingMode;
  protected shootSound: sound.Sound;

  protected static SINGLE_SHOOTING_MODE = new SingleShootingMode();
  protected static DOUBLE_SHOOTING_MODE = new DoubleShootingMode();

  constructor(params: GameObjectShape | PIXI.Sprite, factory: IGameObjectFactory, shootSound: sound.Sound) {
    super({
      ...params,
      blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT],
    });
    this.gameObjectFactory = factory;
    this.shootingMode = AbstractCannon.SINGLE_SHOOTING_MODE;
    this.anchor.set(0.5, 0.5);
    this.angle = 0;
    this.shootSound = shootSound;
  }

  protected shootingBatch: AbstractMissile[] = [];

  setGameObjectFactory(goFactory: IGameObjectFactory) {
    this.gameObjectFactory = goFactory;
  }

  primitiveShoot() {
    const missile = this.gameObjectFactory.createMissile(this.getVertexXY(), this.getAngle(), this.getPower());

    missile.angle = this.angle;
    this.shootingBatch.push(missile);
  }

  shoot() {
    this.shootingBatch.length = 0;
    this.shootingMode.shoot(this);

    // Delay sounds when multishooting
    Array(this.shootingBatch.length)
      .fill(null)
      .map(async (_, i) => {
        await new Promise(resolve => setTimeout(resolve, i * 10));
        this.shootSound?.play();
      });

    return this.shootingBatch;
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
    if (angle <= GAME_CONFIG.GAME.minAngle) {
      angle = GAME_CONFIG.GAME.minAngle;
    }
    this.angle = angle;
  }

  aimDown() {
    let angle = this.angle + GAME_CONFIG.GAME.angleStep;
    if (angle > GAME_CONFIG.GAME.maxAngle) {
      angle = GAME_CONFIG.GAME.maxAngle;
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

  getVertexXY() {
    return { x: this['vertexData'][2], y: this['vertexData'][3] };
  }

  setPower(power: number) {
    this.power = power;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  getSpeed() {
    return this.speed;
  }

  abstract clone();
}

export default AbstractCannon;
