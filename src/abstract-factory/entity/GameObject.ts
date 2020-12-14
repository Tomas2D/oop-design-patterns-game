import * as PIXI from 'pixi.js';
import IVisitable from '~visitor/IVisitable';
import IVisitor from '~visitor/IVisitor';

export type GameObjectShape = {
  texture: PIXI.Texture;
  x: number;
  y: number;
  speed?: number;
  blockedMoveDirections?: MoveDirection[];
};

export type GameObjectSizes = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum MoveDirection {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
}

abstract class GameObject extends PIXI.Sprite implements IVisitable {
  protected readonly speed: number;
  protected readonly blockedMoveDirections: Array<MoveDirection>;
  shape: PIXI.Rectangle;

  constructor(params: GameObjectShape) {
    super(params.texture);

    this.anchor.set(0, 0);
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed || 0;
    this.blockedMoveDirections = params.blockedMoveDirections || [];
  }

  move(direction: MoveDirection): void {
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

  abstract acceptVisitor(visitor: IVisitor);
}

export default GameObject;
