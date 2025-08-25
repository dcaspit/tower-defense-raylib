import r from "raylib";

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };
  enemySize = 40;
  enemyTexture: r.Texture;

  constructor() {
    this.enemyTexture = r.LoadTexture('assets/enemy.png');
  }

  draw(position: r.Vector2) {
    this.pos.x = position.x + 5;
    this.pos.y = position.y + 5;
    const destRect = {
      x: this.pos.x,
      y: this.pos.y,
      width: this.enemySize,
      height: this.enemySize,
    };
    const sourceRect = {
      x: 0,
      y: 0,
      width: this.enemyTexture.width,
      height: this.enemyTexture.height,
    };
    r.DrawTexturePro(
      this.enemyTexture,
      sourceRect,
      destRect,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );
  }
}
