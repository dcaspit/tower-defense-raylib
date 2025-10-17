import r from 'raylib';
import { Textures } from './utils/textures';
import { screenWidth, screenHeight } from './utils/consts';
import { Game } from './game/game';

function main() {
  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  Textures.load();

  let game: Game = new Game();
  game.start();

  while (!r.WindowShouldClose()) {
    // Update Phase
    game.update();

    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);
    // Draw Phase
    game.draw();
    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
