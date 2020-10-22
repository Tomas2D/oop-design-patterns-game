import * as PIXI from 'pixi.js';
import { GAME_CONFIG, GAME_CONTAINER_ID_SELECTOR } from './config';

import GameModel from './model/GameModel';
import GameView from './view/GameView';
import GameController from './controller/GameController';

class Game {
  private app: PIXI.Application;

  private model: GameModel;
  private view: GameView;
  private controller: GameController;

  /**
   * Init MVC
   */
  public async init() {
    // Prepare Pixi
    this.app = new PIXI.Application(GAME_CONFIG);
    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.renderer.width,
      this.app.renderer.height / this.app.renderer.resolution,
    );

    document.getElementById(GAME_CONTAINER_ID_SELECTOR)!.appendChild(this.app.view);
    document.body.style.overflow = 'hidden';

    // Init controls
    this.model = new GameModel(this.app);
    this.view = new GameView(this.model);
    this.controller = this.view.getController();

    // Init game objects from model
    await this.model.createGameObjects();

    // Fire game loop
    this.app.ticker.add(delta => {
      this.controller.processUserInput(); // move with user
      this.model.update(); // move with other game objects
      this.view.render(delta); // render score?
    });
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
