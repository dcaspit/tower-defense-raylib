package org.tower_defense.scene;

import org.tower_defense.game.GameState;
import org.tower_defense.utils.ScreenConstants;

import static com.raylib.Colors.*;
import static com.raylib.Raylib.*;

public class SceneStart {
    private float mFrame = 0;
    private float mRotate = 0;
    private float mColor = 0;
    private float mImageWidth = 0;
    private float mImageHeight = 0;

    private Texture image = LoadTexture("C:\\Users\\User\\Desktop\\raylib_java\\raylib_test\\src\\main\\resources\\logo.png");

    public SceneStart() {

    }

    public GameState drawAndUpdateStart() {
        DrawFPS(10,10);
        ClearBackground(BLACK);
        Rectangle r1 = new Rectangle().x(80).y(93).width(1024).height(980);
        Rectangle r2 = new Rectangle().x(340 + 1024 / 2).y(50 + 1024 / 2).width(mImageWidth).height(mImageHeight);

        Vector2 y = new Vector2().x(1024 / 2).y(980 / 2);
        if(mFrame <= 255) {
            DrawTexturePro(image, r1, r2, y, 00, WHITE);
            mRotate = 360 * mColor / 255;
            mColor += 1;
            mImageWidth = 1024 * mColor / 255;
            mImageHeight = 980 * mColor / 255;
        } else {
            DrawTexturePro(image, r1, r2, y, 00, WHITE);
        }
        mFrame ++;
        if (mFrame >= 255 + 30)
        {
            return GameState.MENU;
        }
        else
        {
            return GameState.START;
        }

    }
}
