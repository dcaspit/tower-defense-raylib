
import r from "raylib";
import GameMap from "../map/gameMap";
import { screenHeight, screenWidth } from "../utils/consts";
import WaveManager, { waves } from "../wave/waveManager";
import { Tower } from "../towers/tower";
import { RightPanel } from "../panels/rightPanel";
import { TopPanel } from "../panels/topPanel";
import { GameClock } from "../utils/game-clock";
import { Projectile } from "../towers/projectile";
import { Textures } from "../utils/textures";
import { Money } from "../utils/money";

export class Game {

  pause = true;
  waveCompleted = false;
  towers: Tower[] = [];

  restart = () => {
    this.pause = true;
    this.waveCompleted = false;
    this.towers = [];
  }

  start() {

    Money.get();

    const addTower = (pos: r.Vector2) => {
      this.towers.push(new Tower(pos.x, pos.y));
    };

    const onBaseDeath = () => {
      waveMgr.reset();
      projectiles = [];
      this.pause = true;
    };

    const onWaveCompleted = () => {
      projectiles = [];
      this.waveCompleted = true;
      GameClock.count(5, () => {
        this.waveCompleted = false;
        this.pause = true;
      });
    }

    const map = new GameMap(addTower, onBaseDeath);
    const waveMgr = new WaveManager(map.enemyPath, map.base, onWaveCompleted, this.restart);

    let projectiles: Projectile[] = [];

    const onStart = () => {
      this.pause = !this.pause;
      if (this.pause) {
        waveMgr.reset();
        projectiles = [];
      }
    };

    const rightPanel = new RightPanel(onStart);
    const topPanel = new TopPanel(waves.length);
    const onEnemyDeath = () => {
      Money.increase(50);
    };

    while (!r.WindowShouldClose()) {
      // Update Phase

      GameClock.startTick();
      if (!this.pause && !this.waveCompleted) {
        projectiles = projectiles.filter((p) => p.state !== 'reached');
        waveMgr.update(onEnemyDeath);
        const enemies = waveMgr.enemies();
        if (enemies.length !== 0) {
          this.towers.forEach((tower) => {
            const projectile = tower.isEnemyWithinTowerRange(enemies);
            if (projectile !== null) {
              projectiles.push(projectile);
            }
          });
        }
        projectiles.forEach((p) => {
          p.updateProjectile();
        });
      }
      GameClock.endTick();

      //Draw Phase
      r.BeginDrawing();
      r.ClearBackground(r.RAYWHITE);
      map.drawMap(this.pause);
      if (!this.pause && !this.waveCompleted) {
        waveMgr.drawWave();
        this.towers.forEach((tower) => {
          tower.draw();
        });
        projectiles.forEach((p) => {
          p.drawProjectile();
        });
      } else {
        this.towers.forEach((tower) => {
          tower.draw();
        });
        if (this.waveCompleted) {
          r.DrawRectangle(screenHeight / 2 - 50, screenWidth / 2 - 25, 100, 50, r.RED);
          r.DrawText('Wave Completed', (screenHeight / 2 - 50) + 10, (screenWidth / 2 - 50) + 20, 15, r.BLACK);
        }
      }

      rightPanel.draw(this.pause);
      topPanel.draw(waveMgr.waveNumber());
      r.EndDrawing();

    }
  }

}
