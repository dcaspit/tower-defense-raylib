import r from 'raylib';
import { boxWidth, boxHeight } from '../map/gameMap';
import HealthBar from '../enemies/healthBar';

export default class Base {
  baseTexture: r.Texture;
  healthBar: HealthBar;
  health = 100;
  
  constructor() {
    this.baseTexture = r.LoadTexture("assets/base.png");
    this.healthBar = new HealthBar(this.health);
  }

  draw(position: r.Vector2) {
      const dest = {
        x: position.x,
        y: position.y,
        width: boxWidth,
        height: boxHeight,
      };
      const src = {
        x: 0,
        y: 0,
        width: this.baseTexture.width,
        height: this.baseTexture.height,
      };
      r.DrawTexturePro(
        this.baseTexture,
        src,
        dest,
        { x: 0, y: 0 },
        0,
        r.WHITE,
      );
      this.healthBar.draw(position, this.health);
  }
}
