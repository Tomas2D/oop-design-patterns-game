import * as PIXI from 'pixi.js';
import { GAME_CONFIG, GAME_CONTAINER_ID_SELECTOR } from './config';

import GameView from './view/GameView';
import GameController from './controller/GameController';
import CareTaker from '~memento/CareTaker';
import IGameModel from '~proxy/IGameModel';
import { GameModel } from '~model/GameModel';
import GameModelProxy from '~proxy/GameModelProxy';
import { PixiGraphics } from '~bridge/PixiGraphics';
import { GameGraphics } from '~bridge/GameGraphics';
import { IGameGraphics } from '~bridge/IGameGraphics';

class Game {
  private app: PIXI.Application;

  private model: IGameModel;
  private view: GameView;
  private controller: GameController;

  /**
   * Init MVC
   */
  async init() {
    // Init framework
    this.app = new PIXI.Application(GAME_CONFIG.PIXI);
    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.renderer.width,
      this.app.renderer.height / this.app.renderer.resolution,
    );

    document.getElementById(GAME_CONTAINER_ID_SELECTOR)!.appendChild(this.app.view);
    document.body.style.overflow = 'hidden';

    // Init graphic
    const gr: IGameGraphics = new GameGraphics(new PixiGraphics(this.app.stage, this.app.renderer));

    // MVC
    this.model = new GameModelProxy(new GameModel(this.app.loader));
    this.view = new GameView(this.model);
    this.view.setRenderContext(gr);
    this.controller = this.view.getController();

    // Init game objects
    await this.model.loadResources();
    this.model.createGameObjects();

    // CareTaker (Singleton)
    CareTaker.getInstance().setModel(this.model);

    // Fire game loop
    this.app.ticker.maxFPS = 60;

    this.app.ticker.add(() => {
      this.controller.processUserInput(); // move with user
      this.model.update(); // move with other game objects
      this.view.render();
    });

    this.app.ticker.start();
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
