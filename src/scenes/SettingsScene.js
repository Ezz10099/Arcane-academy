import { ARCANE_THEME, addArcaneBackdrop, createPanel, createArcaneButton } from '../ui/ArcaneUI.js';

export default class SettingsScene extends Phaser.Scene {
  constructor() { super('Settings'); }

  create() {
    const W = 480;
    const H = 854;

    addArcaneBackdrop(this, W, H);

    createPanel(this, { x: W / 2, y: 44, width: W - 14, height: 88, fill: 0x120d24, withInner: false });
    this.add.text(W / 2, 44, '⚙ SETTINGS', {
      font: '24px monospace',
      fill: ARCANE_THEME.colors.textPrimary
    }).setOrigin(0.5);

    createArcaneButton(this, {
      x: 58,
      y: 44,
      width: 96,
      height: 36,
      label: 'BACK',
      font: '13px monospace',
      onClick: () => this.scene.start('MainHub')
    });

    createPanel(this, { x: W / 2, y: 250, width: 420, height: 220, title: 'CONFIGURATION' });
    this.add.text(W / 2, 260,
      'MainHub navigation now points to a\nregistered Phaser scene.\n\nUse this screen for future toggles\n(audio, notifications, accessibility, etc.).',
      {
        font: '13px monospace',
        fill: ARCANE_THEME.colors.textSecondary,
        align: 'center'
      }
    ).setOrigin(0.5);
  }
}
