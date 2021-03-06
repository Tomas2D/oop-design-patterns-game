import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~proxy/IGameModel';
import { MoveDirection } from '~abstract-factory/entity/GameObject';

export class MoveCannonDown extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.move(MoveDirection.BOTTOM);
  }
}
