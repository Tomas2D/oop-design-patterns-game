import IGameModel from '~interface/proxy/IGameModel';
import { PositionShape } from '~interface/entity/PositionInterface';
import GameObject, { MoveDirection } from '~entity/abstract/GameObject';
import IMovingStrategy from '~interface/strategy/IMovingStrategy';
import IObserver from '~interface/observer/IObserver';
import { AbstractGameCommand } from '~command/AbstractGameCommand';

class GameModelProxy implements IGameModel {
  private subject: IGameModel;

  constructor(subject: IGameModel) {
    this.subject = subject;
  }

  registerCommand(command: AbstractGameCommand) {
    this.subject.registerCommand(command);
  }

  undoLastCommand(): void {
    this.subject.undoLastCommand();
  }

  aimCannonDown(): void {
    this.subject.aimCannonDown();
  }

  aimCannonUp(): void {
    this.subject.aimCannonUp();
  }

  cannonPowerDown(): void {
    this.subject.cannonPowerDown();
  }

  cannonPowerUp(): void {
    this.subject.cannonPowerUp();
  }

  cannonShoot(): void {
    this.subject.cannonShoot();
  }

  cannonToggleShootingMode(): void {
    this.subject.cannonToggleShootingMode();
  }

  async createGameObjects(): Promise<void> {
    return await this.subject.createGameObjects();
  }

  createMemento(): object {
    return this.subject.createMemento();
  }

  destroyMissiles(): void {
    this.subject.destroyMissiles();
  }

  generateEnemyPosition(): PositionShape {
    return this.subject.generateEnemyPosition();
  }

  getGameObjects(): GameObject[] {
    return this.subject.getGameObjects();
  }

  getMovingStrategy(): IMovingStrategy {
    return this.subject.getMovingStrategy();
  }

  async loadResources(): Promise<unknown> {
    return await this.subject.loadResources();
  }

  move(direction: MoveDirection): void {
    return this.subject.move(direction);
  }

  moveMissiles(): void {
    this.subject.moveMissiles();
  }

  notifyObservers(): void {
    this.subject.notifyObservers();
  }

  registerObserver(obs: IObserver): void {
    this.subject.registerObserver(obs);
  }

  setMemento(memento: object): void {
    this.subject.setMemento(memento);
  }

  unregisterObserver(obs: IObserver): void {
    this.subject.unregisterObserver(obs);
  }

  update(): void {
    this.subject.update();
  }
}

export default GameModelProxy;
