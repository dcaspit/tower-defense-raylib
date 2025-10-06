import Enemy from "../enemies/enemy";
import { GameClock } from "../utils/game-clock";

export class Wave {
  enemies: Enemy[];
  private waveState: 'spawning' | 'waiting' = 'spawning';
  private enemiesSpawned: number = 0;
  private lastSpawnTime: number = -1;
  private waveStartTime: number = 0;

  constructor(private wave: { totalEnemies: number, enemiesPerWave: number, waveTime: number }) {
    this.enemies = [];
    this.waveStartTime = GameClock.getTime();
  }

  private enemyCount = 0;

  updateWave(): boolean {
    if (this.enemyCount >= this.wave.totalEnemies) {
      if (this.enemies.length === 0) {
        return true;
      }
      return false;
    }

    const currentSecond = GameClock.getTime();
    const timeSinceWaveStart = currentSecond - this.waveStartTime;

    if (this.waveState === 'spawning') {
      // Spawn 5 enemies with 1-second intervals
      if (this.enemiesSpawned < this.wave.enemiesPerWave && this.lastSpawnTime !== currentSecond) {
        this.enemyCount++;
        this.enemies.push(new Enemy(this.enemyCount));
        this.enemiesSpawned++;
        this.lastSpawnTime = currentSecond;

        if (this.enemiesSpawned >= this.wave.enemiesPerWave) {
          this.waveState = 'waiting';
        }
      }
    } else if (this.waveState === 'waiting') {
      // Wait for 5 seconds after spawning 5 enemies
      if (timeSinceWaveStart >= this.wave.waveTime) { // 5 seconds spawning + 5 seconds waiting
        // Reset for next wave
        this.waveState = 'spawning';
        this.enemiesSpawned = 0;
        this.waveStartTime = currentSecond;
      }
    }

    return false;
  }

}

