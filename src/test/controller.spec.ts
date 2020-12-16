import { GameModel } from '~model/GameModel';
import GameController from '~controller/GameController';
import { MoveCannonDown } from '~command/MoveCannonDown';
import { MoveCannonUp } from '~command/MoveCannonUp';
import { CannonShoot } from '~command/CannonShoot';

jest.mock('~model/GameModel');

test('Test controller', async () => {
  const model = new GameModel(); // mocked
  const controller = new GameController(model);

  const keysToPress = [
    {
      key: 'ArrowUp',
      command: MoveCannonUp,
    },
    {
      key: 'ArrowDown',
      command: MoveCannonDown,
    },
    {
      key: 'Space',
      command: CannonShoot,
    },
  ];

  keysToPress.forEach((commandDetail, count) => {
    window.dispatchEvent(new KeyboardEvent('keydown', { code: commandDetail.key }));
    controller.processUserInput();

    expect(model.registerCommand).toHaveBeenCalledTimes(count + 1);
    expect(model.registerCommand).toHaveBeenNthCalledWith(count + 1, expect.any(commandDetail.command));

    window.dispatchEvent(new KeyboardEvent('keyup', { code: commandDetail.key }));
  });
});
