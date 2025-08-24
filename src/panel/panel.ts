import r from "raylib";

export class Panel {
  position: r.Vector2 = { x: 500, y: 0 };
  gameBtn: r.Vector2 = { x: 530, y: 80 };

  constructor(private onClick: () => void) {}

  draw(paused: boolean) {
    r.DrawRectangle(this.position.x, this.position.y, 150, 500, r.DARKBROWN);
    this.drawGameBtn(paused);
    this.handleGameBtnClick();
  }

  drawGameBtn(paused: boolean) {
    const isHovered = this.isMouseInGameBtn();

    // Draw button background with hover effect
    if (isHovered) {
      // Draw a highlighted background when hovered
      r.DrawRectangle(this.gameBtn.x, this.gameBtn.y, 80, 40, {
        r: 255,
        g: 0,
        b: 0,
        a: 64,
      });
    }

    r.DrawRectangleLines(this.gameBtn.x, this.gameBtn.y, 80, 40, r.RED);

    // Change text color on hover for additional feedback
    const textColor = isHovered ? r.WHITE : r.RED;
    r.DrawText(
      paused ? "Start" : "Pause",
      this.gameBtn.x + 25,
      this.gameBtn.y + 15,
      12,
      textColor,
    );
  }

  private isMouseInGameBtn(): boolean {
    const mouseX = r.GetMouseX();
    const mouseY = r.GetMouseY();
    return (
      mouseX >= this.gameBtn.x &&
      mouseX <= this.gameBtn.x + 80 &&
      mouseY >= this.gameBtn.y &&
      mouseY <= this.gameBtn.y + 40
    );
  }

  private handleGameBtnClick() {
    if (
      this.isMouseInGameBtn() &&
      r.IsMouseButtonPressed(r.MOUSE_BUTTON_LEFT)
    ) {
      this.onClick();
    }
  }
}
