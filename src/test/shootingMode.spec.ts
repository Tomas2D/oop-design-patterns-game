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

test('Test changing shoot mode', async () => {
  const model = new GameModel();
  await model.loadResources();
  model.createGameObjects();

  // One down
  const initialMode = model.getCannon().getShootingMode();
  model.cannonToggleShootingMode();
  let changedMode = model.getCannon().getShootingMode();
  expect(initialMode).not.toStrictEqual(changedMode);

  model.cannonToggleShootingMode();
  changedMode = model.getCannon().getShootingMode();
  expect(initialMode).toStrictEqual(changedMode);
});
