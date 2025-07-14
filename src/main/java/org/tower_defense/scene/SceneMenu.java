package org.tower_defense.scene;

import com.raylib.Raylib;
import org.tower_defense.game.GameState;
import org.tower_defense.utils.ScreenConstants;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;
import static org.tower_defense.utils.Buttons.ButtonAsset;

public class SceneMenu {

    private Raylib.Vector2 mMousePos = new Raylib.Vector2();
    private Texture image = LoadTexture("C:\\Users\\User\\Desktop\\raylib_java\\raylib_test\\src\\main\\resources\\main_menu_bg.png");
    private Texture start_button = LoadTexture("C:\\Users\\User\\Desktop\\raylib_java\\raylib_test\\src\\main\\resources\\start_button.png");

    public SceneMenu(){

    }

    GameState drawAndUpdateMainMenu() {
        ClearBackground(RAYWHITE);
        mMousePos.x(GetMouseX());
        mMousePos.y(GetMouseY());
        new Rectangle().x(0).y(0).width(600).height(400);
        new Rectangle().x(0).y(0).width(ScreenConstants.SCREEN_WIDTH + 200).height(ScreenConstants.SCREEN_HEIGHT);
        new Vector2();

        DrawTexture(image, 0 ,0, WHITE);
        DrawText("TOWER", 300, 100, 100, BLACK);
        DrawText("DEFENSE", 250, 200, 100, BLACK);

        if(ButtonAsset(start_button, new Rectangle().x(50).y(0).width(600).height(300), ScreenConstants.SCREEN_WIDTH + 70, 10, 115, 110, RED, DARKGRAY)){
            return GameState.PLAY;
        }

        return GameState.MENU;
    }

}
