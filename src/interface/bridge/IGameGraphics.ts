import { PositionShape } from '~interface/entity/PositionInterface';
import * as PIXI from 'pixi.js';

export interface IGameGraphics {
  drawText(text: string, position: PositionShape);
  drawRectangle(leftTop: PositionShape, rightBottom: PositionShape);
  addChild(...children: PIXI.Sprite[]);
  removeChildren();
}
