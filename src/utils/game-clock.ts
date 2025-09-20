import { argv0 } from "process";

export class GameClock {
  private static frameCount: number = 0;
  private static seconds: number = 0;
  private static framesPerMove: number = 60;

  static startTick() {
    this.frameCount++;
  }

  static endTick() {
    if (this.sixtyFramesPassed()) {
      this.frameCount = 0;
      this.seconds++;
    }
  }

  static sixtyFramesPassed(): boolean {
    return this.frameCount >= this.framesPerMove;
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
