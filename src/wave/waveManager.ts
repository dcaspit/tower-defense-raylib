import r from "raylib";
import Enemy from "../enemies/enemy";
import { warn } from "console";
import Base from "../bases/base";
import { FirstWave, SecondWave, Wave } from "./wave";
import { GameClock } from "../utils/game-clock";

export default class WaveManager {
  enemyPath: r.Vector2[];
  wave: Wave;
  base: Base;

  constructor(enemyPath: r.Vector2[], base: Base, private onWaveComplete: () => void) {
    this.enemyPath = enemyPath;
    this.base = base;
    this.wave = new FirstWave();
  }

  reset() {
    this.wave = new FirstWave();
  }

  onWaveCompleted() {
    if (this.wave instanceof FirstWave) {
      this.wave = new SecondWave();
    }
    this.onWaveComplete();
  }

  waveNumber(): number {
    if (this.wave instanceof FirstWave) {
      return 1;
    }

    if (this.wave instanceof SecondWave) {
      return 2;
    }

    throw new Error('Invalid wave');
  }

  update(onEnemyDeath: () => void) {
    if (!GameClock.sixtyFramesPassed()) return;

    this.wave.enemies.forEach((enemy) => {
      if (enemy.currentPathIndex < this.enemyPath.length - 1) {
        enemy.currentPathIndex++;
      }
      // TODO: Change to base's position
      if (enemy.currentPathIndex == this.enemyPath.length - 1) {
        enemy.reachedBase = true;
        this.base.takeDamage();
      }
    });

    this.removeDeadEnemies(onEnemyDeath);
    const completed = this.wave.updateWave();
    if (completed) {
      this.onWaveCompleted();
    }
  }

  removeDeadEnemies(onEnemyDeath: () => void) {
    this.wave.enemies.forEach((enemy, index) => {
      if (enemy.health <= 0) {
        onEnemyDeath();
      }
      if (enemy.reachedBase) {
        console.log('Enemy Reached Base:', enemy.index);
      }
    })
    this.wave.enemies = this.wave.enemies.filter(enemy => enemy.health > 0 && !enemy.reachedBase);
  }

  drawWave() {
    // Only draw if we have a valid position
    this.wave.enemies.forEach((enemy) => {
      if (enemy.currentPathIndex < this.enemyPath.length - 1) {
        const currentPos = this.getInterpolatedPosition(enemy.currentPathIndex);
        enemy.draw(currentPos);
      }
    });
  }

  enemies(): Enemy[] {
    return this.wave.enemies;
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
    const t = GameClock.translitionFactor();

    // Interpolate between current and next waypoint
    const interpolatedPos: r.Vector2 = {
      x: currentWaypoint.x + (nextWaypoint.x - currentWaypoint.x) * t,
      y: currentWaypoint.y + (nextWaypoint.y - currentWaypoint.y) * t,
    };

    return interpolatedPos;
  }
}
