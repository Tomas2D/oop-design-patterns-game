import BaseGameObjectsFactory from '~abstract-factory/BaseGameObjectsFactory';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import { EnemyType } from '~abstract-factory/IGameObjectFactory';
import Cannon_A from '~abstract-factory/entity/familyA/Cannon_A';
import { IPosition } from '~abstract-factory/entity/IPosition';
import Enemy_A from '~abstract-factory/entity/familyA/Enemy_A';
import GameInfo_A from '~abstract-factory/entity/familyA/GameInfo_A';
import Missile_A from '~abstract-factory/entity/familyA/Missile_A';
import { GAME_CONFIG } from '~config';
import Collision_A from '~abstract-factory/entity/familyA/Collision_A';
import { default as sound } from 'pixi-sound';

class GameObjectsFactory_A extends BaseGameObjectsFactory {
  createCannon(): Cannon_A {
    const shootSound = sound?.find('shootSound');
    if (shootSound) {
      shootSound.volume = 0.15;
    }

    return new Cannon_A(
      {
        texture: this.loader.resources['cannonA'].texture,
        x: 50,
        y: 150,
        speed: 6,
      },
      this,
      shootSound,
    );
  }

  createMissile(position: IPosition, angle: number, velocity: number): Missile_A {
    return new Missile_A(
      {
        texture: this.loader.resources['missileA'].texture,
        speed: 9,
        ...position,
      },
      angle,
      velocity,
      this.gameModel.getMovingStrategy(),
    );
  }

  createEnemy(position: IPosition, type: EnemyType = EnemyType.A): AbstractEnemy {
    const level = this.gameModel.getLevel();

    return new Enemy_A(
      {
        texture: this.loader.resources[`enemy${type}A`].texture,
        speed: GAME_CONFIG.GAME.enemySpeed + level - 1,
        ...position,
      },
      sound?.find('hitSound'),
      sound?.find('killSound'),
    );
  }

  createGameInfo(): AbstractGameInfo {
    const obj = new GameInfo_A(
      {
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0x2aa700,
      },
      sound?.find('levelUpSound'),
    );
    obj.position.set(5, 5);
    return obj;
  }

  createCollision(position: IPosition): AbstractCollision {
    return new Collision_A({
      texture: this.loader.resources['collisionA'].texture,
      speed: 0,
      ...position,
    });
  }

  async loadResources(): Promise<any> {
    if (this.loader.resources[`enemy${EnemyType.A}A`]) {
      return;
    }

    this.loader.add(`enemy${EnemyType.A}A`, 'A/enemy1.png');
    this.loader.add(`enemy${EnemyType.B}A`, 'A/enemy2.png');
    this.loader.add('cannonA', 'A/cannon.png');
    this.loader.add('missileA', 'A/missile.png');
    this.loader.add('collisionA', 'A/collision.png');

    if (sound && !this.loader?.resources['shootSound']) {
      this.loader.add('shootSound', 'sounds/shoot.mp3');
      this.loader.add('hitSound', 'sounds/hit.mp3');
      this.loader.add('killSound', 'sounds/kill.mp3');
      this.loader.add('levelUpSound', 'sounds/level_up.mp3');
    }

    const promise = new Promise((success, error) => {
      this.loader.onComplete.add(success);
      this.loader.onError.add(error);
    });

    this.loader.load();

    return await promise;
  }
}

export default GameObjectsFactory_A;
