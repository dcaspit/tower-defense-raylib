import r from "raylib";
import GameMap from "./map/gameMap";
import { screenHeight, screenWidth } from "./utils/consts";
import WaveManager from "./wave/waveManager";
import { Tower } from "./towers/tower";
import { RightPanel } from "./panels/rightPanel";
import { TopPanel } from "./panels/topPanel";
import { GameClock } from "./utils/game-clock";
import { Projectile } from "./towers/projectile";
import { Textures } from "./utils/textures";

function main() {
  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  Textures.load();

  let pause = true;
  let waveCompleted = false;

  const towers: Tower[] = [];
  const addTower = (pos: r.Vector2) => {
    towers.push(new Tower(pos.x, pos.y));
  };

  const onBaseDeath = () => {
    waveMgr.reset();
    projectiles = [];
    pause = true;
  };

  const onWaveCompleted = () => {
    projectiles = [];
    waveCompleted = true;
    GameClock.count(5, () => {
      waveCompleted = false;
      pause = true;
    });
  }

  const map = new GameMap(addTower, onBaseDeath);
  const waveMgr = new WaveManager(map.enemyPath, map.base, onWaveCompleted);

  let projectiles: Projectile[] = [];

  const onStart = () => {
    pause = !pause;
    if (pause) {
      waveMgr.reset();
      projectiles = [];
    }
  };

  const rightPanel = new RightPanel(onStart);
  const topPanel = new TopPanel();
  const onEnemyDeath = () => {
    topPanel.addMoney();
  };

  while (!r.WindowShouldClose()) {
    // Update Phase

    GameClock.startTick();
    if (!pause && !waveCompleted) {
      projectiles = projectiles.filter((p) => p.state !== 'reached');
      waveMgr.update(onEnemyDeath);
      const enemies = waveMgr.enemies();
      if (enemies.length !== 0) {
        towers.forEach((tower) => {
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
    map.drawMap(pause);
    if (!pause && !waveCompleted) {
      waveMgr.drawWave();
      towers.forEach((tower) => {
        tower.draw();
      });
      projectiles.forEach((p) => {
        p.drawProjectile();
      });
    } else {
      towers.forEach((tower) => {
        tower.draw();
      });
      if (waveCompleted) {
        r.DrawRectangle(screenHeight / 2 - 50, screenWidth / 2 - 25, 100, 50, r.RED);
        r.DrawText('Wave Completed', (screenHeight / 2 - 50) + 10, (screenWidth / 2 - 50) + 20, 15, r.BLACK);
      }
    }

    rightPanel.draw(pause);
    topPanel.draw(waveMgr.waveNumber());
    r.EndDrawing();

  }

  r.CloseWindow();
}

main();
