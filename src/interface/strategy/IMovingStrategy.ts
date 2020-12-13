import AbstractMissile from '~entity/abstract/AbstractMissile';

interface IMovingStrategy {
  updatePosition(missile: AbstractMissile);
}

export default IMovingStrategy;
