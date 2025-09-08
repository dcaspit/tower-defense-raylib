import r from "raylib";
import GameMap from "./map/gameMap";
import { screenHeight, screenWidth } from "./utils/consts";
import WaveManager from "./wave/waveManager";
import { Tower } from "./towers/tower";
import { RightPanel } from "./panels/rightPanel";
import { TopPanel } from "./panels/topPanel";

function main() {
  let frameCounter: number = 0;

  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  let pause = true;
  const towers: Tower[] = [];
  const addTower = (pos: r.Vector2) => {
    towers.push(new Tower(pos.x, pos.y));
  };

  const onBaseDeath = () => {
    waveMgr.reset()
    towers.forEach((tower) => tower.resetProjectile())
    pause = true;
  };

  const map = new GameMap(addTower,onBaseDeath);
  const waveMgr = new WaveManager(map.enemyPath,map.base);

  const onStart = () => {
    pause = !pause;
    if (pause) {
      waveMgr.reset();
      towers.forEach((tower) => tower.resetProjectile());
    }
  };
  const rightPanel = new RightPanel(onStart);
  const topPanel = new TopPanel();

  while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    map.drawMap(pause);

    if (!pause) {
      waveMgr.update();
      let enemies = waveMgr.drawWave();
      towers.forEach((tower) => {
        if (enemies.length !== 0) {
          tower.checkIfEnemyWithinTowerRange(enemies);
          tower.updateProjectile();
        } else {
          tower.resetProjectile();
        }
        tower.draw();
      });
    } else {
      towers.forEach((tower) => {
        tower.draw();
      });
    }

    rightPanel.draw(pause);
    topPanel.draw();
    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
