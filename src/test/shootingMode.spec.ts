import { GameModel } from '~model/GameModel';
import { createMockServer } from '~test/server';

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

test('Test changing shoot mode', async () => {
  const model = new GameModel();
  await model.loadResources();
  model.createGameObjects();

  const initialMode = model.getCannon().getShootingMode();
  model.cannonToggleShootingMode();
  let changedMode = model.getCannon().getShootingMode();
  expect(initialMode).not.toStrictEqual(changedMode);

  model.cannonToggleShootingMode();
  changedMode = model.getCannon().getShootingMode();
  expect(initialMode).toStrictEqual(changedMode);
});
