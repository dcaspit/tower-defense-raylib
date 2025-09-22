import r from 'raylib';
import Enemy from '../enemies/enemy';

export class Projectile {

  projectile: r.Vector2 = { x: 0, y: 0 };
  projectileTexture: r.Texture;
  projectileSize = 20;
  state: '' | 'targetDead' = 'targetAlive';

  constructor(private enemy: Enemy, tower: r.Vector2) {
    this.projectile.x = tower.x / 2;
    this.projectile.y = tower.y / 2;
    this.projectileTexture = r.LoadTexture("assets/projectile.png");
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

  updateProjectile() {
    if (!this.enemy || this.enemy.health <= 0) return;

    // Check if projectile collides with current target
    // Use proper AABB collision detection with projectile and enemy sizes
    if (
      this.projectile.x - this.projectileSize / 2 < this.enemy.pos.x + this.enemy.enemySize &&
      this.projectile.x + this.projectileSize / 2 > this.enemy.pos.x &&
      this.projectile.y - this.projectileSize / 2 < this.enemy.pos.y + this.enemy.enemySize &&
      this.projectile.y + this.projectileSize / 2 > this.enemy.pos.y
    ) {
      // Hit the target, handle collision
      this.enemy.takeDamage(5);
      this.resetProjectile();
      this.shouldShot = false;
      this.enemy = null;
      return;
    }

    // Aim at the center of the enemy for better accuracy
    const targetCenterX = this.enemy.pos.x + this.enemy.enemySize / 2;
    const targetCenterY = this.enemy.pos.y + this.enemy.enemySize / 2;
    const dx = targetCenterX - this.projectile.x;
    const dy = targetCenterY - this.projectile.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Avoid division by zero and handle very close targets
    if (distance < 0.1) {
      // Target reached, trigger collision
      this.enemy.takeDamage(this.power);
      this.resetProjectile();
      this.shouldShot = false;
      this.enemy = null;
      return;
    }

    const directionX = dx / distance;
    const directionY = dy / distance;

    const projectileSpeed = 1.2; // adjust speed as needed

    // Move projectile using the calculated direction
    this.projectile.x += directionX * projectileSpeed;
    this.projectile.y += directionY * projectileSpeed;
  }

}
