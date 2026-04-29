const FALLBACK_SIZE = 96;

function applyImageOptions(image, options = {}) {
  const {
    scale,
    displayWidth,
    displayHeight,
    depth,
    alpha,
    onClick
  } = options;

  if (typeof scale === 'number') image.setScale(scale);
  if (typeof displayWidth === 'number') image.displayWidth = displayWidth;
  if (typeof displayHeight === 'number') image.displayHeight = displayHeight;
  if (typeof depth === 'number') image.setDepth(depth);
  if (typeof alpha === 'number') image.setAlpha(alpha);

  if (typeof onClick === 'function') {
    image.setInteractive({ useHandCursor: true });
    image.on('pointerup', () => onClick(image));
  }

  return image;
}

function createFallback(scene, x, y, label, options = {}) {
  const width = options.displayWidth || FALLBACK_SIZE;
  const height = options.displayHeight || FALLBACK_SIZE;
  const container = scene.add.container(x, y);

  const rect = scene.add.rectangle(0, 0, width, height, 0x3f3f46, 0.8)
    .setStrokeStyle(2, 0xffffff, 0.8);
  const text = scene.add.text(0, 0, label || 'Missing Asset', {
    font: '12px monospace',
    color: '#ffffff',
    align: 'center',
    wordWrap: { width: Math.max(40, width - 10) }
  }).setOrigin(0.5);

  container.add([rect, text]);

  if (typeof options.scale === 'number') container.setScale(options.scale);
  if (typeof options.depth === 'number') container.setDepth(options.depth);
  if (typeof options.alpha === 'number') container.setAlpha(options.alpha);

  if (typeof options.onClick === 'function') {
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerup', () => options.onClick(container));
  }

  return container;
}

export function addAssetImage(scene, x, y, key, options = {}) {
  if (scene?.textures?.exists(key)) {
    const image = scene.add.image(x, y, key);
    return applyImageOptions(image, options);
  }

  return createFallback(scene, x, y, key, options);
}

export function addFullscreenBackground(scene, key, options = {}) {
  const centerX = scene.scale.width * 0.5;
  const centerY = scene.scale.height * 0.5;

  return addAssetImage(scene, centerX, centerY, key, {
    displayWidth: scene.scale.width,
    displayHeight: scene.scale.height,
    ...options
  });
}

export function addUIButton(scene, x, y, key, options = {}) {
  return addAssetImage(scene, x, y, key, options);
}

export function addPanelImage(scene, x, y, key, options = {}) {
  return addAssetImage(scene, x, y, key, options);
}

export function addIconImage(scene, x, y, key, options = {}) {
  return addAssetImage(scene, x, y, key, options);
}
