import AbstractMissile from '~abstract-factory/entity/AbstractMissile';

interface IMovingStrategy {
  updatePosition(missile: AbstractMissile);
}

export default IMovingStrategy;
