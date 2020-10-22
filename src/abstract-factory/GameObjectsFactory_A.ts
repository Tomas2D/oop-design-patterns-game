import Cannon_A from '~entity/familyA/Cannon_A';
import Missile_A from '~entity/familyA/Missile_A';
import BaseGameObjectsFactory from '~abstract-factory/BaseGameObjectsFactory';
import { PositionShape } from '~interface/entity/PositionInterface';

class GameObjectsFactory_A extends BaseGameObjectsFactory {
  public createCannon(): Cannon_A {
    return new Cannon_A(
      {
        texture: this.resources['cannon'].texture,
        x: 50,
        y: 50,
        speed: 6,
      },
      this,
    );
  }

  public createMissile(position: PositionShape): Missile_A {
    return new Missile_A({
      texture: this.resources['missile'].texture,
      speed: 9,
      ...position,
    });
  }
}

export default GameObjectsFactory_A;
