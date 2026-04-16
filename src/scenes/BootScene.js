import GameState from '../systems/GameState.js';

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    GameState.init();
    this.scene.start('Preload');
  }
}
