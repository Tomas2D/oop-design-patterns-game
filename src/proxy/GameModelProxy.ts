import IGameModel from '~proxy/IGameModel';
import GameObject, { MoveDirection } from '~abstract-factory/entity/GameObject';
import IMovingStrategy from '~strategy/IMovingStrategy';
import { AbstractGameCommand } from '~command/AbstractGameCommand';
import { IPosition } from '~abstract-factory/entity/IPosition';
import IObserver from '~observer/IObserver';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

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

  createGameObjects() {
    return this.subject.createGameObjects();
  }

  createMemento(): object {
    return this.subject.createMemento();
  }

  destroyMissiles(): void {
    this.subject.destroyMissiles();
  }

  generateEnemyPosition(): IPosition {
    return this.subject.generateEnemyPosition();
  }

  getGameObjects(): GameObject[] {
    return this.subject.getGameObjects();
  }

  getMovingStrategy(): IMovingStrategy {
    return this.subject.getMovingStrategy();
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

  async loadResources() {
    return await this.subject.loadResources();
  }

  getGameInfo(): AbstractGameInfo {
    return this.subject.getGameInfo();
  }

  getLevel(): number {
    return this.subject.getLevel();
  }

  toggleGravityMode(): void {
    return this.subject.toggleGravityMode();
  }

  async toggleGameObjectFactory() {
    return await this.subject.toggleGameObjectFactory();
  }
}

export default GameModelProxy;
