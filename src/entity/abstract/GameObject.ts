import * as PIXI from 'pixi.js';
import IGameObjectVisitor from '~interface/visitor/IGameObjectVisitor';

export type GameObjectShape = {
  texture: PIXI.Texture;
  x: number;
  y: number;
  speed?: number;
  hp?: number;
  blockedMoveDirections?: MoveDirection[];
};

export enum MoveDirection {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
}

abstract class GameObject extends PIXI.Sprite {
  private readonly speed: number;
  private readonly blockedMoveDirections: Array<MoveDirection>;

  constructor(params: GameObjectShape) {
    super(params.texture);

    this.anchor.set(0, 0);
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed || 0;
    this.blockedMoveDirections = params.blockedMoveDirections || [];
  }

  public move(direction: MoveDirection): void {
    if (this.blockedMoveDirections.includes(direction)) {
      return;
    }

    switch (direction) {
      case MoveDirection.TOP:
        this.y -= this.speed;
        break;
      case MoveDirection.BOTTOM:
        this.y += this.speed;
        break;
      case MoveDirection.LEFT:
        this.x -= this.speed;
        break;
      case MoveDirection.RIGHT:
        this.x += this.speed;
        break;
    }
  }

  public abstract acceptVisitor(visitor: IGameObjectVisitor);
}

export default GameObject;
