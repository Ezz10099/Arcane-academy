import GameState from '../systems/GameState.js';
import CurrencyManager from '../systems/CurrencyManager.js';

export default class MainHubScene extends Phaser.Scene {
  constructor() { super('MainHub'); }

  create() {
    this.add.rectangle(240, 427, 480, 854, 0x0a0a1a);
    this.add.text(240, 60, 'ARCANE ACADEMY', { font: '26px monospace', fill: '#ffd700' }).setOrigin(0.5);

    this._goldText    = this.add.text(20, 100, 'Gold: 0',     { font: '16px monospace', fill: '#ffffff' });
    this._crystalText = this.add.text(20, 125, 'Crystals: 0', { font: '16px monospace', fill: '#aaddff' });

    this.add.text(240, 300, 'Systems initialised.\nMore scenes coming soon.', {
      font: '18px monospace', fill: '#888888', align: 'center'
    }).setOrigin(0.5);

    this.time.addEvent({ delay: 1000, loop: true, callback: this._updateCurrencies, callbackScope: this });
    this._updateCurrencies();
  }

  _updateCurrencies() {
    this._goldText.setText('Gold: ' + CurrencyManager.get('GOLD'));
    this._crystalText.setText('Crystals: ' + CurrencyManager.get('CRYSTALS'));
  }
}
