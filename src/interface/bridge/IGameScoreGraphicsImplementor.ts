import { PositionShape } from '~interface/entity/PositionInterface';

export interface IGameScoreGraphicsImplementor {
  drawText(text: string, position: PositionShape);
  drawLine(beginPosition: PositionShape, endPosition: PositionShape);
}
