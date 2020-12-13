import * as PIXI from 'pixi.js';
import { GAME_CONFIG, GAME_CONTAINER_ID_SELECTOR } from './config';

import GameView from './view/GameView';
import GameController from './controller/GameController';
import CareTaker from '~memento/CareTaker';
import IGameModel from '~interface/proxy/IGameModel';
import GameModel from '~model/GameModel';
import GameModelProxy from '~proxy/GameModelProxy';

class Game {
  private app: PIXI.Application;

  private model: IGameModel;
  private view: GameView;
  private controller: GameController;

  /**
   * Init MVC
   */
  public async init() {
    // Prepare Pixi
    this.app = new PIXI.Application(GAME_CONFIG.PIXI);
    this.app.stage.hitArea = new PIXI.Rectangle(
      0,
      0,
      this.app.renderer.width,
      this.app.renderer.height / this.app.renderer.resolution,
    );

    document.getElementById(GAME_CONTAINER_ID_SELECTOR)!.appendChild(this.app.view);
    document.body.style.overflow = 'hidden';

    // MVC
    this.model = new GameModelProxy(new GameModel(this.app));
    this.view = new GameView(this.model);
    this.view.setRenderContext(this.app.stage);

    this.controller = this.view.getController();

    // Init game objects
    await this.model.createGameObjects();

    // Fire game loop
    this.app.ticker.add(delta => {
      this.controller.processUserInput(); // move with user
      this.model.update(); // move with other game objects
      this.view.render(); // render score?
      this.app.render();
    });

    // CareTaker
    CareTaker.getInstance().setModel(this.model);
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
