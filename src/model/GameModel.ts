import * as PIXI from 'pixi.js';
import { Loader, Rectangle } from 'pixi.js';

import { GAME_CONFIG, GAME_RESOURCE_PATH } from '~config';
import IObserver from '../observer/IObserver';
import IGameObjectFactory, { EnemyType } from '~abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import GameObject, { GameObjectSizes, MoveDirection } from '~abstract-factory/entity/GameObject';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import IMovingStrategy from '~strategy/IMovingStrategy';
import RealisticMovingStrategy from '~strategy/RealisticMovingStrategy';
import IGameModel from '~proxy/IGameModel';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { Queue } from 'queue-typescript';
import { Stack } from 'stack-typescript';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import { IPosition } from '~abstract-factory/entity/IPosition';
import CareTaker from '~memento/CareTaker';

// As there is no export, it is like Java private class
class Memento {
  score: number;
  cannonX: number;
  cannonY: number;
  level: number;
}

export class GameModel implements IGameModel {
  private readonly loader: Loader;

  /* Game objects */
  private cannon: AbstractCannon;
  private enemies: AbstractEnemy[] = [];
  private missiles: AbstractMissile[] = [];
  private collisions: AbstractCollision[] = [];
  private gameInfo: AbstractGameInfo;

  /** Game commands */
  private unexecutedCommands: Queue<AbstractGameCommand> = new Queue<AbstractGameCommand>();
  private executedCommands: Stack<AbstractGameCommand> = new Stack<AbstractGameCommand>();

  /* Observers */
  private observers: Array<IObserver> = [];

  /* Factories */
  private gameObjectFactory: IGameObjectFactory;

  /* Score */
  private score: number = 0;
  private level: number = 1;

  /* Strategies */
  private readonly movingStrategy: IMovingStrategy;

  private enemiesMovingTime = 0;

  constructor(loader?: Loader) {
    this.loader = loader || new PIXI.Loader();
    this.loader.baseUrl = GAME_RESOURCE_PATH;
    this.gameObjectFactory = new GameObjectsFactory_A(this.loader, this);
    this.movingStrategy = new RealisticMovingStrategy();
  }

  async loadResources() {
    return await this.gameObjectFactory.loadResources();
  }

  createEnemies(enemiesCount) {
    const enemyType = Math.random() < 0.5 ? EnemyType.A : EnemyType.B;
    const enemy = this.gameObjectFactory.createEnemy(this.generateEnemyPosition(), enemyType);
    this.enemies.push(enemy);

    for (let i = 0; i < enemiesCount - 1; i++) {
      const clonedEnemy = enemy.clone(); // ProtoType pattern
      const { x, y } = this.generateEnemyPosition();
      enemy.position.set(x, y);

      this.enemies.push(clonedEnemy);
    }
  }

  createGameObjects(enemiesCount = GAME_CONFIG.GAME.enemiesCount) {
    this.cannon = this.gameObjectFactory.createCannon();
    this.gameInfo = this.gameObjectFactory.createGameInfo();

    this.createEnemies(enemiesCount);
  }

  notifyObservers(): void {
    this.observers.forEach(observer => observer.update());
  }

  registerObserver(obs: IObserver): void {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  }

  unregisterObserver(obs: IObserver): void {
    this.observers.filter(observer => observer !== obs);
  }

  move(direction: MoveDirection) {
    this.cannon.move(direction);
    this.notifyObservers();
  }

  update() {
    this.executeCommands();
    this.moveMissiles();
    this.destroyMissiles();
    this.destroyCollisions();
    this.moveEnemies();

    if (this.enemies.length === 0) {
      this.createEnemies(GAME_CONFIG.GAME.enemiesCount);
      this.level++;
      this.enemiesMovingTime = 0;
    }

    this.updateGameInfo();
    this.notifyObservers();
  }

  updateGameInfo() {
    this.gameInfo.setEnemiesLeft(this.enemies.length);
    this.gameInfo.setScore(this.score);
    this.gameInfo.setLevel(this.level);
  }

  moveEnemies() {
    if (this.enemiesMovingTime === 0) {
      this.enemies.forEach(enemy => {
        const random = Math.random();
        let direction;

        if (this.level > 0) {
          if (random < 0.25) {
            direction = MoveDirection.TOP;
          } else if (random < 0.5) {
            direction = MoveDirection.LEFT;
          } else if (random < 0.75) {
            direction = MoveDirection.RIGHT;
          } else {
            direction = MoveDirection.BOTTOM;
          }
        } else {
          direction = random < 0.5 ? MoveDirection.TOP : MoveDirection.BOTTOM;
        }

        enemy.setMovingDirection(direction);
      });
      this.enemiesMovingTime = Date.now();
    }

    let diff = Date.now() - this.enemiesMovingTime;
    if (diff) {
      this.enemies.forEach(enemy => enemy.move());
    } else {
      // this.enemiesMovingTime = 0;
    }
  }

  destroyMissiles() {
    for (let index = this.missiles.length - 1; index >= 0; index--) {
      const missile = this.missiles[index];
      if (missile.position.x > GAME_CONFIG.PIXI.width) {
        missile.destroy();
        this.missiles.splice(index, 1);
      }
    }
  }

  public static checkCollision(a: GameObjectSizes, b: GameObjectSizes) {
    return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
  }

  moveMissiles() {
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      const missile = this.missiles[i];
      missile.move();

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];

        if (GameModel.checkCollision(missile, enemy)) {
          enemy.hitEnemy(this.cannon.getPower());

          missile.destroy();
          this.missiles.splice(i, 1);

          if (enemy.getHp() <= 0) {
            const collision = this.gameObjectFactory.createCollision({ x: enemy.x, y: enemy.y });
            this.collisions.push(collision);

            enemy.destroy();
            this.enemies.splice(j, 1);
            this.score++;
          }

          break;
        }
      }
    }

    this.destroyMissiles();
    this.notifyObservers();
  }

  cannonShoot() {
    const missiles = this.cannon.shoot();
    this.missiles.push(...missiles);

    this.notifyObservers();
  }

  getGameInfo(): AbstractGameInfo {
    return this.gameInfo;
  }

  getGameObjects(): GameObject[] {
    return [this.cannon, ...this.missiles, ...this.enemies, ...this.collisions];
  }

  getEnemies(): AbstractEnemy[] {
    return this.enemies;
  }

  generateEnemyPosition(iterations = 3): IPosition {
    function getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const { width: clientWidth, height: clientHeight } = GAME_CONFIG.PIXI;

    const position = {
      x: getRandomInt(GAME_CONFIG.GAME.minEnemySpawnOffset, clientWidth - 100),
      y: getRandomInt(0, clientHeight - 40),
    };

    const hasCollision = this.enemies.some(enemy => {
      const enemyBox = new Rectangle(enemy.x, enemy.y, enemy.width + 100, enemy.height);
      const newEnemyBox = new Rectangle(position.x, position.y - 25, enemy.width + 100, enemy.height + 25);

      return GameModel.checkCollision(enemyBox, newEnemyBox);
    });

    // Generate again
    if (hasCollision && iterations > 0) {
      return this.generateEnemyPosition(iterations - 1);
    }

    return position;
  }

  getMovingStrategy(): IMovingStrategy {
    return this.movingStrategy;
  }

  aimCannonUp() {
    this.cannon.aimUp();
  }

  aimCannonDown() {
    this.cannon.aimDown();
  }

  cannonPowerUp() {
    this.cannon.powerUp();
  }

  cannonPowerDown() {
    this.cannon.powerDown();
  }

  cannonToggleShootingMode() {
    this.cannon.toggleShootingMode();
  }

  getCannon(): AbstractCannon {
    return this.cannon;
  }

  getCannonPosition(): IPosition {
    return { x: this.cannon.x, y: this.cannon.y };
  }

  createMemento(): object {
    const m = new Memento();
    m.score = this.score;
    m.cannonX = this.cannon.x;
    m.cannonY = this.cannon.y;
    m.level = this.level;

    return m;
  }

  setMemento(memento: object) {
    const m: Memento = memento as Memento;

    this.score = m.score;
    this.cannon.position.set(m.cannonX, m.cannonY);
    this.level = m.level;

    this.update();
  }

  getLevel(): number {
    return this.level;
  }

  registerCommand(command: AbstractGameCommand) {
    this.unexecutedCommands.append(command);
  }

  undoLastCommand(): void {
    if (this.executedCommands.length === 0) {
      return;
    }

    const command = this.executedCommands.pop();
    command.unExecute();

    this.notifyObservers();
  }

  private executeCommands(): void {
    while (this.unexecutedCommands.length !== 0) {
      const command = this.unexecutedCommands.dequeue();
      command.doExecute();

      this.executedCommands.push(command);
    }
  }

  private destroyCollisions() {
    for (let i = this.collisions.length - 1; i >= 0; i--) {
      const collision = this.collisions[i];

      if (collision.getAge() * 1000 > GAME_CONFIG.GAME.collisionLifeTime) {
        collision.destroy();
        this.collisions.splice(i, 1);
      }
    }
  }
}
