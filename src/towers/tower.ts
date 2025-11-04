import r from "raylib";
import Enemy from "../enemies/enemy";
import { Projectile } from "./projectile";
import { Textures, TexturesTypes } from "../utils/textures";
import { GameClock } from "../utils/game-clock";

export const TOWER_COST = 60;

export class Tower {
  power: number = 1;
  position: r.Vector2 = { x: 0, y: 0 };
  projectiles: Projectile[] = [];
  state: "idle" | "shooting" = "idle";
  countState: boolean = false;
  towerTexture: r.Texture;
  towerSize = 50;

  constructor(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
    this.towerTexture = Textures.asset(TexturesTypes.tower);
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

  isEnemyWithinTowerRange(enemies: Enemy[]): Projectile | null {
    // If projectile is already fired, keep tracking current target
    if (this.state === "shooting" || this.countState) return null;

    const projectiles: Projectile[] = [];
    // Find closest enemy within range
    let closestEnemy: Enemy | null = null;
    let closestDistance = 100; // Tower range
    const towerCenterX = this.position.x + this.towerSize / 2;
    const towerCenterY = this.position.y + this.towerSize / 2;

    for (const enemy of enemies) {
      const dx = enemy.pos.x + enemy.size / 2 - towerCenterX;
      const dy = enemy.pos.y + enemy.size / 2 - towerCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= 100 && distance < closestDistance) {
        closestEnemy = enemy;
        closestDistance = distance;
      }
    }

    if (closestEnemy && this.state === 'idle' && !this.countState) {
      this.countState = true;
      GameClock.count(2, () => {
        this.countState = false;
      });

      this.state = "shooting";
      return new Projectile(closestEnemy, { x: towerCenterX, y: towerCenterY }, () => {
        this.state = 'idle';
      });
    }

    return null;
  }
}
