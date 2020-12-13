import AbstractCannon from '~entity/abstract/AbstractCannon';

interface IShootingMode {
  getName(): string;
  shoot(cannon: AbstractCannon);
}

export default IShootingMode;
