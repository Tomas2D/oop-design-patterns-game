import AbstractCannon from '~abstract-factory/entity/AbstractCannon';
import AbstractMissile from '~abstract-factory/entity/AbstractMissile';
import AbstractEnemy from '~abstract-factory/entity/AbstractEnemy';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import AbstractCollision from '~abstract-factory/entity/AbstractCollision';
import GameObject from '~abstract-factory/entity/GameObject';
import IVisitor from '~visitor/IVisitor';
import { IGameGraphics } from '~bridge/IGameGraphics';
import { IPosition } from '~abstract-factory/entity/IPosition';
import { GAME_CONFIG } from '~config';

class GameObjectsRender implements IVisitor {
  private renderContext: IGameGraphics;

  setRenderContext(renderContext: IGameGraphics) {
    this.renderContext = renderContext;
  }

  private renderTextInfo(text: string, position: IPosition, gameObject: GameObject) {
    this.renderContext.drawText(text, position, gameObject);
  }

  visitCannon(cannon: AbstractCannon) {
    const angle = `Angle: ${cannon.getAngle().toFixed(1)}`;
    const power = `Power: ${cannon.getPower().toFixed(1)}`;
    const speed = `Speed: ${cannon.getSpeed().toFixed(1)}`;
    const y = `Y: ${cannon.position.y}`;

    if (!cannon.parent) {
      this.renderContext.addChild(cannon);

      this.renderTextInfo(y, { x: -cannon.width / 2, y: -30 }, cannon);
      this.renderTextInfo(
        angle,
        {
          x: -cannon.width / 2,
          y: -15,
        },
        cannon,
      );
      this.renderTextInfo(
        angle,
        {
          x: -cannon.width / 2,
          y: 0,
        },
        cannon,
      );
      this.renderTextInfo(
        speed,
        {
          x: -cannon.width / 2,
          y: 15,
        },
        cannon,
      );
    } else {
      const yChild = cannon.getChildAt(0) as PIXI.Text;
      yChild.text = y;

      const hpChild = cannon.getChildAt(1) as PIXI.Text;
      hpChild.text = angle;

      const powerChild = cannon.getChildAt(2) as PIXI.Text;
      powerChild.text = power;

      const speedChild = cannon.getChildAt(3) as PIXI.Text;
      speedChild.text = speed;
    }
  }

  visitMissile(missile: AbstractMissile) {
    if (!missile.parent) {
      this.renderContext.addChild(missile);
    }
  }

  visitEnemy(enemy: AbstractEnemy) {
    if (!enemy.parent) {
      this.renderContext.addChild(enemy);

      this.renderTextInfo(
        `Y: ${enemy.position.y}`,
        {
          x: 0,
          y: enemy.height / 2,
        },
        enemy,
      );

      this.renderTextInfo(
        `HP: ${enemy.getHp()}`,
        {
          x: 0,
          y: 0,
        },
        enemy,
      );
    } else {
      const yChild = enemy.getChildAt(0);
      // @ts-ignore
      yChild.text = `Y: ${enemy.position.y}`;

      const hpChild = enemy.getChildAt(1);
      // @ts-ignore
      hpChild.text = `HP: ${enemy.hp}`;
    }
  }

  visitCollision(collision: AbstractCollision) {
    if (!collision.parent) {
      this.renderContext.addChild(collision);
    }
  }

  visitGameInfo(gameInfo: AbstractGameInfo) {
    if (!gameInfo.parent) {
      this.renderContext.addChild(gameInfo);
      this.renderContext.drawRectangle({ x: 2, y: 2 }, { x: GAME_CONFIG.PIXI.width - 2, y: gameInfo.height + 8 });
    }
    gameInfo.text = gameInfo.getText();
  }
}

export default GameObjectsRender;
