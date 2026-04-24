export default class SettingsScene extends Phaser.Scene {
  constructor() { super('Settings'); }

  create() {
    const W = 480, H = 854;
    this.add.rectangle(W / 2, H / 2, W, H, 0x0a0a1a);
    this.add.text(W / 2, 70, 'SETTINGS', { font: '24px monospace', fill: '#ffd700' }).setOrigin(0.5);
    this.add.text(30, 40, '< BACK', { font: '14px monospace', fill: '#aaaaaa' })
      .setOrigin(0, 0.5).setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start('MainHub'));

    this.add.text(W / 2, 180, 'Audio, controls, and language settings\ncan be expanded here.',
      { font: '12px monospace', fill: '#8888aa', align: 'center' }).setOrigin(0.5);
  }
}
