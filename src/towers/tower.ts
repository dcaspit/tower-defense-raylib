import r from "raylib";

export class Tower {
  power: number = 1;
  position: r.Vector2 = { x: 0, y: 0 };
  projectile: r.Vector2 = { x: 0, y: 0 };
  shouldShot: boolean = false;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.projectile.x = x;
    this.projectile.y = y;
  }

  draw() {
    r.DrawRectangle(this.position.x, this.position.y, 15, 15, r.ORANGE);
    r.DrawCircleLines(
      this.position.x + 7.5,
      this.position.y + 7.5,
      100,
      r.ORANGE,
    );
    r.DrawCircle(this.projectile.x, this.projectile.y, 5, r.PURPLE);
  }

  checkIfEnemyWithinTowerRange(enemy: r.Vector2): void {
    const dx = enemy.x - this.position.x;
    const dy = enemy.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    console.log("distance", distance);
    this.shouldShot = distance <= 100;
  }

  updateProjectile(enemy: r.Vector2) {
    if (!this.shouldShot && !this.projectileFired()) return;

    console.log("projectile:", this.projectile);
    console.log("enemyPos:", enemy);

    const dx = enemy.x - this.projectile.x;
    const dy = enemy.y - this.projectile.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    // Check if projectile reached target (optional)
    if (distance < 5) {
      // Hit the target, handle collision
      this.resetProjectile();
      this.shouldShot = false;
      return;
    }

    const directionX = dx / distance;
    const directionY = dy / distance;

    const projectileSpeed = 1; // adjust speed as needed

    // Move projectile using the calculated direction
    this.projectile.x += directionX * projectileSpeed;
    this.projectile.y += directionY * projectileSpeed;
  }

  projectileFired(): boolean {
    return (
      this.projectile.x != this.position.x &&
      this.projectile.y != this.position.y
    );
  }

  resetProjectile() {
    this.projectile.x = this.position.x;
    this.projectile.y = this.position.y;
  }
}
