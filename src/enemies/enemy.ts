import r from "raylib";
import HealthBar from './healthBar';

export default class Enemy {
  pos: r.Vector2 = { x: 0, y: 0 };
  healthBar: HealthBar;
  enemySize = 40;
  //enemyTexture: r.Texture;
  health = 20;
  currentPathIndex: number = 0;
  reachedBase = false;

  constructor(public index: number) {
    this.healthBar = new HealthBar(this.health);
    //this.enemyTexture = undefined //r.LoadTexture('assets/enemy.png');
  }

  takeDamage(power: number) {
    this.health -= power;
  }

  kill() {
    this.health = 0;
  }

  draw(position: r.Vector2) {
    this.pos.x = position.x + 5;
    this.pos.y = position.y + 5;
    this.healthBar.draw(position, this.health);
    this.drawEnemyTexture();
  }

  drawEnemyTexture() {
    r.DrawRectangle(this.pos.x, this.pos.y, 10, 10, r.RED);
    return;
    // const dest = {
    //  x: this.pos.x,
    // y: this.pos.y,
    // width: this.enemySize,
    // height: this.enemySize,
    // };
    // const src = {
    //   x: 0,
    //   y: 0,
    //   width: this.enemyTexture.width,
    //   height: this.enemyTexture.height,
    // };
    // r.DrawTexturePro(
    //  this.enemyTexture,
    //  src,
    //  dest,
    //  { x: 0, y: 0 },
    //  0,
    //  r.WHITE,
    //);
  }
}
