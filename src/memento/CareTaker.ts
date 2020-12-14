import IGameModel from '~proxy/IGameModel';

class CareTaker {
  private gameModel: IGameModel;
  private mementos: object[] = [];

  private static SingletonHolder = class {
    static INSTANCE: CareTaker = new CareTaker();
  };

  static getInstance(): CareTaker {
    return this.SingletonHolder.INSTANCE;
  }

  setModel(gameModel: IGameModel) {
    this.gameModel = gameModel;
  }

  createMemento(): object {
    if (this.gameModel !== null) {
      const memento = this.gameModel.createMemento();
      this.mementos.push(memento);

      return memento;
    }
    return null;
  }

  setLastMemento() {
    if (this.gameModel !== null) {
      if (this.mementos.length > 0) {
        const lastMemento = this.mementos[this.mementos.length - 1];
        this.gameModel.setMemento(lastMemento);
      }
    }
  }
}

export default CareTaker;
