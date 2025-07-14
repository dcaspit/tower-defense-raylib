package org.tower_defense;

import org.tower_defense.scene.SceneManager;
import org.tower_defense.utils.ScreenConstants;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;

public class Main {

    public static void main(String[] args) {

        InitWindow(ScreenConstants.SCREEN_WIDTH + 200, ScreenConstants.SCREEN_HEIGHT, "Tower defense");
        SetConfigFlags(FLAG_VSYNC_HINT);
        SetTargetFPS(60);
        SetExitKey(0);

        SceneManager manager = new SceneManager();
        manager.run();

        CloseWindow();
    }
}