import GameObject from '~abstract-factory/entity/GameObject';
import { IGameGraphics } from '~bridge/IGameGraphics';
import { IGameGraphicsImplementor } from '~bridge/IGameGraphicsImplementor';
import { IPosition } from '~abstract-factory/entity/IPosition';
import AbstractGameInfo from '~abstract-factory/entity/AbstractGameInfo';
import { GAME_CONFIG } from '~config';

export class GameGraphics implements IGameGraphics {
  private implementor: IGameGraphicsImplementor;

  constructor(implementor: IGameGraphicsImplementor) {
    this.implementor = implementor;
  }

  drawText(text: string, position: IPosition, gameObject?: GameObject) {
    this.implementor.drawText(text, position, gameObject);
  }

  drawRectangle(leftTop: IPosition, rightBottom: IPosition) {
    this.implementor.drawLine(leftTop, { x: rightBottom.x, y: leftTop.y }); // top
    this.implementor.drawLine(leftTop, { x: leftTop.x, y: rightBottom.y }); // left
    this.implementor.drawLine(rightBottom, { x: leftTop.x, y: rightBottom.y }); // bottom
    this.implementor.drawLine(rightBottom, { x: rightBottom.x, y: leftTop.y }); // right
  }

  addChild(...children: GameObject[] | AbstractGameInfo[]) {
    this.implementor.addChild(...children);
  }

  removeChildren() {
    this.implementor.removeChildren();
  }

  drawHelp() {
    this.implementor.drawText('Keys: Up, Down, Left, Right, Space, Q, W, P, B, G, L', {
      x: GAME_CONFIG.PIXI.width - 350,
      y: 6,
    });
  }
}
