import AbstractCannon from '~abstract-factory/entity/AbstractCannon';

interface IShootingMode {
  getName(): string;
  shoot(cannon: AbstractCannon);
}

export default IShootingMode;
