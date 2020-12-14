import GameController from '../controller/GameController';
import GameObjectsRender from '~visitor/GameObjectsRender';
import IObserver from '../interface/observer/IObserver';
import IGameModel from '~interface/proxy/IGameModel';
import { IGameGraphics } from '~interface/bridge/IGameGraphics';

class GameView implements IObserver {
  private readonly controller: GameController;
  private model: IGameModel;
  private readonly gameObjectVisitor: GameObjectsRender;
  private renderContext: IGameGraphics;

  constructor(model: IGameModel) {
    this.model = model;
    this.gameObjectVisitor = new GameObjectsRender();
    this.controller = new GameController(model);
    this.model.registerObserver(this);
  }

  public setRenderContext(renderContext: IGameGraphics) {
    this.renderContext = renderContext;
    this.gameObjectVisitor.setRenderContext(this.renderContext);
  }

  public getController() {
    return this.controller;
  }

  public render() {
    // clear context
    this.renderContext.removeChildren();
    this.renderContext.addChild(...this.model.getGameObjects());

    this.model.getGameObjects().forEach(obj => {
      obj.acceptVisitor(this.gameObjectVisitor);
    });
  }

  public update(): void {
    this.render();
  }
}

export default GameView;
