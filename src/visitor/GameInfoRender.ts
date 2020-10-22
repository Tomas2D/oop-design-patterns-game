import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';

class GameInfoRender implements IGameObjectVisitor {
  visitCannon(cannon: AbstractCannon) {}

  visitMissile(missile: AbstractMissile) {}
}

export default GameInfoRender;
