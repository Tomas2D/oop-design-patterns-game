import * as PIXI from 'pixi.js';
import { GAME_CONFIG, GAME_CONTAINER_ID_SELECTOR, GAME_RESOURCE_PATH } from './config';
import GameObject from './entity/abstract/GameObject';
import Player from './entity/Player';
import keyPressConverter from './utils/keyPressConverter';

class Game {
  // @ts-ignore
  private app: PIXI.Application;
  // @ts-ignore
  private player: GameObject;
  private gameObjects: GameObject[] = [];

  private pressedKeys: string[] = [];

  public async init() {
    if (this.app) {
      console.error('Game is already initialized!');
      return;
    }

    this.app = new PIXI.Application(GAME_CONFIG);
    document.getElementById(GAME_CONTAINER_ID_SELECTOR)!.appendChild(this.app.view);

    await this.loadResources();
    await this.addGameObjects();

    this.processUserInput();

    this.app.ticker.add(this.gameLoop(this));
  }

  private async loadResources() {
    const { loader } = this.app;

    loader.baseUrl = GAME_RESOURCE_PATH;
    loader.add('logo', 'fit-icon-256x256.png');

    const promise = new Promise((success, error) => {
      loader.onComplete.add(success);
      loader.onError.add(error);
    });

    loader.load();

    return await promise;
  }

  private gameLoop(game: Game) {
    return function (delta: number) {
      // Move with player
      game.pressedKeys.forEach(key => {
        const direction = keyPressConverter(key);
        console.info(direction);
        if (direction !== null) {
          game.player.move(direction);
        }
      });
    };
  }

  private async addGameObjects() {
    const { loader, stage } = this.app;
    const { resources } = loader;

    this.player = new Player({ texture: resources['logo'].texture, x: 250, y: 250, speed: 6 });
    stage.addChild(this.player);

    this.gameObjects.forEach(gameObject => {
      stage.addChild(gameObject);
    });
  }

  private processUserInput() {
    window.addEventListener(
      'keydown',
      e => {
        if (!this.pressedKeys.includes(e.key)) {
          this.pressedKeys.push(e.key);
        }
      },
      false,
    );
    window.addEventListener(
      'keyup',
      e => {
        this.pressedKeys = this.pressedKeys.filter(key => key !== e.key);
      },
      false,
    );
  }
}

// Init the engine
export default async function () {
  const game = new Game();

  try {
    await game.init();
  } catch (e) {
    console.error('Game has crashed...', e);
  }
}
