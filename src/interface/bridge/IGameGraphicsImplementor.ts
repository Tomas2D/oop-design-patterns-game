import { PositionShape } from '~interface/entity/PositionInterface';
import * as PIXI from 'pixi.js';

export interface IGameGraphicsImplementor {
  drawText(text: string, position: PositionShape);
  drawLine(beginPosition: PositionShape, endPosition: PositionShape);
  addChild(...children: PIXI.Sprite[]);
  removeChildren();
}
