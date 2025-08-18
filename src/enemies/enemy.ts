import r from "raylib";

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };

  constructor() {}

  draw(position: r.Vector2) {
    this.pos.x = position.x + 22;
    this.pos.y = position.y + 22;
    r.DrawRectangle(position.x + 25, position.y + 25, 10, 10, r.RED);
  }
}
