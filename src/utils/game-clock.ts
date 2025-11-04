import { argv0 } from "process";

export class GameClock {
  private static frameCount: number = 0;
  private static seconds: number = 0;
  private static framesPerMove: number = 60;
  private static callbacks: Map<number, (() => void)[]> = new Map();

  static startTick() {
    this.frameCount++;
  }

  static endTick() {
    if (this.sixtyFramesPassed()) {
      this.frameCount = 0;
      this.seconds++;

      // Trigger callbacks registered for this second
      const secondCallbacks = this.callbacks.get(this.seconds);
      if (secondCallbacks) {
        secondCallbacks.forEach(callback => callback());
        this.callbacks.delete(this.seconds);
      }
    }
  }

  static sixtyFramesPassed(): boolean {
    return this.frameCount >= this.framesPerMove;
  }

  static reset() {
    this.frameCount = 0;
    this.seconds = 0;
    this.callbacks.clear();
  }

  static getTime() {
    return this.seconds;
  }

  static translitionFactor(): number {
    return this.frameCount / this.framesPerMove;
  }

  static count(seconds: number, callback: () => void): void {
    const targetSecond = this.seconds + seconds;

    if (!this.callbacks.has(targetSecond)) {
      this.callbacks.set(targetSecond, []);
    }

    this.callbacks.get(targetSecond)!.push(callback);
  }
}
