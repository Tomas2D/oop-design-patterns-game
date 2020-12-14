import IMovingStrategy from '~strategy/IMovingStrategy';
import GameObject, { MoveDirection } from '~abstract-factory/entity/GameObject';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { IObservable } from '~observer/IObservable';
import IObserver from '~observer/IObserver';
import { IPosition } from '~abstract-factory/entity/IPosition';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

interface IGameModel extends IObservable {
  createGameObjects();

  notifyObservers(): void;

  registerObserver(obs: IObserver): void;

  unregisterObserver(obs: IObserver): void;

  move(direction: MoveDirection): void;

  update(): void;

  destroyMissiles(): void;

  moveMissiles(): void;

  cannonShoot(): void;

  getGameInfo(): AbstractGameInfo;

  getGameObjects(): GameObject[];

  generateEnemyPosition(): IPosition;

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

  loadResources();

  getLevel(): number;
}

export default IGameModel;
