import { FamilyType } from '~abstract-factory/IGameObjectFactory';

export interface IObserverEvent {
  updateGame?: boolean;
  currentGameObjectFamilyType?: FamilyType;
}
