import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';
import AbstractCannon from '~entity/abstract/AbstractCannon';
import AbstractMissile from '~entity/abstract/AbstractMissile';
import AbstractEnemy from '~entity/abstract/AbstractEnemy';
import AbstractGameInfo from '~entity/abstract/AbstractGameInfo';
import * as PIXI from 'pixi.js';
import { PositionShape } from '~interface/entity/PositionInterface';

class GameObjectsRender implements IGameObjectVisitor {
  private renderContext: PIXI.Container;

  public setRenderContext(renderContext: PIXI.Container) {
    this.renderContext = renderContext;
  }

  private renderTextInfo(text: string, position: PositionShape) {
    const container = new PIXI.Container();
    container.setParent(this.renderContext);

    const sprite = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 13, fill: 0xff1010, textAlign: 'center' });
    sprite.position.x = position.x;
    sprite.position.y = position.y - 20;

    container.addChild(sprite);
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
  }

  visitGameInfo(gameInfo: AbstractGameInfo) {}
}

export default GameObjectsRender;
