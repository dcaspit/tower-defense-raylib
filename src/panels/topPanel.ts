import r from 'raylib';
import { screenWidth } from '../utils/consts';

export class TopPanel {
  position: r.Vector2 = { x: 0, y: 0 };
  goldPosition: r.Vector2 = { x: 20, y: 20 };
  goldTexture: r.Texture2D;

  constructor(){
    this.goldTexture = r.LoadTexture('assets/gold.png');
  }

  draw() {
    r.DrawRectangle(
      this.position.x,
      this.position.y,
      screenWidth - 150, // 150 = rightPanel screenWidth 
      50, // topMargin = 50
      { r: r.BROWN.r, g: r.BROWN.g, b: r.BROWN.b, a: r.BROWN.a - 10 }
    )

    r.DrawText(
      "200",
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

}
