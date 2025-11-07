import r from 'raylib';

export const TexturesTypes = {
  projectile: 'projectile',
  enemy: 'enemy',
  tower: 'tower',
  slime: 'slime',
  grass: 'grass'
} as const;

export class Textures {
  static map = new Map<string, r.Texture>();

  static load() {
    this.map.set(TexturesTypes.projectile, r.LoadTexture('assets/projectile.png'));
    this.map.set(TexturesTypes.enemy, r.LoadTexture('assets/enemy.png'));
    this.map.set(TexturesTypes.tower, r.LoadTexture('assets/tower.png'));
    this.map.set(TexturesTypes.slime, r.LoadTexture('assets/MiniWorldSprites/Characters/Monsters/Slimes/Slime.png'));
    this.map.set(TexturesTypes.grass, r.LoadTexture('assets/MiniWorldSprites/Grounds/TexturedGrass.png'));

  }

  static asset(name: string): r.Texture {
    const p = this.map.get(name);
    if (p) {
      return p;
    }

    throw new Error(`${name}, failed to load`);
  }

}
