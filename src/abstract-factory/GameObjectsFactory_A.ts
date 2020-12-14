import Cannon_A from '~entity/familyA/Cannon_A';
import Missile_A from '~entity/familyA/Missile_A';
import BaseGameObjectsFactory from '~abstract-factory/BaseGameObjectsFactory';
import { PositionShape } from '~interface/entity/PositionInterface';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import Enemy_A from '~entity/familyA/Enemy_A';
import GameInfo_A from '~entity/familyA/GameInfo_A';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractCollision from '~entity/abstract/AbstractCollision';
import { EnemyType } from '~interface/abstract-factory/IGameObjectFactory';

class GameObjectsFactory_A extends BaseGameObjectsFactory {
  public createCannon(): Cannon_A {
    return new Cannon_A(
      {
        texture: this.loader.resources['cannon'].texture,
        x: 50,
        y: 50,
        speed: 6,
      },
      this,
    );
  }

  public createMissile(position: PositionShape, angle: number, velocity: number): Missile_A {
    return new Missile_A(
      {
        texture: this.loader.resources['missile'].texture,
        speed: 9,
        ...position,
      },
      angle,
      velocity,
      this.gameModel.getMovingStrategy(),
    );
  }

  public createEnemy(position: PositionShape, type: EnemyType = EnemyType.A): AbstractEnemy {
    return new Enemy_A({
      texture: this.loader.resources[`enemy${type}`].texture,
      speed: 3,
      ...position,
    });
  }

  public createGameInfo(): AbstractGameInfo {
    return new GameInfo_A();
  }

  public createCollision(position: PositionShape): AbstractCollision {
    return new AbstractCollision({
      texture: this.loader.resources['collision'].texture,
      speed: 0,
      ...position,
    });
  }

  async loadResources(): Promise<any> {
    this.loader.add(`enemy${EnemyType.A}`, 'A/enemy1.png');
    this.loader.add(`enemy${EnemyType.B}`, 'A/enemy2.png');
    this.loader.add('cannon', 'A/cannon.png');
    this.loader.add('missile', 'A/missile.png');
    this.loader.add('collision', 'A/collision.png');

    const promise = new Promise((success, error) => {
      this.loader.onComplete.add(success);
      this.loader.onError.add(error);
    });

    this.loader.load();

    return await promise;
  }
}

export default GameObjectsFactory_A;
