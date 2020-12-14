import IGameModel from '~proxy/IGameModel';

export abstract class AbstractGameCommand {
  protected subject: IGameModel;
  protected memento: object;

  protected abstract execute(): void;

  doExecute(): void {
    this.memento = this.subject.createMemento();
    this.execute();
  }

  unExecute(): void {
    this.subject.setMemento(this.memento);
  }
}
