import IObservable from '~interface/observer/IObservable';
import IObserver from '~interface/observer/IObserver';
import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import GameObject, { MoveDirection } from '~entity/abstract/GameObject';
import { PositionShape } from '~interface/entity/PositionInterface';
import { AbstractGameCommand } from '~command/AbstractGameCommand';

interface IGameModel extends IObservable {
  loadResources(): Promise<unknown>;

  createGameObjects(): Promise<void>;

  notifyObservers(): void;

  registerObserver(obs: IObserver): void;

  unregisterObserver(obs: IObserver): void;

  move(direction: MoveDirection): void;

  update(): void;

  destroyMissiles(): void;

  moveMissiles(): void;

  cannonShoot(): void;

  getGameObjects(): GameObject[];

  generateEnemyPosition(): PositionShape;

  getMovingStrategy(): IMovingStrategy;

  aimCannonUp(): void;

  aimCannonDown(): void;

  cannonPowerUp(): void;

  cannonPowerDown(): void;

  cannonToggleShootingMode(): void;

  createMemento(): object;

  setMemento(memento: object): void;

  registerCommand(command: AbstractGameCommand);
  undoLastCommand(): void;
}

export default IGameModel;
