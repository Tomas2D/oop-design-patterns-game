import { GameObjectPrototype } from '~entity/abstract/GameObjectPrototype';

export interface ICloneableGameObject {
  clone(): GameObjectPrototype;
}
