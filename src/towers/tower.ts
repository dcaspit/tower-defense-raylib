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

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.projectile.x = x + (this.towerSize/2);
    this.projectile.y = y + (this.towerSize/2);
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
    r.DrawTexturePro(
      this.towerTexture,
      src,
      dest,
      { x: 0, y: 0 },
      0,
      r.WHITE,
    );

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

  checkIfEnemyWithinTowerRange(enemy: Enemy): void {
    const dx = enemy.pos.x - this.position.x;
    const dy = enemy.pos.y - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    console.log(distance);
    this.shouldShot = distance <= 100;
  }

  updateProjectile(enemy: Enemy) {
    if (!this.shouldShot && !this.projectileFired()) return;

    // Check if projectile collides with enemy rectangle (10x10)
    if (
      this.projectile.x + 5 >= enemy.pos.x &&
      this.projectile.x - 5 <= enemy.pos.x + 10 &&
      this.projectile.y + 5 >= enemy.pos.y &&
      this.projectile.y - 5 <= enemy.pos.y + 10
    ) {
      // Hit the target, handle collision
      enemy.takeDamage();
      this.resetProjectile();
      this.shouldShot = false;
      return;
    }

    const dx = enemy.pos.x - this.projectile.x;
    const dy = enemy.pos.y - this.projectile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const directionX = dx / distance;
    const directionY = dy / distance;

    const projectileSpeed = 1.2; // adjust speed as needed

    // Move projectile using the calculated direction
    this.projectile.x += directionX * projectileSpeed;
    this.projectile.y += directionY * projectileSpeed;
  }

  projectileFired(): boolean {
    return (
      this.projectile.x - (this.towerSize/2) != this.position.x &&
      this.projectile.y - (this.towerSize/2) != this.position.y
    );
  }

  resetProjectile() {
    this.projectile.x = this.position.x + (this.towerSize/2);
    this.projectile.y = this.position.y + (this.towerSize/2);
  }
}
