import BootScene from './src/scenes/BootScene.js';
import PreloadScene from './src/scenes/PreloadScene.js';
import MainHubScene from './src/scenes/MainHubScene.js';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 480,
  height: 854,
  backgroundColor: '#0a0a1a',
  parent: 'game-container',
  scene: [BootScene, PreloadScene, MainHubScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.PORTRAIT
  }
});
