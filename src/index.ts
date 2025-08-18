import r from "raylib";
import GameMap from "./map/gameMap";
import { screenHeight, screenWidth } from "./utils/consts";
import WaveManager from "./wave/waveManager";
import { Tower } from "./towers/tower";

function main() {
  let frameCounter: number = 0;

  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  const map = new GameMap();
  const waveMgr = new WaveManager(map.enemyPath);
  const towerOne = new Tower(160, 180);
  const towerTwo = new Tower(160, 380);
  const towerThree = new Tower(460, 180);
  const towers: Tower[] = [towerOne, towerTwo, towerThree];

  while (!r.WindowShouldClose()) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    waveMgr.update();

    map.drawMap();
    let enemies = waveMgr.drawWave();

    towers.forEach((tower) => {
      tower.checkIfEnemyWithinTowerRange(enemies[0].pos);
      tower.updateProjectile(enemies[0].pos);
      tower.draw();
    });

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
