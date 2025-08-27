# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Build and Run
- `npm run game` - Compiles TypeScript to JavaScript and runs the game
- `tsc` - Compile TypeScript files to dist/ directory
- `node dist/index.js` - Run the compiled game directly

### Development
- No test framework is currently configured (package.json shows placeholder test script)
- No linting or formatting tools are configured

## Architecture Overview

This is a tower defense game built with TypeScript and Raylib. The game uses a real-time game loop with frame-based updates.

### Core Game Loop
The main game loop is in `src/index.ts` which:
- Initializes a 500x500 window at 60 FPS
- Creates instances of GameMap, WaveManager, and Tower
- Runs the main game loop with BeginDrawing/EndDrawing pattern
- Updates wave manager, draws map, enemies, and tower each frame

### Key Components

**GameMap (`src/map/gameMap.ts`)**
- Parses enemy paths from a 2D array map configuration
- Renders the game map with different colored tiles (grass, path, water, etc.)
- Provides enemy pathfinding coordinates to the wave system
- Uses 50x50 pixel grid tiles

**WaveManager (`src/wave/waveManager.ts`)**
- Manages enemy spawning and movement along the parsed path
- Implements smooth linear interpolation between waypoints for enemy movement
- Controls enemy movement timing with frame-based counters (60 frames per move)
- Returns enemy positions for tower targeting

**Tower (`src/towers/tower.ts`)**
- Single tower implementation with projectile system
- Calculates projectile trajectory toward enemy center position for accuracy
- Draws tower sprite, range circle, and projectile
- Implements AABB collision detection for precise projectile-enemy collision
- Handles edge cases like division by zero and very close targets
- Uses proper bounding box collision with projectileSize (20px) and enemySize (40px)

**Enemy (`src/enemies/enemy.ts`)**
- Basic enemy class with position tracking
- Renders as a red rectangle
- Position updated by WaveManager during movement

### Key Technical Patterns
- Frame-based timing for smooth animations and consistent gameplay
- Vector2 positions for all game objects using Raylib's coordinate system
- Linear interpolation for smooth enemy movement between grid waypoints
- Component-based architecture with separate managers for different game systems

## Recent Improvements

### Collision Detection Enhancement (src/towers/tower.ts:109-148)
**Problem**: The original collision detection used hardcoded values and didn't account for proper bounding box collision between projectiles and enemies.

**Solution**: Implemented proper AABB (Axis-Aligned Bounding Box) collision detection:
- Uses actual `projectileSize` (20px) and `enemySize` (40px) for accurate collision boundaries
- Aims projectiles at enemy center rather than top-left corner for better accuracy
- Added edge case handling for very close targets (distance < 0.1) to prevent division by zero
- Maintains collision detection in `updateProjectile()` method at `tower.ts:110-114`