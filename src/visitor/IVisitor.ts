import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';

interface IVisitor {
  visitCannon(cannon: AbstractCannon);
  visitMissile(missile: AbstractMissile);
  visitEnemy(enemy: AbstractEnemy);
  visitCollision(collision: AbstractCollision);
  visitGameInfo(gameInfo: AbstractGameInfo);
}

export default IVisitor;
