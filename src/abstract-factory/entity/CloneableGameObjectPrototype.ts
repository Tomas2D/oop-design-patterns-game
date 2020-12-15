import GameObject from '~abstract-factory/entity/GameObject';
import { ICloneable } from '~prototype/ICloneable';

export abstract class CloneableGameObjectPrototype extends GameObject implements ICloneable {
  abstract clone(): CloneableGameObjectPrototype;
}
