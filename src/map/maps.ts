const Grounds = {
  Grass: 1,
  Road: 2,
  Water: 3,
  GrassTree: 4,
} as const;

export const main_map = [
  [Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.GrassTree, Grounds.Grass],
  [Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Grass],
  [Grounds.Road, Grounds.Road, Grounds.Grass, Grounds.Grass, Grounds.Road, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Road, Grounds.Grass, Grounds.Grass, Grounds.Road, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Grass, Grounds.GrassTree, Grounds.GrassTree, Grounds.Grass, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Grass, Grounds.GrassTree, Grounds.GrassTree, Grounds.Grass, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Grass, Grounds.GrassTree, Grounds.GrassTree, Grounds.Grass, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Road, Grounds.Grass],
  [Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Road, Grounds.Grass],
  [Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Grass, Grounds.Water, Grounds.Grass, Grounds.Grass, Grounds.Grass],
];
