import IObserver from './IObserver';
import { IObserverEvent } from '~observer/IObserverEvent';

export interface IObservable {
  registerObserver(obs: IObserver): void;
  unregisterObserver(obs: IObserver): void;

  notifyObservers(e: IObserverEvent): void;
}
