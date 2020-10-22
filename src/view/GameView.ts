import GameController from '../controller/GameController';
import GameModel from '../model/GameModel';
import GameObjectsRender from '~visitor/GameObjectsRender';
import IObserver from '../interface/observer/IObserver';
import * as PIXI from 'pixi.js';

class GameView implements IObserver {
  private readonly controller: GameController;
  private model: GameModel;
  private readonly gameObjectVisitor;
  private visitorRenderContext: PIXI.Container;

  constructor(model: GameModel) {
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

  public render(delta: number) {
    // clear context
    this.visitorRenderContext.removeChildren();

    this.model.getGameObjects().forEach(obj => {
      obj.acceptVisitor(this.gameObjectVisitor);
    });
  }

  public update(): void {
    this.render(0);
  }
}

export default GameView;
