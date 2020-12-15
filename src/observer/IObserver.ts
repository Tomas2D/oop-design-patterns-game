import { IObserverEvent } from '~observer/IObserverEvent';

interface IObserver {
  update(e: IObserverEvent): void;
}

export default IObserver;
