package org.tower_defense.utils;

import com.raylib.Raylib;

import static com.raylib.Raylib.*;

public class Buttons {

    public static boolean InRec(float mousePosX, float mousePosY, int x, int y, float width, float height){
        return mousePosX >= x &&
                mousePosX <= x + width &&
                mousePosY >= y &&
                mousePosY <= y + height;
    }

    public static boolean ButtonAsset(Raylib.Texture asset, Raylib.Rectangle source, float x, float y, float width, float height, Raylib.Color colorInRec, Raylib.Color colorOutRec) {
        if(InRec(GetMouseX(), GetMouseY(), (int) x, (int) y, width, height)) {
            DrawTexturePro(asset, source, new Rectangle().x(x).y(y).width(width).height(height), new Vector2().x(0).y(0), 0, colorInRec);
            if(IsMouseButtonPressed(MOUSE_BUTTON_LEFT)){
                return true;
            }
        } else {
            DrawTexturePro(asset, source, new Rectangle().x(x).y(y).width(width).height(height), new Vector2().x(0).y(0), 0, colorOutRec);
        }
        return false;
    }
}
