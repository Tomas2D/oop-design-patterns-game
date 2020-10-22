import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';

class Cannon_A extends AbstractCannon {
  shoot(): AbstractMissile {
    return this.gameObjectFactory.createMissile({
      x: this.position.x + 30,
      y: this.position.y,
    });
  }
}

export default Cannon_A;
