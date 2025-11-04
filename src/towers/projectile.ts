import r from 'raylib';
import Enemy from '../enemies/enemy';
import { Textures, TexturesTypes } from '../utils/textures';

export class Projectile {
  texture: r.Texture;
  size = 20;
  state: 'locked' | 'reached' = 'locked';

  constructor(private enemy: Enemy, private position: r.Vector2, private onProjectileHit: () => void) {
    this.texture = Textures.asset(TexturesTypes.projectile);
  }

  drawProjectile() {
    if (!this.enemy || this.enemy.health <= 0) {
      this.onProjectileHit();
      this.state = 'reached';
      return;
    }
    const dest = {
      x: this.position.x - this.size / 2,
      y: this.position.y - this.size / 2,
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
    if (!this.enemy || this.enemy.health <= 0) {
      this.onProjectileHit();
      this.state = 'reached';
      return;
    }

    // Check if projectile collides with current target
    // Use proper AABB collision detection with projectile and enemy sizes
    if (
      this.position.x + this.size >= this.enemy.pos.x &&
      this.position.x <= this.enemy.pos.x + this.enemy.size &&
      this.position.y <= this.enemy.pos.y + this.enemy.size &&
      this.position.y + this.size >= this.enemy.pos.y
    ) {
      // Hit the target, handle collision
      this.enemy.takeDamage(10);
      this.state = 'reached';
      this.onProjectileHit();
      return;
    }

    // Aim at the center of the enemy for better accuracy
    const targetCenterX = this.enemy.pos.x + this.enemy.size / 2;
    const targetCenterY = this.enemy.pos.y + this.enemy.size / 2;
    const dx = targetCenterX - this.position.x;
    const dy = targetCenterY - this.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const directionX = dx / distance;
    const directionY = dy / distance;

    const projectileSpeed = 1.0; // adjust speed as needed

    // Move projectile using the calculated direction
    this.position.x += directionX * projectileSpeed;
    this.position.y += directionY * projectileSpeed;
  }

}
