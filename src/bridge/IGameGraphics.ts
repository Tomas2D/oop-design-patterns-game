import GameObject from '~abstract-factory/entity/GameObject';
import { IPosition } from '~abstract-factory/entity/IPosition';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';

export interface IGameGraphics {
  drawText(text: string, position: IPosition, gameObject?: GameObject);
  drawRectangle(leftTop: IPosition, rightBottom: IPosition);
  addChild(...children: GameObject[] | AbstractGameInfo[]);
  removeChildren();
  drawHelp();
}
