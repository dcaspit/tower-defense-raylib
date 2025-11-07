export const Ground = {
  Grass: 1,
  Road: 2,
  Water: 3,
  GrassTree: 4,
} as const;

export const main_map = [
  [Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Water, Ground.Grass, Ground.GrassTree, Ground.Grass],
  [Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Grass],
  [Ground.Road, Ground.Road, Ground.Grass, Ground.Grass, Ground.Road, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Road, Ground.Grass, Ground.Grass, Ground.Road, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Grass, Ground.GrassTree, Ground.GrassTree, Ground.Grass, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Grass, Ground.GrassTree, Ground.GrassTree, Ground.Grass, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Grass, Ground.GrassTree, Ground.GrassTree, Ground.Grass, Ground.Grass, Ground.Water, Ground.Grass, Ground.Road, Ground.Grass],
  [Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Road, Ground.Grass],
  [Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Grass, Ground.Water, Ground.Grass, Ground.Grass, Ground.Grass],
];
