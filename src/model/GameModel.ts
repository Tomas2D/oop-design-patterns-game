import * as PIXI from 'pixi.js';
import { Loader } from 'pixi.js';

import { GAME_CONFIG, GAME_RESOURCE_PATH } from '~config';
import IObserver from '../interface/observer/IObserver';
import IGameObjectFactory, { EnemyType } from '~interface/abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import GameObject, { GameObjectSizes, MoveDirection } from '~entity/abstract/GameObject';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import { PositionShape } from '~interface/entity/PositionInterface';
import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import RealisticMovingStrategy from '~strategy/RealisticMovingStrategy';
import IGameModel from '~interface/proxy/IGameModel';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { Queue } from 'queue-typescript';
import { Stack } from 'stack-typescript';
import AbstractCollision from '~entity/abstract/AbstractCollision';

// As there is no export, it is like Java private class
class Memento {
  public score: number;
  public cannonX: number;
  public cannonY: number;
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

  /* Strategies */
  private readonly movingStrategy: IMovingStrategy;

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

  createGameObjects(enemiesCount = 10) {
    this.cannon = this.gameObjectFactory.createCannon();
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
    this.notifyObservers();

    if (this.enemies.length === 0) {
      this.createEnemies(GAME_CONFIG.GAME.enemiesCount);
    }
  }

  destroyMissiles() {
    for (let index = this.missiles.length - 1; index >= 0; index--) {
      const missile = this.missiles[index];
      if (missile.position.x > GAME_CONFIG.PIXI.width) {
        this.missiles.splice(index, 1);
      }
    }
  }

  private checkCollision(a: GameObjectSizes, b: GameObjectSizes) {
    return a.x + a.width > b.x && a.x < b.x + b.width && a.y + a.height > b.y && a.y < b.y + b.height;
  }

  moveMissiles() {
    for (let i = this.missiles.length - 1; i >= 0; i--) {
      const missile = this.missiles[i];
      missile.move();

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const enemy = this.enemies[j];

        if (this.checkCollision(missile, enemy)) {
          enemy.hp -= this.cannon.getPower();

          this.missiles.splice(i, 1);

          if (enemy.hp <= 0) {
            const collision = this.gameObjectFactory.createCollision({ x: enemy.x, y: enemy.y });
            this.collisions.push(collision);

            this.missiles.splice(i, 1);
            this.enemies.splice(j, 1);
            this.score++;
          }
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

  getGameObjects(): GameObject[] {
    return [this.cannon, ...this.missiles, ...this.enemies, ...this.collisions];
  }

  getEnemies(): AbstractEnemy[] {
    return this.enemies;
  }

  generateEnemyPosition(): PositionShape {
    const { width: clientWidth, height: clientHeight } = GAME_CONFIG.PIXI;

    const position = {
      x: Math.max(250, (100 + Math.floor(clientWidth / Math.random())) % (clientWidth - 50)),
      y: Math.max(110, (100 + Math.floor(clientHeight / Math.random())) % (clientHeight - 50)),
    };

    const hasCollision = this.enemies.some(enemy => {
      return this.checkCollision(enemy, { ...position, width: enemy.width + 50, height: enemy.height + 25 });
    });

    // Generate again
    if (hasCollision) {
      return this.generateEnemyPosition();
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

  getCannonPosition(): PositionShape {
    return { x: this.cannon.x, y: this.cannon.y };
  }

  createMemento(): object {
    const m = new Memento();
    m.score = this.score;
    m.cannonX = this.cannon.x;
    m.cannonY = this.cannon.y;

    return m;
  }

  setMemento(memento: object) {
    const m: Memento = memento as Memento;

    this.score = m.score;
    this.cannon.position.set(m.cannonX, m.cannonY);
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
    this.collisions = this.collisions.filter(collision => {
      return collision.getAge() * 1000 < GAME_CONFIG.GAME.collisionLifeTime;
    });
  }
}
