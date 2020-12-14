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

test('Test moving with cannon (Command)', async () => {
  const model = new GameModel();

  await model.loadResources();
  model.createGameObjects();

  const initialPosition = model.getCannonPosition();

  // One down
  model.registerCommand(new MoveCannonDown(model));
  model.update();
  let newPosition = model.getCannonPosition();
  expect(initialPosition).not.toStrictEqual(newPosition);

  // One up
  model.registerCommand(new MoveCannonUp(model));
  model.update();
  newPosition = model.getCannonPosition();

  expect(newPosition).toStrictEqual(initialPosition);
});
