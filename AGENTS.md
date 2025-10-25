# AGENTS.md - Tower Defense Raylib Project

## Build & Run Commands
- `npm run game` - Compile TypeScript and run the game (use for testing changes)
- `tsc` - Compile TypeScript to dist/ directory
- `npm run build` - Build with webpack
- `npm run web` - Run webpack dev server and open in browser
- No test framework configured (tests not available)
- No linting/formatting tools configured

## Code Style Guidelines

**Imports**: Use `import r from 'raylib'` for Raylib, relative imports for local modules (e.g., `import Enemy from '../enemies/enemy'`)

**Types**: TypeScript strict mode enabled. Use explicit types for class properties (e.g., `pos: r.Vector2 = { x: 0, y: 0 }`). Use Raylib types (r.Vector2, r.Color, r.Texture) consistently.

**Naming**: camelCase for variables/methods, PascalCase for classes, lowercase for file names (e.g., `enemy.ts`, `waveManager.ts`)

**Classes**: Prefer class-based architecture with default exports for main components (e.g., `export default class Enemy`)

**Error Handling**: Minimal error handling currently; use console.log for debugging, check bounds before array access

**Constants**: Define at top of file (e.g., `export const boxWidth = 50`) or in dedicated utils/consts.ts file

**Game Loop Pattern**: Separate update() and draw() phases; use BeginDrawing/EndDrawing pattern from Raylib; target 60 FPS with frame-based timing

**Comments**: Avoid comments unless documenting complex algorithms or TODOs
