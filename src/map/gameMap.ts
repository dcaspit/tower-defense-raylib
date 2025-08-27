import r, { MOUSE_BUTTON_LEFT } from "raylib";
import { screenHeight, screenWidth } from "../utils/consts";
import { main_map } from "./maps";

const boxWidth = 50;
const boxHeight = 50;

export default class GameMap {
  enemyPath: r.Vector2[];
  enemyPathIntialized: boolean = false;
  mouseClick: (pos: r.Vector2) => void;
  baseTexture: r.Texture;
  towersLocations: {col: number, row: number}[] = [];

  constructor(mouseClick: (pos: r.Vector2) => void) {
    this.enemyPath = [];
    this.mouseClick = mouseClick;
    this.baseTexture = r.LoadTexture("assets/base.png");
    this.parseEnemyPath();
  }

  drawMap(pauseState: boolean) {
    for (let row = 0; row < main_map.length; row++) {
      for (let col = 0; col < main_map[row].length; col++) {
        let color: r.Color = r.GRAY;
        if (main_map[row][col] === 1) {
          color = r.GREEN;
        } else if (main_map[row][col] === 2) {
          // Path
          color = r.BROWN;
        } else if (main_map[row][col] === 3) {
          color = r.BLUE;
        } else if (main_map[row][col] === 4) {
          color = r.GRAY;
        }

        r.DrawRectangle(
          col * boxWidth,
          row * boxHeight,
          boxWidth,
          boxHeight,
          color,
        );
        // TODO: remove logic from draw
        // TODO: add remove tower logic
        if (color === r.GREEN && pauseState && !this.towersLocations.find((loc) => loc.col === col && loc.row === row)) {
          // Check if mouse is hovering over this rectangle
          if (this.isMouseInRec(col, row)) {
            // Draw a semi-transparent white overlay for highlight
            r.DrawRectangle(
              col * boxWidth,
              row * boxHeight,
              boxWidth,
              boxHeight,
              { r: 255, g: 255, b: 255, a: 64 }, // Semi-transparent white
            );

            if (r.IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) {
              this.mouseClick({ x: col * boxWidth, y: row * boxHeight });
              this.towersLocations.push({col: col, row: row});
            }
          }
        }
        if (pauseState) {
          r.DrawRectangleLines(
            col * boxWidth,
            row * boxHeight,
            boxWidth,
            boxHeight,
            r.BLACK,
          );
        }
      }
    }

    // Draw base sprite at the end of the enemy path
    if (this.enemyPath.length > 0) {
      const endPosition = this.enemyPath[this.enemyPath.length - 1];
      const destRect = {
        x: endPosition.x,
        y: endPosition.y,
        width: boxWidth,
        height: boxHeight,
      };
      const sourceRect = {
        x: 0,
        y: 0,
        width: this.baseTexture.width,
        height: this.baseTexture.height,
      };
      r.DrawTexturePro(
        this.baseTexture,
        sourceRect,
        destRect,
        { x: 0, y: 0 },
        0,
        r.WHITE,
      );
    }
  }

  isMouseInRec(col: number, row: number): boolean {
    let mouseX = r.GetMouseX();
    let mouseY = r.GetMouseY();
    let startBoxX = col * boxWidth;
    let endBoxX = startBoxX + boxWidth;
    let startBoxY = row * boxHeight;
    let endBoxY = startBoxY + boxHeight;
    return (
      mouseX >= startBoxX &&
      mouseX <= endBoxX &&
      mouseY >= startBoxY &&
      mouseY <= endBoxY
    );
  }

  parseEnemyPath(): void {
    // Find entrance (leftmost 2 in any row)
    let startRow: number = -1;
    let startCol: number = -1;

    for (let row = 0; row < main_map.length; row++) {
      if (main_map[row][0] === 2) {
        startRow = row;
        startCol = 0;
        break;
      }
      if (startRow !== -1) break;
    }

    if (startRow === -1) return; // No path found

    // Track visited cells to avoid going backwards
    const visited: boolean[][] = [];
    for (let i = 0; i < main_map.length; i++) {
      visited[i] = new Array(main_map[i].length).fill(false);
    }

    let currentRow = startRow;
    let currentCol = startCol;

    // Add starting position
    let startPos: r.Vector2 = {
      x: currentCol * boxWidth,
      y: currentRow * boxHeight,
    };
    this.enemyPath.push(startPos);
    visited[currentRow][currentCol] = true;

    // Direction vectors: right, down, left, up
    const directions = [
      { row: 0, col: 1 }, // right
      { row: 1, col: 0 }, // down
      { row: 0, col: -1 }, // left
      { row: -1, col: 0 }, // up
    ];

    while (true) {
      let foundNext = false;

      // Check all 4 directions for next path cell
      for (const dir of directions) {
        const nextRow = currentRow + dir.row;
        const nextCol = currentCol + dir.col;

        // Check bounds
        if (
          nextRow >= 0 &&
          nextRow < main_map.length &&
          nextCol >= 0 &&
          nextCol < main_map[0].length
        ) {
          // Check if it's a path cell (2) and not visited
          if (main_map[nextRow][nextCol] === 2 && !visited[nextRow][nextCol]) {
            // Move to this cell
            currentRow = nextRow;
            currentCol = nextCol;
            visited[currentRow][currentCol] = true;

            // Add position to path
            let pos: r.Vector2 = {
              x: currentCol * boxWidth,
              y: currentRow * boxHeight,
            };
            this.enemyPath.push(pos);

            foundNext = true;
            break;
          }
        }
      }

      // If no next path cell found, we've reached the end
      if (!foundNext) {
        break;
      }
    }

    console.log(`Enemy path parsed with ${this.enemyPath.length} waypoints`);
  }
}
