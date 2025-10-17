
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
  private map: GameMap;
  private waveMgr: WaveManager;
  private projectiles: Projectile[] = [];

  private addTower = (pos: r.Vector2) => {
    this.towers.push(new Tower(pos.x, pos.y));
  };

  private onBaseDeath = () => {
    this.waveMgr.reset();
    this.projectiles = [];
    this.pause = true;
  };

  private onWaveCompleted = () => {
    this.projectiles = [];
    this.waveCompleted = true;
    GameClock.count(5, () => {
      this.waveCompleted = false;
      this.pause = true;
    });
  }

  private restart = () => {
    this.pause = true;
    this.waveCompleted = false;
    this.towers = [];
  }

  constructor() {
    this.map = new GameMap(this.addTower, this.onBaseDeath);
    this.waveMgr = new WaveManager(this.map.enemyPath, this.map.base, this.onWaveCompleted, this.restart);
  }

  start() {

    Money.get();






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



  }
  update() {
    // Update Phase
    GameClock.startTick();
    if (!this.pause && !this.waveCompleted) {
      this.projectiles = this.projectiles.filter((p) => p.state !== 'reached');
      this.waveMgr.update(onEnemyDeath);
      const enemies = this.waveMgr.enemies();
      if (enemies.length !== 0) {
        this.towers.forEach((tower) => {
          const projectile = tower.isEnemyWithinTowerRange(enemies);
          if (projectile !== null) {
            this.projectiles.push(projectile);
          }
        });
      }
      this.projectiles.forEach((p) => {
        p.updateProjectile();
      });
    }
    GameClock.endTick();
  }

  draw() {

    //Draw Phase
    this.map.drawMap(this.pause);
    if (!this.pause && !this.waveCompleted) {
      this.waveMgr.drawWave();
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
  }
}
