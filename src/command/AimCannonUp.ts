import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~proxy/IGameModel';

export class AimCannonUp extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.aimCannonUp();
  }
}
