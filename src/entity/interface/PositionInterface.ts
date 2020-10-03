export type PositionShape = {
  x: number;
  y: number;
};

export interface PositionInterface {
  getPosition(): PositionShape;
}
