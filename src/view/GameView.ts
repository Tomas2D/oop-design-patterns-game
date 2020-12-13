import GameController from '../controller/GameController';
import GameObjectsRender from '~visitor/GameObjectsRender';
import IObserver from '../interface/observer/IObserver';
import * as PIXI from 'pixi.js';
import IGameModel from '~interface/proxy/IGameModel';

class GameView implements IObserver {
  private readonly controller: GameController;
  private model: IGameModel;
  private readonly gameObjectVisitor;
  private visitorRenderContext: PIXI.Container;

  constructor(model: IGameModel) {
    this.model = model;
    this.gameObjectVisitor = new GameObjectsRender();
    this.controller = new GameController(model);
    this.model.registerObserver(this);
  }

  public setRenderContext(renderContext: PIXI.Container) {
    const visitorRenderContext = new PIXI.Container();
    visitorRenderContext.setParent(renderContext);

    this.visitorRenderContext = visitorRenderContext;
    this.gameObjectVisitor.setRenderContext(this.visitorRenderContext);
  }

  public getController() {
    return this.controller;
  }

  public render() {
    // clear context
    this.visitorRenderContext.removeChildren();

    this.model.getGameObjects().forEach(obj => {
      obj.acceptVisitor(this.gameObjectVisitor);
    });
  }

  public update(): void {
    this.render();
  }
}

export default GameView;
