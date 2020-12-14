import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import { PositionShape } from '~interface/entity/PositionInterface';
import { IGameGraphics } from '~interface/bridge/IGameGraphics';
import AbstractCollision from '~entity/abstract/AbstractCollision';

class GameObjectsRender implements IGameObjectVisitor {
  private renderContext: IGameGraphics;

  public setRenderContext(renderContext: IGameGraphics) {
    this.renderContext = renderContext;
  }

  private renderTextInfo(text: string, position: PositionShape) {
    this.renderContext.drawText(text, position);
  }

  visitCannon(cannon: AbstractCannon) {
    const x = cannon.position.x - cannon.width / 2;
    const y = cannon.position.y - cannon.height / 2;

    this.renderTextInfo(`Y: ${cannon.position.y}`, { x, y });
    this.renderTextInfo(`Angle: ${cannon.getAngle().toFixed(1)}`, {
      x,
      y: y + 15,
    });
  }

  visitMissile(missile: AbstractMissile) {}

  visitEnemy(enemy: AbstractEnemy) {
    this.renderTextInfo(`Y: ${enemy.position.y}`, {
      x: enemy.position.x - enemy.width / 2,
      y: enemy.position.y - enemy.height / 2,
    });

    this.renderTextInfo(`HP: ${enemy.hp}`, {
      x: enemy.position.x - enemy.width / 2,
      y: enemy.position.y - enemy.height / 2 + 15,
    });
  }

  visitCollision(collision: AbstractCollision) {}

  visitGameInfo(gameInfo: AbstractGameInfo) {}
}

export default GameObjectsRender;
