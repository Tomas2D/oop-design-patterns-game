import GameObject, { MoveDirection } from './abstract/GameObject';

class Cannon extends GameObject {
  constructor(props) {
    super({ ...props, blockedMoveDirections: [MoveDirection.LEFT, MoveDirection.RIGHT] });
  }
}

export default Cannon;
