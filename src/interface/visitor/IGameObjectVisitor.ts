import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';

interface IGameObjectVisitor {
  visitCannon(cannon: AbstractCannon);
  visitMissile(missile: AbstractMissile);
  visitEnemy(enemy: AbstractEnemy);
  visitGameInfo(gameInfo: AbstractGameInfo);
}

export default IGameObjectVisitor;
