import Cannon_A from '~entity/familyA/Cannon_A';
import Missile_A from '~entity/familyA/Missile_A';
import BaseGameObjectsFactory from '~abstract-factory/BaseGameObjectsFactory';
import { PositionShape } from '~interface/entity/PositionInterface';
import { Enemy } from '~entity';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import Enemy_A from '~entity/familyA/Enemy_A';
import GameInfo_A from '~entity/familyA/GameInfo_A';

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

  public createEnemy(position: PositionShape): Enemy {
    return new Enemy_A({
      texture: this.resources['enemies'].texture,
      speed: 3,
      ...position,
    });
  }

  public createGameInfo(): AbstractGameInfo {
    return new GameInfo_A();
  }
}

export default GameObjectsFactory_A;
