import { GameObject, MoveDirection, Enemy, Cannon, GameInfo, Missile } from '../entity';
import { GAME_RESOURCE_PATH } from '../config';
import IObservable from '../interface/observer/IObservable';
import IObserver from '../interface/observer/IObserver';

class GameModel implements IObservable {
  private player: GameObject;
  private gameInfo: GameInfo;
  private enemy: Enemy[] = [];
  private missile: Missile[] = [];

  private observers: Array<IObserver> = [];

  public async loadResources(app: PIXI.Application) {
    const { loader } = app;

    loader.baseUrl = GAME_RESOURCE_PATH;
    loader.add('logo', 'fit-icon-256x256.png');
    loader.add('enemy', 'enemy1.png');
    loader.add('cannon', 'cannon.png');
    loader.add('missile', 'missile.png');

    const promise = new Promise((success, error) => {
      loader.onComplete.add(success);
      loader.onError.add(error);
    });

    loader.load();

    return await promise;
  }

  public createGameObjects(app: PIXI.Application) {
    const { loader, stage } = app;
    const { resources } = loader;

    this.player = new Cannon({ texture: resources['cannon'].texture, x: 50, y: 50, speed: 6 });
    this.enemy.push(
      ...[
        new Enemy({ texture: resources['enemy'].texture, x: 200, y: 100, speed: 3 }),
        new Enemy({ texture: resources['enemy'].texture, x: 250, y: 140, speed: 3 }),
        new Enemy({ texture: resources['enemy'].texture, x: 302, y: 245, speed: 3 }),
      ],
    );

    this.missile.push(...[new Missile({ texture: resources['missile'].texture, x: 200, y: 200, speed: 9 })]);

    // Add game objects to screen
    stage.addChild(this.player, ...this.enemy, ...this.missile);
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
    this.player.move(direction);
    this.notifyObservers();
  }

  public update() {
    // nothing
  }
}

export default GameModel;
