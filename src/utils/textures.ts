import r from 'raylib';

export class Textures {
  static map = new Map<string, r.Texture>();

  static load() {
    this.map.set('projectile', r.LoadTexture('assets/projectile.png'));
  }

  static projectile(): r.Texture {
    const p = this.map.get('projectile');
    if (p) {
      return p;
    }

    throw new Error('projectile not loaded');
  }

}
