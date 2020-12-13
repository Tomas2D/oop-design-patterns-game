import { PositionShape } from '~interface/entity/PositionInterface';

export interface IGameScoreGraphics {
  drawText(text: string, position: PositionShape);
  drawRectangle(leftTop: PositionShape, rightBottom: PositionShape);
}
