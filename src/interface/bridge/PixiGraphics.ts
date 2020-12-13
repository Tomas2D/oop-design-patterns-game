import * as PIXI from 'pixi.js';
import { PositionShape } from '~interface/entity/PositionInterface';
import { IGameScoreGraphicsImplementor } from '~interface/bridge/IGameScoreGraphicsImplementor';

export class PixiGraphics implements IGameScoreGraphicsImplementor {
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
    sprite.position.x = position.x;
    sprite.position.y = position.y;
    this.gc.addChild(sprite);
  }
}
