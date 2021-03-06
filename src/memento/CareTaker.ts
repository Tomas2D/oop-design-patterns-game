import IGameModel from '~proxy/IGameModel';

/**
 * Implemented as Singleton
 */
class CareTaker {
  private gameModel: IGameModel;
  //private mementos: object[] = [];

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
    if (this.gameModel) {
      const memento = this.gameModel.createMemento();
      /*this.mementos.push(memento);

      if (this.mementos.length > GAME_CONFIG.GAME.maxMementos) {
        this.mementos.shift();
        // this.mementos.splice(0, this.mementos.length - GAME_CONFIG.GAME.maxMementos);
      }

      console.info(this.mementos.length);*/
      return memento;
    }
    return null;
  }

  /*setLastMemento() {
    if (this.gameModel !== null) {
      if (this.mementos.length > 0) {
        const lastMemento = this.mementos[this.mementos.length - 1];
        this.gameModel.setMemento(lastMemento);
      }
    }
  }*/

  setMemento(memento: object) {
    if (this.gameModel) {
      this.gameModel.setMemento(memento);
    }
  }
}

export default CareTaker;
