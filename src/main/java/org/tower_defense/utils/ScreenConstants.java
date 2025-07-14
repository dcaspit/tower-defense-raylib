package org.tower_defense.utils;

public interface ScreenConstants {
    int SCREEN_WIDTH = 1408;
    int SCREEN_HEIGHT = 980;
    int BOX_SIZE = 64;
    int ROW_SIZE = SCREEN_HEIGHT / BOX_SIZE;
    int COLUMN_SIZE = SCREEN_WIDTH / BOX_SIZE;
    int TOTAL_BOXES = ROW_SIZE * COLUMN_SIZE;
}
