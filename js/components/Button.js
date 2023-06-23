export default class Button {
  constructor(sprite, position, onClick) {
    this.sprite = sprite;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
    position ? this.sprite.position.set(position.x, position.y) : null;
    this.sprite.on('pointerdown', onClick);
  }

  setEnabled(enabled) {
    this.sprite.interactive = enabled;
    this.sprite.alpha = enabled ? 1 : 0;
  }
}
