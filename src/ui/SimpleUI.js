export const SIMPLE_UI = {
  W: 480,
  H: 854,
  bg: 0x080812,
  panel: 0x11111f,
  panelSoft: 0x17172a,
  border: 0x3a3a55,
  borderActive: 0xffd36a,
  text: '#ffffff',
  muted: '#9999aa',
  gold: '#ffd36a',
  good: '#66ff99',
  danger: '#ff7777'
};

export function clearScene(scene, root = null) {
  if (root?.removeAll) root.removeAll(true);
}

export function addScreenBg(scene, root, color = SIMPLE_UI.bg) {
  const bg = scene.add.rectangle(SIMPLE_UI.W / 2, SIMPLE_UI.H / 2, SIMPLE_UI.W, SIMPLE_UI.H, color);
  root?.add?.(bg);
  return bg;
}

export function addHeader(scene, root, title, backAction, rightText = null, rightAction = null) {
  const bg = scene.add.rectangle(240, 42, 480, 84, SIMPLE_UI.panel).setStrokeStyle(1, SIMPLE_UI.border);
  const titleText = scene.add.text(240, 32, title, { font: '22px monospace', fill: SIMPLE_UI.gold }).setOrigin(0.5);
  const back = scene.add.text(20, 32, '< BACK', { font: '14px monospace', fill: SIMPLE_UI.muted })
    .setOrigin(0, 0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerup', backAction || (() => scene.scene.start('MainHub')));
  root?.add?.([bg, titleText, back]);
  if (rightText) {
    const right = scene.add.text(460, 32, rightText, { font: '12px monospace', fill: SIMPLE_UI.gold })
      .setOrigin(1, 0.5)
      .setInteractive({ useHandCursor: true });
    if (rightAction) right.on('pointerup', rightAction);
    root?.add?.(right);
    return { bg, titleText, back, right };
  }
  return { bg, titleText, back };
}

export function addFooter(scene, root) {
  const footer = scene.add.rectangle(240, 812, 480, 84, SIMPLE_UI.panel).setStrokeStyle(1, SIMPLE_UI.border);
  root?.add?.(footer);
  return footer;
}

export function addPanel(scene, root, x, y, w, h, fill = SIMPLE_UI.panelSoft) {
  const panel = scene.add.rectangle(x, y, w, h, fill, 0.96).setStrokeStyle(1, SIMPLE_UI.border);
  root?.add?.(panel);
  return panel;
}

export function addButton(scene, root, x, y, w, h, label, onClick, enabled = true) {
  const btn = scene.add.rectangle(x, y, w, h, enabled ? 0x1c1c32 : 0x101016, 1)
    .setStrokeStyle(1, enabled ? SIMPLE_UI.borderActive : SIMPLE_UI.border);
  const txt = scene.add.text(x, y, label, { font: '13px monospace', fill: enabled ? SIMPLE_UI.text : '#666677' }).setOrigin(0.5);
  if (enabled) {
    btn.setInteractive({ useHandCursor: true }).on('pointerup', onClick);
  }
  root?.add?.([btn, txt]);
  return { btn, txt };
}

export function addLabel(scene, root, x, y, text, size = 12, fill = SIMPLE_UI.text, origin = 0.5) {
  const label = scene.add.text(x, y, text, { font: `${size}px monospace`, fill }).setOrigin(origin);
  root?.add?.(label);
  return label;
}
