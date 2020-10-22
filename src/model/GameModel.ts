import { Enemy, GameInfo, MoveDirection } from '../entity';
import { GAME_RESOURCE_PATH } from '~config';
import IObservable from '../interface/observer/IObservable';
import IObserver from '../interface/observer/IObserver';
import IGameObjectFactory from '~interface/abstract-factory/IGameObjectFactory';
import GameObjectsFactory_A from '~abstract-factory/GameObjectsFactory_A';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractCannon from '~entity/abstract/AbstractCannon';

class GameModel implements IObservable {
  private readonly app: PIXI.Application;

  private gameInfo: GameInfo;

  private cannon: AbstractCannon;
  private enemies: Enemy[] = [];
  private missiles: AbstractMissile[] = [];

  private observers: Array<IObserver> = [];

  private gameObjectFactory: IGameObjectFactory;

  public constructor(app: PIXI.Application) {
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

    const { loader, stage } = this.app;
    const { resources } = loader;

    this.cannon = this.gameObjectFactory.createCannon();
    this.enemies.push(
      ...[
        new Enemy({ texture: resources['enemies'].texture, x: 200, y: 100, speed: 3 }),
        new Enemy({ texture: resources['enemies'].texture, x: 250, y: 140, speed: 3 }),
        new Enemy({ texture: resources['enemies'].texture, x: 302, y: 245, speed: 3 }),
      ],
    );

    // this.missiles.push(this.gameObjectFactory.createMissile());

    // Add game objects to screen
    stage.addChild(this.cannon, ...this.enemies, ...this.missiles);
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
}

export default GameModel;
