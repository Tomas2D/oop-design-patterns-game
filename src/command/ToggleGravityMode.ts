import { AbstractGameCommand } from '~command/AbstractGameCommand';
import IGameModel from '~proxy/IGameModel';

export class ToggleGravityMode extends AbstractGameCommand {
  constructor(subject: IGameModel) {
    super();

    this.subject = subject;
  }

  protected execute() {
    this.subject.toggleGravityMode();
  }
}
