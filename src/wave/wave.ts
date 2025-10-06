import Enemy from "../enemies/enemy";
import { GameClock } from "../utils/game-clock";

export interface Wave {
  enemies: Enemy[];

  updateWave(): boolean;
}

export class FirstWave implements Wave {
  enemies: Enemy[];
  private waveState: 'spawning' | 'waiting' = 'spawning';
  private enemiesSpawned: number = 0;
  private lastSpawnTime: number = -1;
  private waveStartTime: number = 0;

  constructor() {
    this.enemies = [];
    this.waveStartTime = GameClock.getTime();
  }

  private enemyCount = 0;

  updateWave(): boolean {
    if (this.enemyCount >= 6) {
      if (this.enemies.length === 0) {
        return true;
      }
      return false;
    }

    const currentSecond = GameClock.getTime();
    const timeSinceWaveStart = currentSecond - this.waveStartTime;

    if (this.waveState === 'spawning') {
      // Spawn 5 enemies with 1-second intervals
      if (this.enemiesSpawned < 3 && this.lastSpawnTime !== currentSecond) {
        this.enemyCount++;
        this.enemies.push(new Enemy(this.enemyCount));
        console.log('Enemy Added: ', this.enemyCount);
        this.enemiesSpawned++;
        this.lastSpawnTime = currentSecond;



        if (this.enemiesSpawned >= 3) {
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

    return false;
  }

  removeDeadEnemies() {

  }
}


export class SecondWave implements Wave {
  enemies: Enemy[];
  private waveState: 'spawning' | 'waiting' = 'spawning';
  private enemiesSpawned: number = 0;
  private lastSpawnTime: number = -1;
  private waveStartTime: number = 0;

  constructor() {
    this.enemies = [];
    this.waveStartTime = GameClock.getTime();
  }

  private enemyCount = 0;

  updateWave(): boolean {
    const currentSecond = GameClock.getTime();
    const timeSinceWaveStart = currentSecond - this.waveStartTime;

    if (this.waveState === 'spawning') {
      // Spawn 5 enemies with 1-second intervals
      if (this.enemiesSpawned < 3 && this.lastSpawnTime !== currentSecond) {
        this.enemyCount++;
        this.enemies.push(new Enemy(this.enemyCount));
        console.log('Enemy Added: ', this.enemyCount);
        this.enemiesSpawned++;
        this.lastSpawnTime = currentSecond;

        if (this.enemiesSpawned >= 3) {
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

    return false;
  }

  removeDeadEnemies() {

  }
}
