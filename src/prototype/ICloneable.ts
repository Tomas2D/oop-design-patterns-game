import { GameObjectPrototype } from '~abstract-factory/entity/GameObjectPrototype';

export interface ICloneableGameObject {
  clone(): GameObjectPrototype;
}
