import GameController from '../controller/GameController';
import GameObjectsRender from '~visitor/GameObjectsRender';
import IObserver from '../observer/IObserver';
import IGameModel from '~proxy/IGameModel';
import { IGameGraphics } from '~bridge/IGameGraphics';
import { IObserverEvent } from '~observer/IObserverEvent';

class GameView implements IObserver {
  private readonly controller: GameController;
  private readonly gameObjectRenderer: GameObjectsRender;

  private model: IGameModel;
  private renderContext: IGameGraphics;

  constructor(model: IGameModel) {
    this.model = model;
    this.gameObjectRenderer = new GameObjectsRender();
    this.controller = new GameController(model);
    this.model.registerObserver(this);
  }

  setRenderContext(renderContext: IGameGraphics) {
    if (this.renderContext) {
      this.renderContext.removeChildren(); // clear
    }
    this.renderContext = renderContext;
    this.gameObjectRenderer.setRenderContext(this.renderContext);

    this.renderContext.drawHelp();
  }

  getController() {
    return this.controller;
  }

  render() {
    this.model.getGameObjects().forEach(obj => {
      obj.acceptVisitor(this.gameObjectRenderer);
    });

    this.model.getGameInfo().acceptVisitor(this.gameObjectRenderer);
  }

  update(e?: IObserverEvent): void {
    if (e?.updateGame) {
      this.renderContext.removeChildren();
      this.renderContext.drawHelp();
      this.model.getGameObjects().forEach(obj => {
        obj.removeChildren();
      });
    }
    this.render();
  }
}

export default GameView;
