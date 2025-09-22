import r from "raylib";
import Enemy from "../enemies/enemy";
import { Projectile } from "./projectile";

export class Tower {
  power: number = 1;
  position: r.Vector2 = { x: 0, y: 0 };
  projectiles: Projectile[] = [];
  state: 'idle' | 'aim' | 'shooting' = 'idle';
  towerTexture: r.Texture;
  towerSize = 50;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.towerTexture = r.LoadTexture("assets/tower.png");
  }

  draw() {
    this.drawTower();
    this.drawTowerCircle();
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

  drawTowerCircle() {
    r.DrawCircleLines(
      this.position.x + this.towerSize / 2,
      this.position.y + this.towerSize / 2,
      100,
      r.ORANGE,
    );
  }

  checkIfEnemyWithinTowerRange(enemies: Enemy[]): Projectile[] {
    // If projectile is already fired, keep tracking current target
    if (this.state === 'shooting') return [];
    const projectiles: Projectile[] = [];
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
      projectiles.push(new Projectile(closestEnemy, this.position));
      this.state = 'shooting';
    } else {
      this.state = 'idle';
    }

    return projectiles;
  }

}
