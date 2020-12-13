import IGameModel from '~interface/proxy/IGameModel';

export abstract class AbstractGameCommand {
  protected subject: IGameModel;
  protected memento: object;

  protected abstract execute(): void;

  public doExecute(): void {
    this.memento = this.subject.createMemento();
    this.execute();
  }

  public unExecute(): void {
    this.subject.setMemento(this.memento);
  }
}
