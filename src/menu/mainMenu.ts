import r from 'raylib';
import { screenHeight, screenWidth } from '../utils/consts';

export class MainMenu {

  btnWidth = 50;
  btnHeight = 50;
  btnMargin = 10;

  startBtn: r.Vector2 = { x: screenWidth / 2 - 25, y: screenHeight / 2 - 25 }
  settingsBtn: r.Vector2 = { x: this.startBtn.x, y: this.startBtn.y + this.btnHeight + this.btnMargin }
  exitBtn: r.Vector2 = { x: this.settingsBtn.x, y: this.settingsBtn.y + this.btnHeight + this.btnMargin }

  constructor(private onStart: () => void) { }

  draw() {
    this.drawStartBtn();
    this.handleOnStart();
  }


  drawStartBtn() {
    const isHovered = this.isMouseInGameBtn();

    // Draw button background with hover effect
    if (isHovered) {
      // Draw a highlighted background when hovered
      r.DrawRectangle(this.startBtn.x, this.startBtn.y, this.btnWidth, this.btnHeight, {
        r: 255,
        g: 0,
        b: 0,
        a: 64,
      });
    }

    r.DrawRectangleLines(this.startBtn.x, this.startBtn.y, 80, 40, r.RED);

    // Change text color on hover for additional feedback
    const textColor = isHovered ? r.WHITE : r.RED;
    r.DrawText(
      'Start',
      this.startBtn.x + 25,
      this.startBtn.y + 15,
      12,
      textColor,
    );
  }

  private isMouseInGameBtn(): boolean {
    const mouseX = r.GetMouseX();
    const mouseY = r.GetMouseY();
    return (
      mouseX >= this.startBtn.x &&
      mouseX <= this.startBtn.x + 80 &&
      mouseY >= this.startBtn.y &&
      mouseY <= this.startBtn.y + 40
    );
  }

  private handleOnStart() {
    if (this.isMouseInGameBtn() &&
      r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)) {
      this.onStart();
    }
  }

}
