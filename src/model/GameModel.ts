import * as PIXI from 'pixi.js';

import { GAME_CONFIG, GAME_RESOURCE_PATH } from '~config';
import IObserver from '../observer/IObserver';
import IGameObjectFactory, { EnemyType, FamilyType } from '~abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import GameObject, { GameObjectSizes, MoveDirection } from '~abstract-factory/entity/GameObject';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import IMovingStrategy from '~strategy/IMovingStrategy';
import IGameModel from '~proxy/IGameModel';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { Queue } from 'queue-typescript';
import { Stack } from 'stack-typescript';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import { IPosition } from '~abstract-factory/entity/IPosition';
import { IObserverEvent } from '~observer/IObserverEvent';
import SimpleMovingStrategy from '~strategy/SimpleMovingStrategy';
import RealisticMovingStrategy from '~strategy/RealisticMovingStrategy';
import GameObjectsFactory_B from '~abstract-factory/entity/GameObjectsFactory_B';
import { ActionCounter } from '~singleton/ActionCounter';

// As there is no export, it is like Java private class
class Memento {
  gameInfo: AbstractGameInfo;
  enemies: AbstractEnemy[];
  cannon: AbstractCannon;
  missiles: AbstractMissile[];
  collisions: AbstractCollision[];
  gameObjectFactory: IGameObjectFactory;

  score: number;
  level: number;
}

export class GameModel implements IGameModel {
  private readonly loader: PIXI.Loader;

  protected static SIMPLE_MOVING_STRATEGY = new SimpleMovingStrategy();
  protected static REALISTIC_MOVING_STRATEGY = new RealisticMovingStrategy();

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
  private movingStrategy: IMovingStrategy;

  /* Set enemies moving on the screen */
  private enemiesMovingSet = false;

  constructor(loader?: PIXI.Loader) {
    this.loader = loader || new PIXI.Loader();
    this.loader.baseUrl = GAME_RESOURCE_PATH;
    this.gameObjectFactory = new GameObjectsFactory_A(this.loader, this);
    this.movingStrategy = GameModel.REALISTIC_MOVING_STRATEGY;
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

  notifyObservers(e?: IObserverEvent): void {
    this.observers.forEach(observer => observer.update(e));
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
      this.levelUp();
    }

    this.updateGameInfo();
    this.notifyObservers();
  }

  levelUp() {
    this.createEnemies(GAME_CONFIG.GAME.enemiesCount);
    this.gameInfo.levelUp();
    this.level++;
    this.enemiesMovingSet = false;
  }

  updateGameInfo() {
    this.gameInfo.setEnemiesLeft(this.enemies.length);
    this.gameInfo.setScore(this.score);
    this.gameInfo.setLevel(this.level);
  }

  moveEnemies() {
    if (!this.enemiesMovingSet) {
      this.enemiesMovingSet = true;

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
    }

    this.enemies.forEach(enemy => enemy.move());
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

  checkCollision(a: GameObjectSizes, b: GameObjectSizes) {
    return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
  }

  moveMissiles() {
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      const missile = this.missiles[i];
      missile.move();

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];

        if (this.checkCollision(missile, enemy)) {
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
      const enemyBox = new PIXI.Rectangle(enemy.x, enemy.y, enemy.width + 100, enemy.height);
      const newEnemyBox = new PIXI.Rectangle(position.x, position.y - 25, enemy.width + 100, enemy.height + 25);

      return this.checkCollision(enemyBox, newEnemyBox);
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
    if (this.cannon.getPower() < 50) {
      this.cannon.powerUp();
    }
  }

  cannonPowerDown() {
    if (this.cannon.getPower() > 0) {
      this.cannon.powerDown();
    }
  }

  cannonToggleShootingMode() {
    this.cannon.toggleShootingMode();
  }

  getCannon(): AbstractCannon {
    return this.cannon;
  }

  getCannonPosition(): IPosition {
    return this.cannon.getPosition();
  }

  createMemento(): object {
    const m = new Memento();

    m.enemies = this.enemies.map(enemy => enemy.clone());
    m.cannon = this.cannon.clone();
    m.gameInfo = this.gameInfo.clone();
    m.missiles = this.missiles.map(missile => missile.clone());
    m.collisions = this.collisions.map(collision => collision.clone());
    m.gameObjectFactory = this.gameObjectFactory;

    m.score = this.score;
    m.level = this.level;

    return m;
  }

  setMemento(memento: object) {
    const m: Memento = memento as Memento;

    this.getGameObjects().forEach(() => obj => obj.destroy());
    this.enemies.length = 0;
    this.missiles.length = 0;
    this.collisions.length = 0;

    this.enemies = m.enemies.slice();
    this.missiles = m.missiles.slice();
    this.collisions = m.collisions.slice();
    this.gameInfo = m.gameInfo.clone();
    this.cannon = m.cannon;

    this.score = m.score;
    this.level = m.level;

    this.gameObjectFactory = m.gameObjectFactory;
    this.missiles.forEach(missile => missile.resetBornAt());
    this.notifyObservers({
      updateGame: true,
      currentGameObjectFamilyType: this.gameObjectFactory instanceof GameObjectsFactory_A ? FamilyType.A : FamilyType.B,
    });
    this.update();
  }

  getLevel(): number {
    return this.level;
  }

  getScore(): number {
    return this.score;
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

    ActionCounter.getInstance().decrement();
  }

  private executeCommands(): void {
    while (this.unexecutedCommands.length !== 0) {
      const command = this.unexecutedCommands.dequeue();
      command.doExecute();

      ActionCounter.getInstance().increment();
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

  toggleGravityMode(): void {
    if (this.movingStrategy instanceof SimpleMovingStrategy) {
      this.movingStrategy = GameModel.REALISTIC_MOVING_STRATEGY;
    } else {
      this.movingStrategy = GameModel.SIMPLE_MOVING_STRATEGY;
    }
  }

  async toggleGameObjectFactory(): Promise<boolean> {
    if (this.gameObjectFactory.isLoaderLoading()) {
      return false;
    }

    let newFactory: IGameObjectFactory;
    if (this.gameObjectFactory instanceof GameObjectsFactory_A) {
      newFactory = new GameObjectsFactory_B(this.loader, this);
    } else {
      newFactory = new GameObjectsFactory_A(this.loader, this);
    }

    await newFactory.loadResources();

    this.gameObjectFactory = newFactory;
    this.cannon.setGameObjectFactory(newFactory);

    const newCannon = newFactory.createCannon();
    this.cannon.texture = newCannon.texture;
    this.cannon.setSpeed(newCannon.getSpeed());

    const newEnemy = newFactory.createEnemy({ x: 0, y: 0 }, EnemyType.A);
    this.enemies.forEach(oldEnemy => {
      oldEnemy.texture = newEnemy.texture;
      oldEnemy.setSpeed(newEnemy.getSpeed());
    });

    const collision = newFactory.createCollision({ x: 0, y: 0 });
    this.collisions.forEach(oldCollision => {
      oldCollision.texture = collision.texture;
    });

    this.gameInfo.destroy();
    this.gameInfo = newFactory.createGameInfo();

    this.notifyObservers({
      currentGameObjectFamilyType: newFactory instanceof GameObjectsFactory_A ? FamilyType.A : FamilyType.B,
    });
    this.update();
    return true;
  }
}
