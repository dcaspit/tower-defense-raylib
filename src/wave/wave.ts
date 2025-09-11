import Enemy from "../enemies/enemy";

export interface Wave {
  enemies: Enemy[];
  generateWave(currentSecond: number): void;
}

export class FirstWave implements Wave {
  enemies: Enemy[];

  constructor() {
    this.enemies = [];
    this.enemies.push(new Enemy());
  }

  generateWave(currentSecond: number): void {
    if (currentSecond % 10 === 0) {
      this.enemies.push(new Enemy());
    }
    if (currentSecond % 11 === 0) {
      this.enemies.push(new Enemy());
    }
    if (currentSecond % 12 === 0) {
      this.enemies.push(new Enemy());
    }
    if (currentSecond % 13 === 0) {
      this.enemies.push(new Enemy());
    }
    if (currentSecond % 14 === 0) {
      this.enemies.push(new Enemy());
    }
  }
}
