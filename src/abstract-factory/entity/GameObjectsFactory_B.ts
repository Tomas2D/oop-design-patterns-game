import BaseGameObjectsFactory from '~abstract-factory/BaseGameObjectsFactory';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import { EnemyType } from '~abstract-factory/IGameObjectFactory';
import Cannon_B from '~abstract-factory/entity/familyB/Cannon_B';
import { IPosition } from '~abstract-factory/entity/IPosition';
import Enemy_B from '~abstract-factory/entity/familyB/Enemy_B';
import GameInfo_B from '~abstract-factory/entity/familyB/GameInfo_B';
import Missile_B from '~abstract-factory/entity/familyB/Missile_B';
import { GAME_CONFIG } from '~config';
import Collision_B from '~abstract-factory/entity/familyB/Collision_B';
import { default as sound } from 'pixi-sound';

class GameObjectsFactory_B extends BaseGameObjectsFactory {
  createCannon(): Cannon_B {
    const shootSound = sound?.find('shootSound');
    if (shootSound) {
      shootSound.volume = 0.1;
    }

    return new Cannon_B(
      {
        texture: this.loader.resources['cannonB'].texture,
        x: 50,
        y: 250,
        speed: 10,
      },
      this,
      shootSound,
    );
  }

  createMissile(position: IPosition, angle: number, velocity: number): Missile_B {
    return new Missile_B(
      {
        texture: this.loader.resources['missileB'].texture,
        speed: 10,
        ...position,
      },
      angle,
      velocity,
      this.gameModel.getMovingStrategy(),
    );
  }

  createEnemy(position: IPosition, type: EnemyType = EnemyType.A): AbstractEnemy {
    const level = this.gameModel.getLevel();

    return new Enemy_B(
      {
        texture: this.loader.resources[`enemy${type}B`].texture,
        speed: GAME_CONFIG.GAME.enemySpeed + level,
        ...position,
      },
      sound?.find('hitSound'),
      sound?.find('killSound'),
    );
  }

  createGameInfo(): AbstractGameInfo {
    const obj = new GameInfo_B(
      {
        fontFamily: 'Arial',
        fontSize: 16,
        fill: 0xbf00e9,
      },
      sound?.find('levelUpSound'),
    );
    obj.position.set(5, 5);
    return obj;
  }

  createCollision(position: IPosition): AbstractCollision {
    return new Collision_B({
      texture: this.loader.resources['collisionB'].texture,
      speed: 0,
      ...position,
    });
  }

  async loadResources(): Promise<any> {
    if (this.loader.resources[`enemy${EnemyType.A}B`]) {
      return;
    }

    this.loader.add(`enemy${EnemyType.A}B`, 'B/enemy1.png');
    this.loader.add(`enemy${EnemyType.B}B`, 'B/enemy2.png');
    this.loader.add('cannonB', 'B/cannon.png');
    this.loader.add('missileB', 'B/missile.png');
    this.loader.add('collisionB', 'B/collision.png');

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

export default GameObjectsFactory_B;
