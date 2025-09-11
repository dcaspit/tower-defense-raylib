import r from "raylib";
import Enemy from "../enemies/enemy";
import { warn } from "console";
import Base from "../bases/base";

export default class WaveManager {
  enemyPath: r.Vector2[];
  enemies: Enemy[];
  base: Base;
  frameCounter: number = 0;
  framesPerMove: number = 60;
  seconds: number = 0;

  constructor(enemyPath: r.Vector2[], base: Base) {
    this.enemyPath = enemyPath;
    this.base = base;
    this.enemies = [];
    this.enemies.push(new Enemy());
  }
  
  reset() {
    this.enemies = [];
    this.enemies.push(new Enemy());
    this.frameCounter = 0;
    this.seconds = 0;
  }

  update(onEnemyDeath: () => void) {
    this.frameCounter++;

    // Check if enough frames have passed to move
    if (this.frameCounter >= this.framesPerMove) {
      this.enemies.forEach((enemy) => {
        if(enemy.currentPathIndex < this.enemyPath.length - 1){
          enemy.currentPathIndex++;
        }    
        // TODO: Change to base's position
        if(enemy.currentPathIndex === this.enemyPath.length - 1) {
          enemy.health = 0;
          this.base.takeDamage();
        }
      });
      this.frameCounter = 0;
      this.seconds++;
      if(this.seconds % 10 === 0) {
        this.enemies.push(new Enemy());
      }
      if(this.seconds % 11 === 0) {
        this.enemies.push(new Enemy());
      }
      if(this.seconds % 12 === 0) {
        this.enemies.push(new Enemy());
      }
      if(this.seconds % 13 === 0) {
        this.enemies.push(new Enemy());
      }
      if(this.seconds % 14 === 0) {
        this.enemies.push(new Enemy());
      }
      if(this.seconds % 15 === 0) {
        this.seconds = 0;
      }
      this.removeDeadEnemies(onEnemyDeath);    
    }
  }

  removeDeadEnemies(onEnemyDeath: () => void) {
    this.enemies.forEach((enemy, index) => {
      if(enemy.health <= 0) {
        onEnemyDeath();
      }
    })
    this.enemies = this.enemies.filter(enemy => enemy.health > 0);
  }
  
  drawWave(): Enemy[] {
    // Only draw if we have a valid position
    this.enemies.forEach((enemy) => {
      if (enemy.currentPathIndex < this.enemyPath.length - 1) {
        const currentPos = this.getInterpolatedPosition(enemy.currentPathIndex);
        enemy.draw(currentPos);
      }
    });

    return this.enemies;
  }

  //Linear interpolation: Uses the formula start + (end - start) * t where t goes from 0 to 1
  //Smooth movement: Instead of jumping between waypoints, the enemy smoothly moves along the path
  //How it Works:
  //When frameCounter = 0, t = 0 → enemy is at current waypoint
  //When frameCounter = 30, t = 0.5 → enemy is halfway between waypoints
  //When frameCounter = 60, t = 1 → enemy reaches next waypoint
  private getInterpolatedPosition(currentPathIndex: number): r.Vector2 {
    // If we're at the last waypoint, just return it
    if (currentPathIndex >= this.enemyPath.length - 1) {
      return this.enemyPath[currentPathIndex];
    }

    const currentWaypoint = this.enemyPath[currentPathIndex];
    const nextWaypoint = this.enemyPath[currentPathIndex + 1];

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
