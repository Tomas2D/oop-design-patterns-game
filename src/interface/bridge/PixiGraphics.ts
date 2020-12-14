import * as PIXI from 'pixi.js';
import { PositionShape } from '~interface/entity/PositionInterface';
import { IGameGraphicsImplementor } from '~interface/bridge/IGameGraphicsImplementor';

export class PixiGraphics implements IGameGraphicsImplementor {
  private readonly gc: PIXI.Container;

  constructor(gc: PIXI.Container) {
    this.gc = gc;
  }

  drawLine(beginPosition: PositionShape, endPosition: PositionShape) {
    const line = new PIXI.Graphics();
    line.lineStyle(1);
    line.moveTo(beginPosition.x, beginPosition.y);
    line.lineTo(endPosition.x, endPosition.y);
    this.gc.addChild(line);
  }

  drawText(text: string, position: PositionShape) {
    const sprite = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 13, fill: 0xff1010, textAlign: 'center' });
    sprite.position.x = position.x + 35;
    sprite.position.y = position.y;
    this.gc.addChild(sprite);
  }

  addChild(...children: PIXI.Sprite[]) {
    this.gc.addChild(...children);
  }

  removeChildren() {
    this.gc.removeChildren();
  }
}
