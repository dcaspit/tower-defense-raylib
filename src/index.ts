import r from 'raylib';
import { Textures } from './utils/textures';
import { screenWidth, screenHeight } from './utils/consts';
import { Game } from './game/game';

function main() {
  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  Textures.load();

  let game = new Game();
  game.start();

  r.CloseWindow();
}

main();
