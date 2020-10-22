import * as PIXI from 'pixi.js';

import { GAME_RESOURCE_PATH } from '~config';
import IObservable from '../interface/observer/IObservable';
import IObserver from '../interface/observer/IObserver';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import GameObject, { MoveDirection } from '~entity/abstract/GameObject';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import { PositionShape } from '~interface/entity/PositionInterface';

class GameModel implements IObservable {
  private readonly app: PIXI.Application;

  /* Game objects */
  private cannon: AbstractCannon;
  private enemies: AbstractEnemy[] = [];
  private missiles: AbstractMissile[] = [];
  private gameInfo: AbstractGameInfo;

  /* Observers */
  private observers: Array<IObserver> = [];

  /* Factories */
  private gameObjectFactory: IGameObjectFactory;

  /* Score */
  private score: number = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.gameObjectFactory = new GameObjectsFactory_A(app.loader.resources);
  }

  private async loadResources() {
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

  public async createGameObjects() {
    // Firstly we need to load resources
    await this.loadResources();

    this.cannon = this.gameObjectFactory.createCannon();
    for (let i = 0; i < 5; i++) {
      const position: PositionShape = this.generateEnemyPosition();
      this.enemies.push(this.gameObjectFactory.createEnemy(position));
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

  public update() {
    this.moveMissiles();
    this.destroyMissiles();
    this.notifyObservers();
  }

  public destroyMissiles() {
    for (let index = this.missiles.length - 1; index >= 0; index--) {
      const missile = this.missiles[index];
      if (missile.position.x > this.app.screen.right) {
        this.app.stage.removeChild(missile);
        this.missiles.splice(index, 1);
      }
    }
  }

  public moveMissiles() {
    this.missiles.forEach(missile => {
      missile.move(MoveDirection.RIGHT);
    });
  }

  public cannonShoot() {
    const missile = this.cannon.shoot();
    this.missiles.push(missile);

    this.app.stage.addChild(missile);
    this.notifyObservers();
  }

  public getGameObjects(): GameObject[] {
    return [this.cannon, ...this.missiles, ...this.enemies];
  }

  private generateEnemyPosition(): PositionShape {
    const { clientWidth, clientHeight } = this.app.view;

    return {
      x: Math.max(250, (100 + Math.floor(clientWidth / Math.random())) % (clientWidth - 50)),
      y: Math.max(110, (100 + Math.floor(clientHeight / Math.random())) % (clientHeight - 50)),
    };
  }
}

export default GameModel;
