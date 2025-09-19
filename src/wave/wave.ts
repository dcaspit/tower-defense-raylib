import Enemy from "../enemies/enemy";
import { GameClock } from "../utils/game-clock";

export interface Wave {
  enemies: Enemy[];

  generateWave(): void;
}

export class FirstWave implements Wave {
  enemies: Enemy[];
  innerTicker: number = 0;
  private waveState: 'spawning' | 'waiting' = 'spawning';
  private enemiesSpawned: number = 0;
  private lastSpawnTime: number = -1;
  private waveStartTime: number = 0;

  constructor() {
    this.enemies = [];
    this.waveStartTime = GameClock.getTime();
  }

  generateWave(): void {
    const currentSecond = GameClock.getTime();
    const timeSinceWaveStart = currentSecond - this.waveStartTime;

    if (this.waveState === 'spawning') {
      // Spawn 5 enemies with 1-second intervals
      if (this.enemiesSpawned < 5 && this.lastSpawnTime !== currentSecond) {
        this.enemies.push(new Enemy());
        this.enemiesSpawned++;
        this.lastSpawnTime = currentSecond;

        if (this.enemiesSpawned >= 5) {
          this.waveState = 'waiting';
        }
      }
    } else if (this.waveState === 'waiting') {
      // Wait for 5 seconds after spawning 5 enemies
      if (timeSinceWaveStart >= 10) { // 5 seconds spawning + 5 seconds waiting
        // Reset for next wave
        this.waveState = 'spawning';
        this.enemiesSpawned = 0;
        this.waveStartTime = currentSecond;
      }
    }
  }
}
