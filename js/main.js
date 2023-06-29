import MenuItem from './components/MenuItem.js';
import Stair from './components/Stair.js';
import SpriteManager from './components/spriteManager.js';
import {
  CONST_HEIGHT,
  CONST_WIDTH,
  appFinish,
  initSpritesToShow,
  spritesToBulkCreate,
  stageItems,
} from './components/static.js';

class GameApp {
  constructor() {
    this.app = new PIXI.Application({
      width: CONST_WIDTH,
      height: CONST_HEIGHT,
      backgroundColor: 0xffffff,
    });

    this.appContainer = new PIXI.Container();
    this.appContainer.sortableChildren = true;

    document.querySelector('#app').appendChild(this.app.view);

    this.width = this.app.view.width;
    this.height = this.app.view.height;

    this.spriteManager = new SpriteManager(this);
    this.soundManager = new SoundManager();

    this.init();
  }

  init() {
    PIXI.loader.add('./assets/atlas.json').load(() => {
      this.spriteManager.loadTextures();
      this.createBackground();
      this.createSprites();
      this.spriteManager.showSprites(initSpritesToShow);

      iconHammer.on('pointerdown', () => {
        gsap
          .to(iconHammer, {
            alpha: 0,
            duration: 0.5,
            ease: Back.easeOut,
          })
          .then(() => {
            app.appContainer.removeChild(iconHammer);
            app.createMenu();
          });
      });
    });
  }

  createSprites() {
    const plant1 = this.spriteManager
      .createSprite('plant', 'plant1')
      .set(stageItems['plant1']);
    const plant2 = this.spriteManager
      .createSprite('plant', 'plant2')
      .set(stageItems['plant2']);

    const btnContinue = this.spriteManager.createSprite('btnContinue');

    btnContinue.interactive = true;
    btnContinue.buttonMode = true;

    btnContinue
      .set({
        ...stageItems['btnContinue'],
        position: {
          x: btnContinue.width / 2 + 502,
          y: CONST_HEIGHT - btnContinue.height / 2 - 87,
        },
      })
      .on('pointerdown', () => {
        window.location.href = 'http://playrix.com/';
      });

    gsap.fromTo(
      btnContinue.scale,
      { x: 0.9, y: 0.9 },
      {
        x: 1,
        y: 1,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      }
    ),
      app.appContainer.addChild(plant1, plant2, btnContinue);

    spritesToBulkCreate.forEach((sprite) => {
      const item = (window[sprite] =
        this.spriteManager.createSprite(sprite)).set(stageItems[sprite]);
      this.appContainer.addChild(item);
    });

    this.spriteManager.sprites['plantBasket'].zIndex = 10;

    iconHammer.interactive = true;
    iconHammer.buttonMode = true;
  }

  createBackground() {
    if (!this.spriteManager.isLoaded()) {
      throw new Error('Текстуры еще не загружены');
    }

    const bgMain = this.spriteManager.createSprite('bgMain');
    this.app.stage.addChild(bgMain, this.appContainer);
  }

  createMenu() {
    const menuContainer = new PIXI.Container();
    menuContainer.x = 641;
    menuContainer.zIndex = 1;
    const menuItems = [];
    this.menuItems = menuItems;
    let activeStair = null;

    for (let i = 0; i < 3; i++) {
      const menuItem = new MenuItem(this, i + 1);
      menuItem.init();
      menuItem.onButtonClick = this.finish;
      menuItems.push(menuItem);
      menuContainer.addChild(menuItem.container);
    }

    menuItems.forEach((menuItem) => {
      menuItem.container.on('pointerdown', (e) => {
        if (!menuItem.active) {
          const stairOld = this.spriteManager.sprites['stairOld'];
          if (stairOld) {
            gsap.to(stairOld, {
              alpha: 0,
              y: CONST_HEIGHT + stairOld.height,
              duration: 0.5,
            });
          }

          menuItems.forEach((item) => {
            if (item === menuItem) {
              item.setActive(item.index);
              menuItem.active = true;
              if (activeStair) {
                activeStair.destroy();
              }
              activeStair = new Stair(this, item.index);
              activeStair.create();
            } else {
              item.setInactive(item.index);
              item.active = false;
            }
          });
        }
      });
    });

    app.appContainer.addChild(menuContainer);

    for (let i = 0; i < 3; i++) {
      gsap.to(menuItems[i].container, {
        y: 10,
        delay: i * 0.1,
        duration: 1.2,
        ease: 'bounce.out',
      });
    }
  }

  finish() {
    this.app.menuItems.forEach((menuItem) => {
      menuItem.container.on('pointerdown', () => null);
    });

    const overlay = new PIXI.Graphics();
    overlay.alpha = 0.6;
    overlay.beginFill(0x000000, 0.6);
    overlay.drawRect(0, 0, CONST_WIDTH, CONST_HEIGHT);
    overlay.alpha = 0;
    overlay.zIndex = 10;
    overlay.interactive = true;
    overlay.name = 'overlay';

    const finalPopup = this.app.spriteManager.createSprite('finalPopup');

    finalPopup.interactive = true;
    finalPopup.buttonMode = true;

    finalPopup.set(stageItems['finalPopup']).on('pointerdown', () => {
      window.location.href = 'https://playrix.com/';
    });

    this.app.appContainer.addChild(overlay, finalPopup);

    const delay = 0.1;
    appFinish.map((item, index) => {
      const sprite = this.app.appContainer.getChildByName(item);
      gsap.to(sprite, {
        alpha: 1,
        duration: 0.5,
        zIndex: 10 + index,
        delay: delay * index,
      });
    });
  }
}

class SoundManager {
  // Реализация класса для управления звуковыми эффектами
}

const app = new GameApp();
