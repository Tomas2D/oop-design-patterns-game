import * as PIXI from 'pixi.js';
import { IGameGraphicsImplementor } from '~bridge/IGameGraphicsImplementor';
import { IPosition } from '~abstract-factory/entity/IPosition';

export class PixiGraphics implements IGameGraphicsImplementor {
  private readonly gc: PIXI.Container;

  constructor(gc: PIXI.Container) {
    const container = new PIXI.Container();
    container.setParent(gc);
    this.gc = gc;
  }

  drawLine(beginPosition: IPosition, endPosition: IPosition) {
    const line = new PIXI.Graphics();
    line.lineStyle(2);
    line.moveTo(beginPosition.x, beginPosition.y);
    line.lineTo(endPosition.x, endPosition.y);
    this.gc.addChild(line);
  }

  drawText(text: string, position: IPosition, sprite?: PIXI.Sprite) {
    const textSprite = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 13, fill: 0xff1010, textAlign: 'left' });
    textSprite.position.x = position.x + 35;
    textSprite.position.y = position.y;
    if (!sprite) {
      this.gc.addChild(textSprite);
    } else {
      sprite.addChild(textSprite);
    }
  }

  addChild(...children: PIXI.Sprite[]) {
    this.gc.addChild(...children);
  }

  removeChildren() {
    this.gc.removeChildren();
  }
}
