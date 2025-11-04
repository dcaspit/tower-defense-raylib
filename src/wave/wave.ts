import Enemy from "../enemies/enemy";
import { GameClock } from "../utils/game-clock";

export class Wave {
  enemies: Enemy[];
  private waveState: 'spawning' | 'waiting' = 'spawning';
  private enemiesSpawned: number = 0;
  private lastSpawnTime: number = -1;
  private waveStartTime: number = 0;
  private enemyCount = 0;

  constructor(private wave: { totalEnemies: number, enemiesPerWave: number, waveTime: number }) {
    this.enemies = [];
    this.waveStartTime = GameClock.getTime();
  }

  completed(): boolean {
    return this.enemyCount >= this.wave.totalEnemies && this.enemies.length === 0;
  }

  updateWave() {
    if (this.waveState === 'spawning') {
      this.spawn();
    } else if (this.waveState === 'waiting') {
      this.wait();
    }
  }

  wait() {
    // Wait for 5 seconds after spawning 5 enemies

    const currentSecond = GameClock.getTime();
    const timeSinceWaveStart = currentSecond - this.waveStartTime;

    if (timeSinceWaveStart >= this.wave.waveTime) { // 5 seconds spawning + 5 seconds waiting
      // Reset for next wave
      this.waveState = 'spawning';
      this.enemiesSpawned = 0;
      this.waveStartTime = currentSecond;
    }
  }

  spawn() {
    const currentSecond = GameClock.getTime();

    if (this.enemiesSpawned >= this.wave.enemiesPerWave || this.lastSpawnTime === currentSecond) return;

    this.enemyCount++;
    this.enemies.push(new Enemy(this.enemyCount));
    this.enemiesSpawned++;
    this.lastSpawnTime = currentSecond;

    if (this.enemiesSpawned >= this.wave.enemiesPerWave) {
      this.waveState = 'waiting';
    }
  }
}

