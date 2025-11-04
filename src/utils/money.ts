

export class Money {
  private static money: number = 60;

  static get(): number {
    return this.money;
  }

  static decrease(amount: number): void {
    this.money -= amount;
  }

  static increase(amount: number): void {
    this.money += amount;
  }

  static enough(amount: number): boolean {
    return this.money >= amount;
  }
} 
