import r from 'raylib';
import { screenWidth } from '../utils/consts';

export class TopPanel {
  bgWidth = screenWidth - 150;
  bgHeight = 50; // topMargin
  position: r.Vector2 = { x: 0, y: 0 };
  goldPosition: r.Vector2 = { x: 20, y: 20 };
  wavePosition: r.Vector2 = { x: this.bgWidth - 50, y: 20 };
  goldTexture: r.Texture2D;
  private money: number = 200;

  constructor() {
    this.goldTexture = r.LoadTexture('assets/gold.png');
  }

  draw(wave: number) {
    this.drawBG();
    this.drawMoney();
    this.drawWaveCount(wave);
  }

  drawWaveCount(wave: number) {
    r.DrawText(`${wave}/10`, this.wavePosition.x, this.wavePosition.y, 15, r.BLACK);
    r.DrawText('Wave: ', this.wavePosition.x - 45, this.wavePosition.y, 15, r.BLACK);
  }

  drawMoney() {
    r.DrawText(
      `${this.money}`,
      this.goldPosition.x,
      this.goldPosition.y,
      15,
      r.YELLOW
    )

    const dest = {
      x: this.goldPosition.x + 25,
      y: this.goldPosition.y - 8,
      width: 30,
      height: 30,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.goldTexture.width,
      height: this.goldTexture.height,
    };
    r.DrawTexturePro(
      this.goldTexture,
      src,
      dest,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );
  }

  drawBG() {
    r.DrawRectangle(
      this.position.x,
      this.position.y,
      this.bgWidth,
      this.bgHeight,
      { r: r.BROWN.r, g: r.BROWN.g, b: r.BROWN.b, a: r.BROWN.a - 10 }
    )
  }

  addMoney() {
    this.money += 50;
  }

}
