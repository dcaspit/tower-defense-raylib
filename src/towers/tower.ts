import r from "raylib";
import Enemy from "../enemies/enemy";

export class Tower {
  power: number = 1;
  position: r.Vector2 = { x: 0, y: 0 };
  projectile: r.Vector2 = { x: 0, y: 0 };
  shouldShot: boolean = false;
  towerTexture: r.Texture;
  projectileTexture: r.Texture;
  towerSize = 50;
  projectileSize = 20;
  currentTarget: Enemy | null = null;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.projectile.x = x + this.towerSize / 2;
    this.projectile.y = y + this.towerSize / 2;
    this.towerTexture = r.LoadTexture("assets/tower.png");
    this.projectileTexture = r.LoadTexture("assets/projectile.png");
  }

  draw() {
    this.drawTower();
    this.drawTowerCircle();
    this.drawProjectile();
  }

  drawTower() {
    const dest = {
      x: this.position.x,
      y: this.position.y,
      width: this.towerSize,
      height: this.towerSize,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.towerTexture.width,
      height: this.towerTexture.height,
    };
    r.DrawTexturePro(this.towerTexture, src, dest, { x: 0, y: 0 }, 0, r.WHITE);
  }

  drawProjectile() {
    const dest = {
      x: this.projectile.x - this.projectileSize / 2,
      y: this.projectile.y - this.projectileSize / 2,
      width: this.projectileSize,
      height: this.projectileSize,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.projectileTexture.width,
      height: this.projectileTexture.height,
    };
    r.DrawTexturePro(
      this.projectileTexture,
      src,
      dest,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );
  }

  drawTowerCircle() {
    r.DrawCircleLines(
      this.position.x + this.towerSize / 2,
      this.position.y + this.towerSize / 2,
      100,
      r.ORANGE,
    );
  }

  checkIfEnemyWithinTowerRange(enemies: Enemy[]): void {
    // If projectile is already fired, keep tracking current target
    if (this.projectileFired() && this.currentTarget) return;
    
    // Find closest enemy within range
    let closestEnemy: Enemy | null = null;
    let closestDistance = 100; // Tower range
    
    for (const enemy of enemies) {
      const dx = (enemy.pos.x + enemy.enemySize / 2) - (this.position.x + this.towerSize / 2);
      const dy = (enemy.pos.y + enemy.enemySize / 2) - (this.position.y + this.towerSize / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= 100 && distance < closestDistance) {
        closestEnemy = enemy;
        closestDistance = distance;
      }
    }
    
    if (closestEnemy) {
      this.currentTarget = closestEnemy;
      this.shouldShot = true;
    } else {
      this.shouldShot = false;
    }
  }

  updateProjectile() {
    if (!this.currentTarget || (!this.shouldShot && !this.projectileFired())) return;

    // Check if projectile collides with current target
    // Use proper AABB collision detection with projectile and enemy sizes
    if (
      this.projectile.x - this.projectileSize / 2 < this.currentTarget.pos.x + this.currentTarget.enemySize &&
      this.projectile.x + this.projectileSize / 2 > this.currentTarget.pos.x &&
      this.projectile.y - this.projectileSize / 2 < this.currentTarget.pos.y + this.currentTarget.enemySize &&
      this.projectile.y + this.projectileSize / 2 > this.currentTarget.pos.y
    ) {
      // Hit the target, handle collision
      this.currentTarget.takeDamage();
      this.resetProjectile();
      this.shouldShot = false;
      this.currentTarget = null;
      return;
    }

    // Aim at the center of the enemy for better accuracy
    const targetCenterX = this.currentTarget.pos.x + this.currentTarget.enemySize / 2;
    const targetCenterY = this.currentTarget.pos.y + this.currentTarget.enemySize / 2;
    const dx = targetCenterX - this.projectile.x;
    const dy = targetCenterY - this.projectile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Avoid division by zero and handle very close targets
    if (distance < 0.1) {
      // Target reached, trigger collision
      this.currentTarget.takeDamage();
      this.resetProjectile();
      this.shouldShot = false;
      this.currentTarget = null;
      return;
    }

    const directionX = dx / distance;
    const directionY = dy / distance;

    const projectileSpeed = 1.2; // adjust speed as needed

    // Move projectile using the calculated direction
    this.projectile.x += directionX * projectileSpeed;
    this.projectile.y += directionY * projectileSpeed;
  }

  projectileFired(): boolean {
    return (
      this.projectile.x - this.towerSize / 2 != this.position.x &&
      this.projectile.y - this.towerSize / 2 != this.position.y
    );
  }

  resetProjectile() {
    this.projectile.x = this.position.x + this.towerSize / 2;
    this.projectile.y = this.position.y + this.towerSize / 2;
    this.currentTarget = null;
  }
}
