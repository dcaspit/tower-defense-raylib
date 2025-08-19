import r from "raylib";

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };
  padding: number = 25;
  width: number = 10;

  constructor() {}

  draw(position: r.Vector2) {
    this.pos.x = position.x + this.padding;
    this.pos.y = position.y + this.padding;
    r.DrawRectangle(this.pos.x, this.pos.y, this.width, this.width, r.RED);
  }
}
