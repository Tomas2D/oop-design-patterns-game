import { GameModel } from '~model/GameModel';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { createMockServer } from '~test/server';

let server;

beforeAll(() => {
  server = createMockServer();
});

afterAll(async () => {
  return await new Promise(resolve => server.close(resolve));
});

test('Test command and his undoing (Memento)', async () => {
  const model = new GameModel();
  await model.loadResources();

  model.createGameObjects();

  const positionBeforeUndo = model.getCannonPosition();
  model.registerCommand(new MoveCannonUp(model));
  model.update();
  model.undoLastCommand();

  const positionAfterUndo = model.getCannonPosition();

  expect(positionBeforeUndo).toStrictEqual(positionAfterUndo);
});
