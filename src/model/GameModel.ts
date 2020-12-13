import * as PIXI from 'pixi.js';

import { GAME_RESOURCE_PATH } from '~config';
import IObserver from '../interface/observer/IObserver';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import GameObject, { MoveDirection } from '~entity/abstract/GameObject';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import { PositionShape } from '~interface/entity/PositionInterface';
import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import RealisticMovingStrategy from '~strategy/RealisticMovingStrategy';
import IGameModel from '~interface/proxy/IGameModel';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { Queue } from 'queue-typescript';
import { Stack } from 'stack-typescript';

class Memento {
  public score: number;
}

class GameModel implements IGameModel {
  readonly app: PIXI.Application;

  /* Game objects */
  private cannon: AbstractCannon;
  private enemies: AbstractEnemy[] = [];
  private missiles: AbstractMissile[] = [];
  private gameInfo: AbstractGameInfo;

  /** Game commands */
  private unexecutedCommands: Queue<AbstractGameCommand>;
  private executedCommands: Stack<AbstractGameCommand>;

  /* Observers */
  private observers: Array<IObserver> = [];

  /* Factories */
  private gameObjectFactory: IGameObjectFactory;

  /* Score */
  private score: number = 0;

  /* Strategies */
  readonly movingStrategy: IMovingStrategy;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.gameObjectFactory = new GameObjectsFactory_A(app.loader.resources, this);
    this.movingStrategy = new RealisticMovingStrategy();
  }

  async loadResources() {
    const { loader } = this.app;

    loader.baseUrl = GAME_RESOURCE_PATH;
    loader.add('logo', 'fit-icon-256x256.png');
    loader.add('enemies', 'enemy1.png');
    loader.add('cannon', 'cannon.png');
    loader.add('missile', 'missile.png');

    const promise = new Promise((success, error) => {
      loader.onComplete.add(success);
      loader.onError.add(error);
    });

    loader.load();

    return await promise;
  }

  async createGameObjects() {
    // Firstly we need to load resources
    await this.loadResources();

    this.cannon = this.gameObjectFactory.createCannon();

    const enemy = this.gameObjectFactory.createEnemy(this.generateEnemyPosition());
    this.enemies.push(enemy);

    for (let i = 0; i < 5; i++) {
      const clonedEnemy = enemy.clone();
      const { x, y } = this.generateEnemyPosition();
      enemy.position.set(x, y);

      this.enemies.push(clonedEnemy);
    }

    // Add game objects to screen
    this.app.stage.addChild(...this.getGameObjects());
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
    this.notifyObservers();
  }

  destroyMissiles() {
    for (let index = this.missiles.length - 1; index >= 0; index--) {
      const missile = this.missiles[index];
      if (missile.position.x > this.app.screen.right) {
        this.app.stage.removeChild(missile);
        this.missiles.splice(index, 1);
      }
    }
  }

  moveMissiles() {
    this.missiles.forEach(missile => {
      missile.move();
    });

    this.destroyMissiles();
    this.notifyObservers();
  }

  cannonShoot() {
    const missiles = this.cannon.shoot();
    this.missiles.push(...missiles);

    this.app.stage.addChild(...missiles);
    this.notifyObservers();
  }

  getGameObjects(): GameObject[] {
    return [this.cannon, ...this.missiles, ...this.enemies];
  }

  generateEnemyPosition(): PositionShape {
    const { clientWidth, clientHeight } = this.app.view;

    return {
      x: Math.max(250, (100 + Math.floor(clientWidth / Math.random())) % (clientWidth - 50)),
      y: Math.max(110, (100 + Math.floor(clientHeight / Math.random())) % (clientHeight - 50)),
    };
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
    console.info('Changing shooting mode');
    this.cannon.toggleShootingMode();
  }

  createMemento(): object {
    const memento = new Memento();
    memento.score = this.score;
    return memento;
  }

  // @ts-ignore
  setMemento(memento: object) {
    const m: Memento = memento as Memento;

    this.score = m.score;
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
}

export default GameModel;
