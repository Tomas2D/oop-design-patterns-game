import * as PIXI from 'pixi.js';
import { IPosition } from '~abstract-factory/entity/IPosition';

export interface IGameGraphicsImplementor {
  drawText(text: string, position: IPosition, sprite?: PIXI.Sprite);
  drawLine(beginPosition: IPosition, endPosition: IPosition);
  addChild(...children: PIXI.Sprite[]);
  removeChildren();
  fillBackground(color: number);
}
