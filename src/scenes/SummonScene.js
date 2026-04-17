import GameState from '../systems/GameState.js';
import SummonManager from '../systems/SummonManager.js';
import CurrencyManager from '../systems/CurrencyManager.js';
import HERO_DEFINITIONS from '../data/heroDefinitions.js';
import { CURRENCY } from '../data/constants.js';

const RARITY_HEX = {
  COMMON: 0xaaaaaa, UNCOMMON: 0x66cc44, RARE: 0x4488ff,
  EPIC: 0xaa44ff, LEGENDARY: 0xffaa00, MYTHIC: 0xff44aa, ASCENDED: 0xff2200
};
const RARITY_STR = {
  COMMON: '#aaaaaa', UNCOMMON: '#66cc44', RARE: '#4488ff',
  EPIC: '#aa44ff', LEGENDARY: '#ffaa00', MYTHIC: '#ff44aa', ASCENDED: '#ff2200'
};

const BANNERS = {
  BASIC: {
    key: 'BASIC', label: 'BASIC SUMMON', unlockKey: 'BASIC_SUMMON',
    currency: CURRENCY.CRYSTALS, currencyLabel: 'Crystals',
    cost1: 100, cost10: 900, pityMax: 30,
    ratesHint: 'C 55%  UC 28%  R 14%  E 3%   pity @30'
  },
  ADVANCED: {
    key: 'ADVANCED', label: 'ADVANCED SUMMON', unlockKey: 'ADVANCED_SUMMON',
    currency: CURRENCY.PREMIUM_CRYSTALS, currencyLabel: 'Prem.Crystals',
    cost1: 300, cost10: 2700, pityMax: 80,
    ratesHint: 'R 50%  E 35%  L 14%   pity @80'
  }
};

export default class SummonScene extends Phaser.Scene {
  constructor() { super('Summon'); }

  create() {
    this._root         = this.add.container(0, 0);
    this._activeBanner = 'BASIC';
    this._showMain();
  }

  _reset() { this._root.removeAll(true); }

  // ─── MAIN VIEW ───────────────────────────────────────────────────────────────

  _showMain() {
    this._reset();
    const c = this._root, W = 480;
    c.add(this.add.rectangle(W / 2, 427, W, 854, 0x0a0a1a));
    c.add(this.add.text(W / 2, 40, 'SUMMON',
      { font: '24px monospace', fill: '#ffd700' }).setOrigin(0.5));
    c.add(this.add.text(30, 40, '< BACK',
      { font: '14px monospace', fill: '#aaaaaa' })
      .setOrigin(0, 0.5).setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start('MainHub')));

    // Banner tabs
    ['BASIC', 'ADVANCED'].forEach((key, i) => {
      const bn      = BANNERS[key];
      const active  = this._activeBanner === key;
      const enabled = GameState.isUnlocked(bn.unlockKey);
      const alpha   = enabled ? 1 : 0.38;
      const bg      = this.add.rectangle(120 + i * 240, 90, 210, 44,
        active ? 0x2a1055 : 0x101025)
        .setStrokeStyle(1, active ? 0x8844ff : 0x333355)
        .setAlpha(alpha);
      c.add(bg);
      c.add(this.add.text(120 + i * 240, 90, bn.label,
        { font: '12px monospace', fill: active ? '#cc88ff' : '#555577' })
        .setOrigin(0.5).setAlpha(alpha));
      if (enabled) {
        bg.setInteractive({ useHandCursor: true })
          .on('pointerup', () => { this._activeBanner = key; this._showMain(); });
      }
    });

    const bn       = BANNERS[this._activeBanner];
    const unlocked = GameState.isUnlocked(bn.unlockKey);

    if (!unlocked) {
      const msg = this._activeBanner === 'BASIC'
        ? 'Clear Stage 1-5 to unlock Basic Summon.'
        : 'Clear Campaign Region 3\nto unlock Advanced Summon.';
      c.add(this.add.text(W / 2, 420, msg,
        { font: '16px monospace', fill: '#555577', align: 'center' }).setOrigin(0.5));
      return;
    }

    const balance = CurrencyManager.get(bn.currency);
    const pity    = SummonManager.pityCounters[this._activeBanner];

    // Currency & pity bar
    c.add(this.add.rectangle(W / 2, 148, 438, 40, 0x111130).setStrokeStyle(1, 0x2a2a55));
    c.add(this.add.text(50, 148, `${bn.currencyLabel}: ${balance}`,
      { font: '14px monospace', fill: '#aaddff' }).setOrigin(0, 0.5));
    c.add(this.add.text(W - 50, 148, `Pity ${pity}/${bn.pityMax}`,
      { font: '12px monospace', fill: '#776699' }).setOrigin(1, 0.5));

    // Wishlist
    c.add(this.add.text(W / 2, 202,
      'WISHLIST  (70% when rarity matches)',
      { font: '11px monospace', fill: '#555577' }).setOrigin(0.5));
    this._drawWishlist(c, W);

    // Pull buttons
    this._drawPullBtns(c, W, bn, balance);

    // Rates
    c.add(this.add.text(W / 2, 726, bn.ratesHint,
      { font: '10px monospace', fill: '#333355' }).setOrigin(0.5));
  }

  _drawWishlist(c, W) {
    const wl     = [...SummonManager.wishlist];
    const slotW  = 140;
    const startX = (W - slotW * 3) / 2 + slotW / 2;

    for (let i = 0; i < 3; i++) {
      const x   = startX + i * slotW;
      const id  = wl[i] || null;
      const def = id ? HERO_DEFINITIONS.find(d => d.id === id) : null;
      const bg  = this.add.rectangle(x, 250, slotW - 8, 66,
        def ? 0x1a1044 : 0x0d0d1e)
        .setStrokeStyle(1, def ? RARITY_HEX[def.rarity] : 0x222244);
      c.add(bg);
      if (def) {
        c.add(this.add.text(x, 234, def.name,
          { font: '12px monospace', fill: '#ffffff' }).setOrigin(0.5));
        c.add(this.add.text(x, 252, def.rarity,
          { font: '9px monospace', fill: RARITY_STR[def.rarity] }).setOrigin(0.5));
        c.add(this.add.text(x, 270, '✕ REMOVE',
          { font: '9px monospace', fill: '#cc4444' }).setOrigin(0.5));
        bg.setInteractive({ useHandCursor: true })
          .on('pointerup', () => {
            SummonManager.wishlist.delete(id); GameState.save(); this._showMain();
          });
      } else {
        c.add(this.add.text(x, 250, '+ ADD',
          { font: '12px monospace', fill: '#444488' }).setOrigin(0.5));
        bg.setInteractive({ useHandCursor: true })
          .on('pointerup', () => this._showWishlistPicker());
      }
    }
  }

  _drawPullBtns(c, W, bn, balance) {
    [{ count: 1, cost: bn.cost1, y: 366 }, { count: 10, cost: bn.cost10, y: 452 }]
    .forEach(({ count, cost, y }) => {
      const can = balance >= cost;
      const bg  = this.add.rectangle(W / 2, y, 340, 64,
        can ? 0x1a083a : 0x0d0d1e).setStrokeStyle(1, can ? 0x7744cc : 0x1e1e33);
      c.add(bg);
      c.add(this.add.text(W / 2, y - 12, `${count}× PULL`,
        { font: '20px monospace', fill: can ? '#cc88ff' : '#333344' }).setOrigin(0.5));
      c.add(this.add.text(W / 2, y + 14, `${cost} ${bn.currencyLabel}`,
        { font: '12px monospace', fill: can ? '#8855bb' : '#2a2a3a' }).setOrigin(0.5));
      if (can) {
        bg.setInteractive({ useHandCursor: true })
          .on('pointerdown', () => bg.setFillStyle(0x0a0420))
          .on('pointerout',  () => bg.setFillStyle(0x1a083a))
          .on('pointerup',   () => this._doPull(bn, count));
      }
    });
  }

  // ─── WISHLIST PICKER ─────────────────────────────────────────────────────────

  _showWishlistPicker() {
    this._reset();
    const c = this._root, W = 480;
    c.add(this.add.rectangle(W / 2, 427, W, 854, 0x0a0a1a));
    c.add(this.add.text(W / 2, 40, 'ADD TO WISHLIST',
      { font: '18px monospace', fill: '#ffd700' }).setOrigin(0.5));
    c.add(this.add.text(30, 40, '< BACK',
      { font: '14px monospace', fill: '#aaaaaa' })
      .setOrigin(0, 0.5).setInteractive({ useHandCursor: true })
      .on('pointerup', () => this._showMain()));

    if (SummonManager.wishlist.size >= SummonManager.wishlistMaxSize) {
      c.add(this.add.text(W / 2, 420,
        'Wishlist full (3/3).\nRemove a hero first.',
        { font: '15px monospace', fill: '#555577', align: 'center' }).setOrigin(0.5));
      return;
    }

    const eligible = HERO_DEFINITIONS.filter(d => !SummonManager.wishlist.has(d.id));
    eligible.forEach((def, i) => {
      const y       = 108 + i * 74;
      const bgColor = 0x111128;
      const bg      = this.add.rectangle(W / 2, y, 436, 62, bgColor)
        .setStrokeStyle(1, RARITY_HEX[def.rarity] || 0x333355)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => bg.setFillStyle(0x07071a))
        .on('pointerout',  () => bg.setFillStyle(bgColor))
        .on('pointerup',   () => {
          SummonManager.wishlist.add(def.id); GameState.save(); this._showMain();
        });
      c.add(bg);
      c.add(this.add.text(48, y - 12,
        `${def.name}${def.title ? '  ' + def.title : ''}`,
        { font: '14px monospace', fill: '#ffffff' }).setOrigin(0, 0.5));
      c.add(this.add.text(48, y + 12,
        `${def.heroClass}  ${def.affinity}`,
        { font: '11px monospace', fill: '#aaaaaa' }).setOrigin(0, 0.5));
      c.add(this.add.text(W - 40, y, def.rarity,
        { font: '11px monospace', fill: RARITY_STR[def.rarity] }).setOrigin(1, 0.5));
    });
  }

  // ─── PULL LOGIC ──────────────────────────────────────────────────────────────

  _doPull(bn, count) {
    const cost = count === 1 ? bn.cost1 : bn.cost10;
    if (!CurrencyManager.spend(bn.currency, cost)) return;
    const results = count === 1
      ? [SummonManager.pull(bn.key, HERO_DEFINITIONS)].filter(Boolean)
      : SummonManager.pullMulti(bn.key, HERO_DEFINITIONS, count);
    results.forEach(r => SummonManager.handleResult(r));
    GameState.save();
    this._showPullResult(results);
  }

  // ─── PULL RESULTS ────────────────────────────────────────────────────────────

  _showPullResult(results) {
    this._reset();
    const c = this._root, W = 480;
    c.add(this.add.rectangle(W / 2, 427, W, 854, 0x060610));
    c.add(this.add.text(W / 2, 42, 'RESULTS',
      { font: '22px monospace', fill: '#ffd700' }).setOrigin(0.5));

    const cols   = Math.min(results.length, 5);
    const rows   = Math.ceil(results.length / cols);
    const cardW  = results.length > 5 ? 88 : 100;
    const startX = (W - cardW * cols) / 2 + cardW / 2;
    const startY = rows > 1 ? 195 : 320;

    results.forEach((r, i) => {
      const x     = startX + (i % cols) * cardW;
      const y     = startY + Math.floor(i / cols) * 165;
      const color = RARITY_HEX[r.rarity] || 0x555566;
      const name  = (r.def?.name || '???').slice(0, results.length > 5 ? 5 : 7);

      c.add(this.add.rectangle(x, y, cardW - 6, 134, 0x0d0d22).setStrokeStyle(2, color));
      c.add(this.add.rectangle(x, y - 54, cardW - 6, 8, color)); // rarity strip
      c.add(this.add.text(x, y - 32, name,
        { font: '12px monospace', fill: '#ffffff' }).setOrigin(0.5));
      c.add(this.add.text(x, y - 10, r.rarity.slice(0, 4),
        { font: '10px monospace', fill: RARITY_STR[r.rarity] }).setOrigin(0.5));

      if (r.isNew) {
        c.add(this.add.rectangle(x, y + 26, cardW - 14, 28, 0x0f2e0f).setStrokeStyle(1, 0x44ff44));
        c.add(this.add.text(x, y + 26, '★ NEW',
          { font: '11px monospace', fill: '#66ff66' }).setOrigin(0.5));
      } else {
        c.add(this.add.rectangle(x, y + 26, cardW - 14, 28, 0x2a1a06).setStrokeStyle(1, 0xaa6622));
        c.add(this.add.text(x, y + 26, 'SHARDS',
          { font: '11px monospace', fill: '#cc8833' }).setOrigin(0.5));
      }
      c.add(this.add.text(x, y + 52, r.affinity || '',
        { font: '9px monospace', fill: '#666666' }).setOrigin(0.5));
    });

    const btnY = rows > 1 ? 756 : 630;
    const done = this.add.rectangle(W / 2, btnY, 260, 58, 0x1a083a)
      .setStrokeStyle(2, 0x7744cc).setInteractive({ useHandCursor: true })
      .on('pointerup', () => this._showMain());
    c.add(done);
    c.add(this.add.text(W / 2, btnY, 'SUMMON AGAIN',
      { font: '17px monospace', fill: '#cc88ff' }).setOrigin(0.5));
  }
}
