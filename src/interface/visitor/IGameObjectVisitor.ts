import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import AbstractCollision from '~entity/abstract/AbstractCollision';

interface IGameObjectVisitor {
  visitCannon(cannon: AbstractCannon);
  visitMissile(missile: AbstractMissile);
  visitEnemy(enemy: AbstractEnemy);
  visitCollision(collision: AbstractCollision);
  visitGameInfo(gameInfo: AbstractGameInfo);
}

export default IGameObjectVisitor;
