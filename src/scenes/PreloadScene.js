export default class PreloadScene extends Phaser.Scene {
  constructor() { super('Preload'); }

  create() {
    this.add.text(240, 400, 'ARCANE ACADEMY', { font: '28px monospace', fill: '#ffd700' }).setOrigin(0.5);
    this.add.text(240, 450, 'Loading...', { font: '18px monospace', fill: '#aaaaaa' }).setOrigin(0.5);
    this.time.delayedCall(800, () => this.scene.start('MainHub'));
  }
}
