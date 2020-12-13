import IGameModel from '~interface/proxy/IGameModel';

class CareTaker {
  private gameModel: IGameModel;
  private mementos: object[] = [];

  private static SingletonHolder = class {
    static INSTANCE: CareTaker = new CareTaker();
  };

  public static getInstance(): CareTaker {
    return this.SingletonHolder.INSTANCE;
  }

  public setModel(gameModel: IGameModel) {
    this.gameModel = gameModel;
  }

  public createMemento(): object {
    // TODO: use commands
    if (this.gameModel !== null) {
      const memento = this.gameModel.createMemento();
      this.mementos.push(memento);

      return memento;
    }
    return null;
  }

  public setMemento(memento: object) {
    if (this.gameModel !== null) {
      this.gameModel.setMemento(memento);
    }
  }
}

export default CareTaker;
