import IObserver from './IObserver';

interface IObservable {
  registerObserver(obs: IObserver): void;
  unregisterObserver(obs: IObserver): void;

  notifyObservers(): void;
}

export default IObservable;
