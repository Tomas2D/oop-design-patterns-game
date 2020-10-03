import * as PIXI from 'pixi.js';
import { PositionInterface, PositionShape } from '../interface/PositionInterface';

type GameObjectShape = {
  texture: PIXI.Texture;
  x: number;
  y: number;
  speed?: number;
  hp?: number;
};

export enum MoveDirection {
  TOP,
  LEFT,
  RIGHT,
  BOTTOM,
}

abstract class GameObject extends PIXI.Sprite {
  private readonly speed: number;

  constructor(params: GameObjectShape) {
    console.info(params);
    super(params.texture);

    this.anchor.set(0.5);
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed || 0;
  }

  public move(direction: MoveDirection): void {
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
}

export default GameObject;
