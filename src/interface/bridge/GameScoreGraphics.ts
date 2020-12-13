import { IGameScoreGraphics } from '~interface/bridge/IGameScoreGraphics';
import { IGameScoreGraphicsImplementor } from '~interface/bridge/IGameScoreGraphicsImplementor';
import { PositionShape } from '~interface/entity/PositionInterface';

export class GameScoreGraphics implements IGameScoreGraphics {
  private implementor: IGameScoreGraphicsImplementor;

  constructor(implementor: IGameScoreGraphicsImplementor) {
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
}
