import r from "raylib";

export class Panel {
  position: r.Vector2 = { x: 500, y: 0 };
  startBtn: r.Vector2 = { x: 530, y: 80 };
  pauseBtn: r.Vector2 = { x: 530, y: 80 };

  constructor(private onStart: () => void) {}

  draw() {
    r.DrawRectangle(this.position.x, this.position.y, 150, 500, r.DARKBROWN);
    this.drawStartBtn();
    this.handleStartBtnClick();
  }

  drawStartBtn() {
    const isHovered = this.isMouseInStartBtn();

    // Draw button background with hover effect
    if (isHovered) {
      // Draw a highlighted background when hovered
      r.DrawRectangle(this.startBtn.x, this.startBtn.y, 80, 40, {
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
      "Start",
      this.startBtn.x + 25,
      this.startBtn.y + 15,
      12,
      textColor,
    );
  }

  private isMouseInStartBtn(): boolean {
    const mouseX = r.GetMouseX();
    const mouseY = r.GetMouseY();
    return (
      mouseX >= this.startBtn.x &&
      mouseX <= this.startBtn.x + 80 &&
      mouseY >= this.startBtn.y &&
      mouseY <= this.startBtn.y + 40
    );
  }

  private handleStartBtnClick() {
    if (
      this.isMouseInStartBtn() &&
      r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)
    ) {
      this.onStart();
    }
  }
}
