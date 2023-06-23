import Button from './Button.js';

export default class MenuItem {
  constructor(app, index) {
    this.app = app;
    this.index = index;
    this.name = `MenuItem_${index}`;
    this.interactive = true;
    this.buttonMode = true;
    this.active = false;
    this.zIndex = 10;
    this.container = new PIXI.Container();
    this.spritesContainer = new PIXI.Container();
    this.onButtonClick = () => null;
  }

  init() {
    const bg = this.app.spriteManager.createSprite(
      'iconMenu',
      `bg_${this.index}`
    );

    const bgActive = (window[`bgActive_${this.index}`] = this.app.spriteManager
      .createSprite('iconMenuActive', `bgActive_${this.index}`)
      .set({ alpha: 0 }));

    const btnOk = new Button(
      this.app.spriteManager.createSprite('btnOk', `btnOk_${this.index}`),
      { x: 0, y: 0 },
      () => this.onButtonClick()
    ).sprite.set({
      anchor: { x: 0.5, y: 0 },
      scale: { x: 0, y: 0 },
      alpha: 1,
      position: { x: bg.width / 2, y: bg.height - 20 },
    });

    btnOk.on('pointerdown', this.onButtonClick);

    const stairMenu = (window[`stairMenu_${this.index}`] =
      this.app.spriteManager.createSprite(`stairMenu0${this.index}`).set({
        anchor: 0.5,
        position: { x: bg.width / 2, y: bg.width / 2 - 5 },
        scale: 0.9,
      }));
    stairMenu.name = 'stairMenu';
    this.spritesContainer.addChild(bgActive, bg, stairMenu);

    this.container.x = 150 * this.index;
    this.container.y = -150;
    this.container.interactive = true;
    this.container.buttonMode = true;

    this.container.addChild(this.spritesContainer, btnOk);
  }

  setActive(index) {
    const { sprites } = this.app.spriteManager;
    gsap.to(sprites[`stairMenu0${index}`].scale, {
      x: 1,
      y: 1,
      duration: 0.2,
      ease: Power0.ease,
    });
    sprites[`bg_${index}`].set({ alpha: 0 });
    sprites[`bgActive_${index}`].set({ alpha: 1 });
    gsap.to(sprites[`btnOk_${index}`].scale, {
      x: 1,
      y: 1,
      duration: 0.5,
      ease: 'bounce.out',
    });

    this.spritesContainer.interactive = false;
    this.spritesContainer.buttonMode = false;
  }

  setInactive(index) {
    const { sprites } = this.app.spriteManager;

    gsap.to(sprites[`stairMenu0${index}`].scale, {
      x: 0.9,
      y: 0.9,
      duration: 0.3,
      ease: Power0.easeNone,
    });
    sprites[`bg_${index}`].set({ alpha: 1 });
    sprites[`bgActive_${index}`].set({ alpha: 0 });
    gsap.to(sprites[`btnOk_${index}`], {
      scale: { x: 0, y: 0 },
      ease: Power0.easeNone,
    });

    this.spritesContainer.interactive = true;
    this.spritesContainer.buttonMode = true;
  }

  ok() {
    console.log('isInnerOk');
  }
}
