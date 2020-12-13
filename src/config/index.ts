export const GAME_CONTAINER_ID_SELECTOR: string = 'app';

export type GameConfigShape = {
  PIXI: {
    width: number;
    height: number;
    backgroundColor: any;
  };
  GAME: {
    gravity: number;
    angleStep: number;
  };
};

export const GAME_CONFIG: GameConfigShape = {
  PIXI: {
    width: 1024,
    height: 650,
    backgroundColor: 0xaaaaaa,
  },
  GAME: {
    gravity: 9.8,
    angleStep: 180 / 100,
  },
};

export const GAME_RESOURCE_PATH = 'resources';
