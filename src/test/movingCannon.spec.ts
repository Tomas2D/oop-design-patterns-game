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

describe('Test case: Moving with cannon (Command)', () => {
  let model: GameModel;
  let initialPosition;

  beforeAll(async () => {
    model = new GameModel();
    await model.loadResources();
    model.createGameObjects();
    initialPosition = model.getCannonPosition();
  });

  // One down
  it('goes down', () => {
    model.registerCommand(new MoveCannonDown(model));
    model.update();

    const newPosition = model.getCannonPosition();
    expect(initialPosition).not.toStrictEqual(newPosition);
  });

  // One up
  it('goes up', () => {
    model.registerCommand(new MoveCannonUp(model));
    model.update();

    const newPosition = model.getCannonPosition();
    expect(newPosition).toStrictEqual(initialPosition);
  });
});
