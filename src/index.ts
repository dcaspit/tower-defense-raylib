import r from 'raylib';
import { Textures } from './utils/textures';
import { screenWidth, screenHeight } from './utils/consts';
import { Game } from './game/game';
import { MainMenu } from './menu/mainMenu';
import { on } from 'events';
import { Money } from './utils/money';

function main() {
  r.InitWindow(screenWidth, screenHeight, "Tower Defense");
  r.SetTargetFPS(60);

  Textures.load();
  Money.get();

  let state: 'menu' | 'play' = 'menu';

  const onGameOver = () => {
    state = 'menu';
  }

  let game: Game = new Game(onGameOver);
  let menu: MainMenu = new MainMenu(() => {
    state = 'play';
    game = new Game(onGameOver);
  });

  let spritesheet = r.LoadTexture('assets/MiniWorldSprites/Characters/Monsters/Slimes/Slime.png');
  let frameWidth = spritesheet.width / 6;
  let frameHeight = spritesheet.height / 6;

  let frameRec: r.Rectangle = { x: 0, y: 0, width: frameWidth, height: frameHeight };
  let pos: r.Vector2 = { x: 50, y: 10 };
  let currentFrame = 0;
  let frameCounter = 0;
  let frameSpeed = 10.0;


  while (!r.WindowShouldClose()) {
    
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    //frameCounter += r.GetFrameTime() * frameSpeed;
    //if(frameCounter >= 1) {
    //  currentFrame++;
    //  frameCounter = 0;
    //  if(currentFrame > 5) {
    //    currentFrame = 0;
    //  }
    //}
    
   // frameRec.x = currentFrame * frameWidth;

    if (state === 'menu') {
      menu.draw();
    } else {
      // Update Phase
      game.update();

      // Draw Phase
      game.draw();
    }

    
    //r.DrawTextureRec(spritesheet, frameRec, pos, r.WHITE);

    r.EndDrawing();
  }

  r.CloseWindow();
}

main();
