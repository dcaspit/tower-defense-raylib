import r from 'raylib';

export const TexturesTypes = {
  projectile: 'projectile',
  enemy: 'enemy'
} as const;

export class Textures {
  static map = new Map<string, r.Texture>();

  static load() {
    this.map.set(TexturesTypes.projectile, r.LoadTexture('assets/projectile.png'));
    this.map.set(TexturesTypes.enemy, r.LoadTexture('assets/enemy.png'));
  }

  static asset(name: string): r.Texture {
    const p = this.map.get(name);
    if (p) {
      return p;
    }

    throw new Error(`${name}, failed to load`);
  }

}
