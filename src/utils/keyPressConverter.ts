import { MoveDirection } from '../entity/abstract/GameObject';

const allowedKeysForMove = {
  ArrowLeft: MoveDirection.LEFT,
  ArrowRight: MoveDirection.RIGHT,
  ArrowUp: MoveDirection.TOP,
  ArrowDown: MoveDirection.BOTTOM,
};

const keyPressConverter = (key: string): MoveDirection | null => {
  if (key in allowedKeysForMove) {
    return allowedKeysForMove[key as keyof typeof allowedKeysForMove];
  }

  return null;
};

export default keyPressConverter;
