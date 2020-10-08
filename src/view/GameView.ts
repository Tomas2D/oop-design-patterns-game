import GameController from '../controller/GameController';
import GameModel from '../model/GameModel';
import IObserver from '../interface/observer/IObserver';

class GameView implements IObserver {
  private readonly controller: GameController;
  private model: GameModel;
  private gr: PIXI.Renderer;

  constructor(model: GameModel) {
    this.model = model;

    this.controller = new GameController(model);

    this.model.registerObserver(this);
  }

  public getController() {
    return this.controller;
  }

  public render(delta: number) {
    // what to do?
  }

  public update(): void {
    this.render(0);
  }
}

export default GameView;
