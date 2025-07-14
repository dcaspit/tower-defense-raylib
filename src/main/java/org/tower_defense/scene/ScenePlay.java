package org.tower_defense.scene;

import com.raylib.Raylib;
import org.tower_defense.game.GameState;

import static com.raylib.Colors.BLACK;
import static com.raylib.Colors.WHITE;
import static com.raylib.Raylib.*;
import static com.raylib.Raylib.DrawTexturePro;

public class ScenePlay {

    public ScenePlay() {

    }
    public GameState drawAndUpdateStart() {
        DrawFPS(10,10);
        ClearBackground(BLACK);
        return GameState.PLAY;
    }
}
