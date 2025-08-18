import r from "raylib";
import Enemy from "../enemies/enemy";

export default class WaveManager {
  enemyPath: r.Vector2[];
  enemies: Enemy[];
  currentPathIndex: number = 0;
  frameCounter: number = 0;
  framesPerMove: number = 60;

  constructor(enemyPath: r.Vector2[]) {
    this.enemyPath = enemyPath;
    this.enemies = [];
    this.enemies.push(new Enemy());
  }

  update() {
    this.frameCounter++;

    // Check if enough frames have passed to move
    if (
      this.frameCounter >= this.framesPerMove &&
      this.currentPathIndex < this.enemyPath.length - 1
    ) {
      this.currentPathIndex++;
      this.frameCounter = 0;
    }
  }

  drawWave(): Enemy[] {
    // Only draw if we have a valid position
    if (this.currentPathIndex < this.enemyPath.length) {
      const currentPos = this.getInterpolatedPosition();
      this.enemies[0].draw(currentPos);
    }

    return this.enemies;
  }

  //Linear interpolation: Uses the formula start + (end - start) * t where t goes from 0 to 1
  //Smooth movement: Instead of jumping between waypoints, the enemy smoothly moves along the path
  //How it Works:
  //When frameCounter = 0, t = 0 → enemy is at current waypoint
  //When frameCounter = 30, t = 0.5 → enemy is halfway between waypoints
  //When frameCounter = 60, t = 1 → enemy reaches next waypoint
  private getInterpolatedPosition(): r.Vector2 {
    // If we're at the last waypoint, just return it
    if (this.currentPathIndex >= this.enemyPath.length - 1) {
      return this.enemyPath[this.currentPathIndex];
    }

    const currentWaypoint = this.enemyPath[this.currentPathIndex];
    const nextWaypoint = this.enemyPath[this.currentPathIndex + 1];

    // Calculate interpolation factor (0 to 1)
    const t = this.frameCounter / this.framesPerMove;

    // Interpolate between current and next waypoint
    const interpolatedPos: r.Vector2 = {
      x: currentWaypoint.x + (nextWaypoint.x - currentWaypoint.x) * t,
      y: currentWaypoint.y + (nextWaypoint.y - currentWaypoint.y) * t,
    };

    return interpolatedPos;
  }
}
