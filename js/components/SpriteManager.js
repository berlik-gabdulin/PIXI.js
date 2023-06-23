export default class SpriteManager {
  constructor(app) {
    this.app = app;
    this.textures = {};
    this.sprites = {};
    this.loaded = false;
  }

  addTexture(name, path) {
    this.textures[name] = path;
  }

  loadTextures() {
    const atlasData = PIXI.loader.resources['assets/atlas.json'].textures;

    for (const name in atlasData) {
      const texture = atlasData[name];
      this.textures[name] = texture;
    }

    this.loaded = true;
  }

  createSprite(texture, name = texture) {
    if (!this.loaded) {
      throw new Error('Текстуры еще не загружены');
    }

    if (!this.textures[texture]) {
      throw new Error(`Спрайт с именем '${texture}' не найден`);
    }

    const sprite = new PIXI.Sprite(this.textures[texture]);
    sprite.name = name;

    this.sprites[name] = sprite;

    sprite.set = (settings) => {
      if (settings.position) {
        const { x, y } = settings.position;
        this.setPosition(name, x, y);
      }

      if (settings.scale) {
        if (settings.scale.x) {
          const { x, y } = settings.scale;
          this.setScale(name, x, y);
        } else {
          this.setScale(name, settings.scale, settings.scale);
        }
      }

      if (settings.alpha !== undefined) {
        this.setAlpha(name, settings.alpha);
      }

      if (settings.anchor) {
        this.setAnchor(name, settings.anchor);
      }

      return sprite;
    };

    return sprite;
  }

  setPosition(name, x, y) {
    this.sprites[name].x = x;
    this.sprites[name].y = y;
    return this;
  }

  setScale(name, x, y) {
    this.sprites[name].scale.set(x, y);
    return this;
  }

  setAlpha(name, alpha) {
    this.sprites[name].alpha = alpha;
    return this;
  }

  setZIndex(name, zIndex) {
    this.sprites[name].zIndex = zIndex;
    return this;
  }

  setAnchor(name, anchor) {
    if (typeof anchor === 'object') {
      this.sprites[name].anchor.set(anchor.x, anchor.y);
    } else if (typeof anchor === 'number') {
      this.sprites[name].anchor.set(anchor);
    }
    return this;
  }

  set(name, settings) {
    if (settings.position) {
      const { x, y } = settings.position;
      this.setPosition(name, x, y);
    }

    if (settings.scale) {
      if (settings.scale.x) {
        const { x, y } = settings.scale;
        this.setScale(name, x, y);
      } else {
        this.setScale(name, settings.scale, settings.scale);
      }
    }

    if (settings.alpha !== undefined) {
      this.setAlpha(name, settings.alpha);
    }

    if (settings.zIndex !== undefined) {
      this.setZIndex(name, settings.zIndex);
    }

    if (settings.anchor) {
      if (settings.anchor.x) {
        this.setAnchor(name, { x: settings.anchor.x, y: settings.anchor.y });
      } else {
        this.setAnchor(name, { x: settings.anchor, y: settings.anchor });
      }
    }
  }

  showSprites(sprites) {
    let delay = 500;
    const interval = 100;
    const manager = this;

    const initialFadeIn = () =>
      new Promise((resolve, reject) => {
        sprites.map((sprite) => {
          const item = manager.app.spriteManager.sprites[sprite];
          setTimeout(() => {
            gsap.to(item, {
              alpha: 1,
              y: item.y + 5,
              duration: 0.3,
            });
          }, delay);
          delay += interval;
        });
        setTimeout(resolve, delay);
      });

    initialFadeIn().then(() =>
      setTimeout(() => {
        gsap.to(iconHammer, {
          scale: 1,
          alpha: 1,
          duration: 0.3,
          ease: Elastic.easeOut,
          onComplete: () =>
            gsap.fromTo(
              iconHammer.scale,
              { x: 1, y: 1 },
              {
                x: 1.1,
                y: 1.1,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
              }
            ),
        });
      }, 1800)
    );
  }

  isLoaded() {
    return this.loaded;
  }
}
