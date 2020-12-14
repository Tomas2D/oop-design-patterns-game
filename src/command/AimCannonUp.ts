import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~interface/proxy/IGameModel';
import { MoveDirection } from '~entity/abstract/GameObject';

export class AimCannonUp extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.aimCannonUp();
  }
}
