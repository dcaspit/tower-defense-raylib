import r from "raylib";

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };
  healthBar: r.Vector2 = { x: 0, y: 0};
  enemySize = 40;
  enemyTexture: r.Texture;
  health = 20;

  constructor() {
    this.enemyTexture = r.LoadTexture('assets/enemy.png');
  }

  takeDamage() {
    this.health--;
  }

  draw(position: r.Vector2) {
    this.pos.x = position.x + 5;
    this.pos.y = position.y + 5;
    this.healthBar.x = position.x - 5;
    this.healthBar.y = position.y - 10;

    this.drawEnemyTexture();
    this.drawHealhBar();
  }

  drawHealhBar() {
    const healthPercent = this.health / 20; // 20 == maxHealth
    const bgRec: r.Rectangle = {
      x: this.healthBar.x,
      y: this.healthBar.y,
      width: 55 * healthPercent,
      height: 8
    };
    r.DrawRectangleRounded(bgRec, 0.5, 8, r.RED);
    const linesRec: r.Rectangle = {
      x: this.healthBar.x,
      y: this.healthBar.y,
      width: 55,
      height: 7
    };
    r.DrawRectangleRoundedLines(bgRec, 0.5, 8, 1, r.BLACK);
  }

  drawEnemyTexture() {
    const dest = {
      x: this.pos.x,
      y: this.pos.y,
      width: this.enemySize,
      height: this.enemySize,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.enemyTexture.width,
      height: this.enemyTexture.height,
    };
    r.DrawTexturePro(
      this.enemyTexture,
      src,
      dest,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );
  }
}
