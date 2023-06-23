import { CONST_HEIGHT, CONST_WIDTH, stairElements } from './static.js';

export default class Stair {
  constructor(app, index) {
    this.app = app;
    this.index = index;
    this.stair = null;
    this.railing = null;
    this.carpet = null;
  }

  create() {
    this.stair = this.app.spriteManager
      .createSprite(`stairNew0${this.index}`)
      .set({ anchor: 1, position: { x: CONST_WIDTH, y: CONST_HEIGHT / 2 } });
    this.railing = this.app.spriteManager
      .createSprite(`stairNew0${this.index}Railing`)
      .set({ anchor: 1, position: { x: CONST_WIDTH, y: CONST_HEIGHT / 2 } });
    this.carpet = this.app.spriteManager
      .createSprite(`stairNew0${this.index}Carpet`)
      .set({ anchor: 1, position: { x: CONST_WIDTH, y: CONST_HEIGHT / 2 } });

    this.stair.alpha = 0;
    this.railing.alpha = 0;
    this.carpet.alpha = 0;
    this.stair.y = -this.stair.height;

    this.app.appContainer.addChild(this.stair, this.railing, this.carpet);

    const delay = 0.3;

    stairElements.forEach((elem, index) => {
      gsap.to(this[elem], {
        alpha: 1,
        y: CONST_HEIGHT,
        duration: 0.5,
        delay: delay * index,
      });
    });
  }

  destroy() {
    const delay = 0.1;

    stairElements.forEach((elem, index) => {
      gsap.to(this[elem], {
        alpha: 0,
        y: CONST_HEIGHT + this[elem].height,
        duration: 0.5,
        delay: delay * index,
        onComplete:
          index + 1 === stairElements.length ? this[elem].remove : null,
      });
    });
  }

  remove() {
    console.log(this.app.appContainer);
    this.app.appContainer.removeChild(this.stair, this.railing, this.carpet);

    this.stair = null;
    this.railing = null;
    this.carpet = null;
  }
}
