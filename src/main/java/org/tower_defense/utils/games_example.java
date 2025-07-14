package org.tower_defense.utils;

import com.raylib.Raylib;

import static com.raylib.Colors.*;
import static com.raylib.Colors.DARKGRAY;
import static com.raylib.Raylib.*;
import static com.raylib.Raylib.CloseWindow;

public class games_example {
    static final int MAX_BUILDINGS = 100;

    public static void exampleBuildingsGame() {
        int screenWidth = 800;
        int screenHeight = 450;

        InitWindow(screenWidth, screenHeight, "raylib [core] example - 2d camera");

        Raylib.Rectangle player = new Raylib.Rectangle().x(400).y(280).width(40).height(40);
        Raylib.Rectangle[] buildings = new Raylib.Rectangle[MAX_BUILDINGS];
        Raylib.Color[] buildColors = new Raylib.Color[MAX_BUILDINGS];

        int spacing = 0;

        for (int i = 0; i < MAX_BUILDINGS; i++) {
            float width = GetRandomValue(50, 200);
            float height = GetRandomValue(100, 800);
            float y = screenHeight - 130.0f - height;
            float x = -6000.0f + spacing;

            buildings[i] = (new Raylib.Rectangle()).x(x).y(y).width(width).height( height);
            spacing += (int) width;

            buildColors[i] = new Raylib.Color()
                    .r( (byte)GetRandomValue(200, 240))
                    .g((byte)GetRandomValue(200, 240))
                    .b((byte)GetRandomValue(200, 250))
                    .a((byte)255);
        }

        Raylib.Camera2D camera = new Raylib.Camera2D();
        camera.target(new Raylib.Vector2().x(player.x() + 20.0f).y(player.y() + 20.0f));
        camera.offset(new Raylib.Vector2().x(screenWidth / 2.0f).y( screenHeight / 2.0f));
        camera.rotation(0.0f);
        camera.zoom(1.0f);

        SetTargetFPS(60);

        while (!WindowShouldClose()) {
            // Update
            if (IsKeyDown(KEY_RIGHT)) player.x(player.x() + 2);
            else if (IsKeyDown(KEY_LEFT)) player.x(player.x() - 2);

            camera.target(new Vector2().x(player.x() + 20.0f).y(player.y() + 20.0f));

            if (IsKeyDown(KEY_A)) camera.rotation(camera.rotation() - 1);
            else if (IsKeyDown(KEY_S)) camera.rotation(camera.rotation() + 1);

            if (camera.rotation() > 40) camera.rotation(40);
            else if (camera.rotation() < -40) camera.rotation(-40);

            camera.zoom((float)Math.exp(Math.log(camera.zoom()) + (GetMouseWheelMove() * 0.1f)));

            if (camera.zoom() > 3.0f) camera.zoom(3.0f);
            else if (camera.zoom() < 0.1f) camera.zoom(0.1f);

            if (IsKeyPressed(KEY_R)) {
                camera.zoom(1.0f);
                camera.rotation(0.0f);
            }

            // Draw
            BeginDrawing();
            ClearBackground(RAYWHITE);

            BeginMode2D(camera);

            DrawRectangle(-6000, 320, 13000, 8000, DARKGRAY);

            for (int i = 0; i < MAX_BUILDINGS; i++) {

                DrawRectangleRec(buildings[i], buildColors[i]);
            }

            DrawRectangleRec(player, RED);

            DrawLine((int)camera.target().x(), -screenHeight * 10, (int)camera.target().x(), screenHeight * 10, GREEN);
            DrawLine(-screenWidth * 10, (int)camera.target().y(), screenWidth * 10, (int)camera.target().y(), GREEN);

            EndMode2D();

            DrawText("SCREEN AREA", 640, 10, 20, RED);

            DrawRectangle(0, 0, screenWidth, 5, RED);
            DrawRectangle(0, 5, 5, screenHeight - 10, RED);
            DrawRectangle(screenWidth - 5, 5, 5, screenHeight - 10, RED);
            DrawRectangle(0, screenHeight - 5, screenWidth, 5, RED);

            DrawRectangle(10, 10, 250, 113, Fade(SKYBLUE, 0.5f));
            DrawRectangleLines(10, 10, 250, 113, BLUE);

            DrawText("Free 2d camera controls:", 20, 20, 10, BLACK);
            DrawText("- Right/Left to move Offset", 40, 40, 10, DARKGRAY);
            DrawText("- Mouse Wheel to Zoom in-out", 40, 60, 10, DARKGRAY);
            DrawText("- A / S to Rotate", 40, 80, 10, DARKGRAY);
            DrawText("- R to reset Zoom and Rotation", 40, 100, 10, DARKGRAY);

            EndDrawing();
        }

        CloseWindow();
    }


    public static void collisionExample() {
        int screenWidth = 800;
        int screenHeight = 450;

        InitWindow(screenWidth, screenHeight, "raylib [core] example - 2d camera");

        Rectangle player = new Rectangle().x(400).y(280).width(40).height(40);
        Rectangle rock = new Rectangle().x(520).y(450).width(70).height(70);

        Camera2D camera = new Camera2D();
        camera.target(new Vector2().x(player.x() + 20.0f).y(player.y() + 20.0f));
        camera.offset(new Vector2().x(screenWidth / 2.0f).y(screenHeight / 2.0f));
        camera.rotation(0.0f);
        camera.zoom(1.0f);

        SetTargetFPS(60);

        float gravity = 0.5f;
        float velocityY = 0.0f;
        float groundLevel = screenHeight + player.height() - 10;

        while (!WindowShouldClose()) {
            boolean isOnGround = false;
            // Update
            if (IsKeyDown(KEY_RIGHT)) player.x(player.x() + 5);
            if (IsKeyDown(KEY_LEFT)) player.x(player.x() - 5);

            // Gravity
            velocityY += gravity;
            player.y(player.y() + velocityY);

            // AABB collision check
            if (CheckCollisionRecs(player, rock)) {
                float playerBottom = player.y() + player.height();
                float playerTop = player.y();
                float playerRight = player.x() + player.width();
                float playerLeft = player.x();

                float rockBottom = rock.y() + rock.height();
                float rockTop = rock.y();
                float rockRight = rock.x() + rock.width();
                float rockLeft = rock.x();

                float fromTop = Math.abs(rockTop - playerBottom);
                float fromBottom = Math.abs(rockBottom - playerTop);
                float fromLeft = Math.abs(rockLeft - playerRight);
                float fromRight = Math.abs(rockRight - playerLeft);

                float minDist = Math.min(Math.min(fromTop, fromBottom), Math.min(fromLeft, fromRight));

                if (minDist == fromTop && velocityY >= 0) {
                    // Colliding from top
                    player.y(rock.y() - player.height());
                    velocityY = 0;
                    isOnGround = true;
                } else if (minDist == fromLeft) {
                    // Colliding from left
                    player.x(rock.x() - player.width());
                } else if (minDist == fromRight) {
                    // Colliding from rights
                    player.x(rock.x() + rock.width());
                }
                // Optional: if you want to prevent player from going up through bottom
                // else if (minDist == fromBottom && velocityY < 0) {
                //     player.y(rockBottom);
                //     velocityY = 0;
                // }
            }

            // Ground collision
            if (player.y() >= groundLevel) {
                player.y(groundLevel);
                velocityY = 0;
                isOnGround = true;
            }

            // Optional Jump (space key)
            if (IsKeyPressed(KEY_SPACE) && isOnGround) {
                velocityY = -10.0f; // jump strength
            }

            // Draw
            BeginDrawing();
            ClearBackground(RAYWHITE);
            BeginMode2D(camera);

            DrawRectangleRec(player, RED);
            DrawRectangleRec(rock, GREEN);

            EndMode2D();
            EndDrawing();
        }
    }
}
