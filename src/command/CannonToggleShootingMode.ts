import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~proxy/IGameModel';

export class CannonToggleShootingMode extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.cannonToggleShootingMode();
  }
}
