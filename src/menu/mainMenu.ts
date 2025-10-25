import r from 'raylib';
import { screenHeight, screenWidth } from '../utils/consts';

export class MainMenu {

  btnWidth = 200;
  btnHeight = 50;
  btnMargin = 20;
  titleSize = 60;

  startBtn: r.Rectangle = { 
    x: screenWidth / 2 - this.btnWidth / 2, 
    y: screenHeight / 2 - 20, 
    width: this.btnWidth, 
    height: this.btnHeight 
  }
  settingsBtn: r.Rectangle = { 
    x: screenWidth / 2 - this.btnWidth / 2, 
    y: this.startBtn.y + this.btnHeight + this.btnMargin, 
    width: this.btnWidth, 
    height: this.btnHeight 
  }
  quitBtn: r.Rectangle = { 
    x: screenWidth / 2 - this.btnWidth / 2, 
    y: this.settingsBtn.y + this.btnHeight + this.btnMargin, 
    width: this.btnWidth, 
    height: this.btnHeight 
  }

  constructor(private onStart: () => void) { }

  draw() {
    this.drawBackground();
    this.drawTitle();
    this.drawButton(this.startBtn, 'PLAY', this.isMouseInButton(this.startBtn));
    this.drawButton(this.settingsBtn, 'SETTINGS', this.isMouseInButton(this.settingsBtn));
    this.drawButton(this.quitBtn, 'QUIT', this.isMouseInButton(this.quitBtn));
    this.handleInput();
  }

  private drawBackground() {
    r.DrawRectangle(0, 0, screenWidth, screenHeight, { r: 34, g: 139, b: 34, a: 255 });
    
    for (let i = 0; i < 15; i++) {
      const x = Math.floor(Math.random() * screenWidth);
      const y = Math.floor(Math.random() * screenHeight);
      r.DrawCircle(x, y, 3, { r: 46, g: 125, b: 50, a: 100 });
    }

    r.DrawRectangle(50, screenHeight - 100, 150, 80, { r: 139, g: 69, b: 19, a: 255 });
    r.DrawRectangle(screenWidth - 200, 80, 150, 80, { r: 139, g: 69, b: 19, a: 255 });
  }

  private drawTitle() {
    const title = 'TOWER DEFENSE';
    const titleWidth = r.MeasureText(title, this.titleSize);
    const titleX = screenWidth / 2 - titleWidth / 2;
    const titleY = 80;

    r.DrawText(title, titleX + 3, titleY + 3, this.titleSize, r.BLACK);
    r.DrawText(title, titleX, titleY, this.titleSize, { r: 255, g: 215, b: 0, a: 255 });
  }

  private drawButton(btn: r.Rectangle, text: string, isHovered: boolean) {
    const bgColor = isHovered 
      ? { r: 184, g: 134, b: 11, a: 255 }
      : { r: 139, g: 69, b: 19, a: 255 };
    const borderColor = isHovered 
      ? { r: 255, g: 215, b: 0, a: 255 }
      : { r: 101, g: 67, b: 33, a: 255 };

    r.DrawRectangle(btn.x, btn.y, btn.width, btn.height, bgColor);
    r.DrawRectangleLines(btn.x, btn.y, btn.width, btn.height, borderColor);

    const textWidth = r.MeasureText(text, 24);
    const textX = btn.x + btn.width / 2 - textWidth / 2;
    const textY = btn.y + btn.height / 2 - 12;
    const textColor = isHovered ? r.WHITE : { r: 245, g: 222, b: 179, a: 255 };

    r.DrawText(text, textX, textY, 24, textColor);
  }

  private isMouseInButton(btn: r.Rectangle): boolean {
    const mouseX = r.GetMouseX();
    const mouseY = r.GetMouseY();
    return (
      mouseX >= btn.x &&
      mouseX <= btn.x + btn.width &&
      mouseY >= btn.y &&
      mouseY <= btn.y + btn.height
    );
  }

  private handleInput() {
    if (r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)) {
      if (this.isMouseInButton(this.startBtn)) {
        this.onStart();
      } else if (this.isMouseInButton(this.settingsBtn)) {
        console.log('Settings clicked');
      } else if (this.isMouseInButton(this.quitBtn)) {
        process.exit(0);
      }
    }
  }

}
