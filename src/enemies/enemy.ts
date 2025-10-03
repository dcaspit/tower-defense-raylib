import r from "raylib";
import HealthBar from './healthBar';

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };
  healthBar: HealthBar;
  size = 40;
  texture: r.Texture;
  health = 20;
  currentPathIndex: number = 0;
  reachedBase = false;

  constructor(public index: number) {
    this.healthBar = new HealthBar(this.health);
    this.texture = r.LoadTexture('assets/enemy.png');
  }

  takeDamage(power: number) {
    this.health -= power;
  }

  kill() {
    this.health = 0;
  }

  draw(position: r.Vector2) {
    if (this.health <= 0) return;
    this.pos.x = position.x + 5;
    this.pos.y = position.y + 5;
    this.healthBar.draw(position, this.health);
    this.drawEnemyTexture();
  }

  drawEnemyTexture() {
    //r.DrawRectangle(this.pos.x, this.pos.y, 10, 10, r.RED);
    //return;
    const dest = {
      x: this.pos.x,
      y: this.pos.y,
      width: this.size,
      height: this.size,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.texture.width,
      height: this.texture.height,
    };
    r.DrawTexturePro(
      this.texture,
      src,
      dest,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );
  }
}
