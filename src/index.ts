import r from "raylib";
import GameMap from "./map/gameMap";
import { screenHeight, screenWidth } from "./utils/consts";
import WaveManager from "./wave/waveManager";
import { Tower } from "./towers/tower";
import { Panel } from "./panel/panel";

function main() {
  let frameCounter: number = 0;

  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  let pause = true;
  const towers: Tower[] = [];
  const addTower = (pos: r.Vector2) => {
    towers.push(new Tower(pos.x, pos.y));
  };
  const map = new GameMap(addTower);
  const waveMgr = new WaveManager(map.enemyPath);
  const onStart = () => {
    pause = !pause;
    if (pause) {
      waveMgr.reset();
      towers.forEach((tower) => tower.reset());
    }
  };
  const panel = new Panel(onStart);

  while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    map.drawMap(pause);

    if (!pause) {
      waveMgr.update();
      let enemies = waveMgr.drawWave();
      towers.forEach((tower) => {
        tower.checkIfEnemyWithinTowerRange(enemies[0].pos);
        tower.updateProjectile(enemies[0].pos);
        tower.draw();
      });
    } else {
      towers.forEach((tower) => {
        tower.draw();
      });
    }

    panel.draw(pause);
    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
