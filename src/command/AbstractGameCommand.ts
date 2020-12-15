import IGameModel from '~proxy/IGameModel';
import CareTaker from '~memento/CareTaker';

export abstract class AbstractGameCommand {
  protected subject: IGameModel;
  protected memento: object;

  protected abstract execute(): void;

  doExecute(): void {
    this.memento = CareTaker.getInstance().createMemento();
    this.execute();
  }

  unExecute(): void {
    CareTaker.getInstance().setMemento(this.memento);
  }
}
