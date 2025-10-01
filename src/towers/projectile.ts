import r from 'raylib';
import Enemy from '../enemies/enemy';

export class Projectile {

  location: r.Vector2 = { x: 0, y: 0 };
  texture: r.Texture;
  size = 20;
  state: '' | 'targetDead' = 'targetAlive';

  constructor(private enemy: Enemy, tower: r.Vector2) {
    this.location.x = tower.x / 2;
    this.location.y = tower.y / 2;
    this.texture = r.LoadTexture("assets/projectile.png");
  }

  drawProjectile() {
    const dest = {
      x: this.location.x - this.size / 2,
      y: this.location.y - this.size / 2,
      width: this.size,
      height: this.size,
    };
    const src = {
      x: 0,
      y: 0,
      width: this.texture.width,
      height: this.texture.height,
    };
    r.DrawTexturePro(
      this.texture,
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
      this.location.x - this.size / 2 < this.enemy.pos.x + this.enemy.size &&
      this.location.x + this.size / 2 > this.enemy.pos.x &&
      this.location.y - this.size / 2 < this.enemy.pos.y + this.enemy.size &&
      this.location.y + this.size / 2 > this.enemy.pos.y
    ) {
      // Hit the target, handle collision
      this.enemy.takeDamage(5);
      this.resetProjectile();
      this.shouldShot = false;
      this.enemy = null;
      return;
    }

    // Aim at the center of the enemy for better accuracy
    const targetCenterX = this.enemy.pos.x + this.enemy.size / 2;
    const targetCenterY = this.enemy.pos.y + this.enemy.size / 2;
    const dx = targetCenterX - this.location.x;
    const dy = targetCenterY - this.location.y;
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
    this.location.x += directionX * projectileSpeed;
    this.location.y += directionY * projectileSpeed;
  }

}
