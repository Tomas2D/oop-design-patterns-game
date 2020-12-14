import { IGameGraphics } from '~interface/bridge/IGameGraphics';
import { IGameGraphicsImplementor } from '~interface/bridge/IGameGraphicsImplementor';
import { PositionShape } from '~interface/entity/PositionInterface';

export class GameGraphics implements IGameGraphics {
  private implementor: IGameGraphicsImplementor;

  constructor(implementor: IGameGraphicsImplementor) {
    this.implementor = implementor;
  }

  drawText(text: string, position: PositionShape) {
    this.implementor.drawText(text, position);
  }

  drawRectangle(leftTop: PositionShape, rightBottom: PositionShape) {
    this.implementor.drawLine(leftTop, { x: rightBottom.x, y: leftTop.y }); // top
    this.implementor.drawLine(leftTop, { x: leftTop.x, y: rightBottom.y }); // left
    this.implementor.drawLine(rightBottom, { x: leftTop.x, y: rightBottom.y }); // bottom
    this.implementor.drawLine(rightBottom, { x: rightBottom.x, y: leftTop.y }); // right
  }

  addChild(...children: PIXI.Sprite[]) {
    this.implementor.addChild(...children);
  }

  removeChildren() {
    this.implementor.removeChildren();
  }
}
