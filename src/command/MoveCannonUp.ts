import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~proxy/IGameModel';
import { MoveDirection } from '~abstract-factory/entity/GameObject';

export class MoveCannonUp extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.move(MoveDirection.TOP);
  }
}
