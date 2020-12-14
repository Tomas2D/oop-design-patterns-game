import { GameModel } from '~model/GameModel';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { createMockServer } from '~test/server';
import { MoveCannonDown } from '~command/MoveCannonDown';

let server;

beforeAll(() => {
  server = createMockServer();
});

afterAll(async () => {
  return await new Promise(resolve => server.close(resolve));
});

test('Test killing enemy', async () => {
  const model = new GameModel();
  await model.loadResources();

  model.createGameObjects(1);

  const cannon = model.getCannon();
  const enemy = model.getEnemies()[0];

  // Set enemy to "same" position as cannon
  enemy.position.set(cannon.x + 50, cannon.y);
  model.update();

  model.cannonShoot();

  expect(model.getEnemies()).toHaveLength(0);
});
