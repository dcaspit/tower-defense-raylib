package org.tower_defense.scene;

import org.tower_defense.game.GameState;

import static com.raylib.Raylib.*;

public class SceneManager {
    private GameState gameState;
    private SceneStart start = new SceneStart();
    private SceneMenu menu = new SceneMenu();
    private ScenePlay play = new ScenePlay();

    public SceneManager() {
        gameState = GameState.START;
    }

    public void run() {
        while(!WindowShouldClose()) {
            BeginDrawing();
            switch (gameState) {
                case START:
                    gameState = start.drawAndUpdateStart();
                    break;
                case RESUME:
                    break;
                case MENU:
                    gameState = menu.drawAndUpdateMainMenu();
                    break;
                case PAUSE:
                    break;
                case GAME_OVER:
                    break;
                case QUIT:
                    break;
                case SCOREBOARD:
                    break;
                case PLAY:
                    gameState = play.drawAndUpdateStart();
                    break;
            }
            EndDrawing();
        }
    }
}
