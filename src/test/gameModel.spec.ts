import { GameModel } from '~model/GameModel';
import { createMockServer } from '~test/server';
import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import { GAME_CONFIG } from '~config';

let server;

beforeAll(() => {
  server = createMockServer();
});

beforeEach(() => {
  document.body.innerHTML = '';
});

afterAll(async () => {
  return await new Promise(resolve => server.close(resolve));
});

describe('Test case: Game model', () => {
  // Init game model
  let model: GameModel;
  let cannon: AbstractCannon;
  let currentLevel;

  beforeAll(async () => {
    model = new GameModel();
    await model.loadResources();
    model.createGameObjects();
    currentLevel = model.getLevel();
    cannon = model.getCannon();
  });

  it('Kill all enemies', () => {
    jest.spyOn(model, 'createEnemies').mockReturnValue();
    jest.spyOn(model, 'checkCollision').mockReturnValue(true);

    model.getEnemies().forEach(enemy => {
      enemy.setHp(model.getCannon().getPower());
      model.cannonShoot();
    });

    model.update();
    expect(model.getEnemies()).toHaveLength(0);
  });

  it('Test if level goes up', async () => {
    expect(model.getLevel()).toBe(currentLevel + 1);
  });

  it('Test if score goes up', async () => {
    const currentLevel = model.getLevel();
    const enemiesPerRound = GAME_CONFIG.GAME.enemiesCount;

    expect(model.getScore()).toBe((currentLevel - 1) * enemiesPerRound);
  });

  it('Test if all game objects (except Cannon) are removed', async () => {
    await new Promise(resolve => setTimeout(resolve, GAME_CONFIG.GAME.collisionLifeTime));
    model.update();

    expect(model.getGameObjects()).toHaveLength(1);
  });
});
