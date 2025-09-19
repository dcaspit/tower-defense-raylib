import { argv0 } from "process";

export class GameClock {
  private static frameCount: number = 0;
  private static seconds: number = 0;
  private static framesPerMove: number = 60;

  static update() {
    this.frameCount++;
    // Check if enough frames have passed to move
    if (this.frameCount < this.framesPerMove) return;
    this.frameCount = 0;
    this.seconds++;
  }

  static reset() {
    this.frameCount = 0;
    this.seconds = 0;
  }

  static getTime() {
    return this.seconds;
  }

  static translitionFactor(): number {
    return this.frameCount / this.framesPerMove;
  }
}
