import GameObject from '~entity/abstract/GameObject';
import { ICloneableGameObject } from '~interface/prototype/ICloneable';

export abstract class GameObjectPrototype extends GameObject implements ICloneableGameObject {
  abstract clone(): GameObjectPrototype;
}
