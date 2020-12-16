import * as PIXI from 'pixi.js';
import IVisitable from '~visitor/IVisitable';
import IVisitor from '~visitor/IVisitor';
import { IPosition } from '~abstract-factory/entity/IPosition';

export type GameObjectShape = {
  texture?: PIXI.Texture;
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
  protected speed: number;
  protected readonly blockedMoveDirections: Array<MoveDirection>;

  constructor(params: GameObjectShape) {
    super(params.texture);

    this.anchor.set(0, 0);
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed || 0;
    this.blockedMoveDirections = params.blockedMoveDirections || [];
  }

  move(direction: MoveDirection): void {
    if (this.speed === 0 || this.blockedMoveDirections.includes(direction)) {
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

  getPosition(): IPosition {
    return { x: this.position.x, y: this.position.y };
  }

  abstract acceptVisitor(visitor: IVisitor);
}

export default GameObject;
