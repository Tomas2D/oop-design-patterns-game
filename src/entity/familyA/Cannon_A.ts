import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';

class Cannon_A extends AbstractCannon {
  shoot(): AbstractMissile {
    return this.gameObjectFactory.createMissile({
      x: this.position.x + 15,
      y: this.position.y + 15,
    });
  }
}

export default Cannon_A;
