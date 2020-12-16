import { GameModel } from '~model/GameModel';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { createMockServer } from '~test/server';
import CareTaker from '~memento/CareTaker';

let server;

beforeAll(() => {
  server = createMockServer();
});

afterAll(async () => {
  return await new Promise(resolve => server.close(resolve));
});

// Get
test('Test case: execute one command and revert it', async done => {
  const model = new GameModel();
  CareTaker.getInstance().setModel(model);
  await model.loadResources();
  model.createGameObjects();

  const oldPosition = { ...model.getCannonPosition() };

  model.registerCommand(new MoveCannonUp(model));
  model.update();

  expect(model.getCannonPosition()).not.toEqual(oldPosition);

  model.undoLastCommand();
  model.update();

  expect(model.getCannonPosition()).toEqual(oldPosition);
  await done();
});
