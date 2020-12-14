export const GAME_CONTAINER_ID_SELECTOR: string = 'app';

export type GameConfigShape = {
  PIXI: {
    width: number;
    height: number;
    backgroundColor: any;
    autoStart: boolean;
    antialias: boolean;
  };
  GAME: {
    gravity: number;
    angleStep: number;
    collisionLifeTime: number;
    enemiesCount: number;
    enemyHealth: number;
    cannonPower: number;
    enemySpeed: number;
    minEnemySpawnOffset: number;
    statusBarHeight: number;
  };
};

export const GAME_CONFIG: GameConfigShape = {
  PIXI: {
    width: 1024,
    height: 650,
    backgroundColor: 0xaaaaaa,
    autoStart: false,
    antialias: false,
  },
  GAME: {
    gravity: 9.8,
    angleStep: 180 / 100,
    collisionLifeTime: 1000,
    enemiesCount: 250,
    enemyHealth: 100,
    cannonPower: 10,
    enemySpeed: 1,

    minEnemySpawnOffset: 200,
    statusBarHeight: 30,
  },
};

export const GAME_RESOURCE_PATH = 'resources';
