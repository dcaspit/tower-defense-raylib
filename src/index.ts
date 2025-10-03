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
  const towers: Tower[] = [];
  const addTower = (pos: r.Vector2) => {
    towers.push(new Tower(pos.x, pos.y));
  };

  let projectiles: Projectile[] = [];

  const onBaseDeath = () => {
    waveMgr.reset()
    projectiles = [];
    pause = true;
  };

  const map = new GameMap(addTower, onBaseDeath);
  const waveMgr = new WaveManager(map.enemyPath, map.base);

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
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    map.drawMap(pause);

    if (!pause) {
      projectiles = projectiles.filter((p) => p.state !== 'reached');
      GameClock.startTick();
      waveMgr.update(onEnemyDeath);
      GameClock.endTick();
      let enemies = waveMgr.drawWave();
      towers.forEach((tower) => {
        if (enemies.length !== 0) {
          const projectile = tower.isEnemyWithinTowerRange(enemies);
          if (projectile !== null) {
            projectiles.push(projectile);
          }
        }
        tower.draw();
      });
      projectiles.forEach((p) => {
        p.updateProjectile();
        p.drawProjectile();
      });
    } else {
      towers.forEach((tower) => {
        tower.draw();
      });
    }

    rightPanel.draw(pause);
    topPanel.draw(waveMgr.waveNumber());
    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
