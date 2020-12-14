import IObserver from './IObserver';

export interface IObservable {
  registerObserver(obs: IObserver): void;
  unregisterObserver(obs: IObserver): void;

  notifyObservers(): void;
}
