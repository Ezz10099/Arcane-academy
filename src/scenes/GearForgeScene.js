import GameState from '../systems/GameState.js';
import GearManager from '../systems/GearManager.js';
import HeroManager from '../systems/HeroManager.js';
import CurrencyManager from '../systems/CurrencyManager.js';
import { RARITY_ORDER, CURRENCY } from '../data/constants.js';

const SLOT_ORDER = ['WEAPON', 'ROBE', 'ACCESSORY', 'RELIC', 'SIGIL'];
const SLOT_SHORT = { WEAPON: 'WPN', ROBE: 'ROBE', ACCESSORY: 'ACC', RELIC: 'REL', SIGIL: 'SIG' };
const RARITY_COLOR = {
  COMMON: '#aaaaaa', UNCOMMON: '#66cc44', RARE: '#4488ff',
  EPIC: '#aa44ff', LEGENDARY: '#ffaa00', MYTHIC: '#ff44aa', ASCENDED: '#ff2200'
};

export default class GearForgeScene extends Phaser.Scene {
  constructor() {
    super('GearForge');
    this._heroIndex = 0;
    this._slotFilter = 'ALL';
    this._selectedGearId = null;
    this._page = 0;
    this._msg = '';
  }

  create() {
    this._root = this.add.container(0, 0);
    this._render();
  }

  _heroes() { return HeroManager.getAllHeroes(); }

  _selectedHero() {
    const heroes = this._heroes();
    if (!heroes.length) return null;
    this._heroIndex = Phaser.Math.Wrap(this._heroIndex, 0, heroes.length);
    return heroes[this._heroIndex];
  }

  _inventory() {
    const byRarity = g => RARITY_ORDER[g.rarity] || 0;
    return GearManager.getAllGear()
      .filter(g => this._slotFilter === 'ALL' || g.slot === this._slotFilter)
      .sort((a, b) => {
        if (!!a.equippedTo !== !!b.equippedTo) return a.equippedTo ? 1 : -1;
        if (byRarity(a) !== byRarity(b)) return byRarity(b) - byRarity(a);
        return b.level - a.level;
      });
  }

  _render() {
    const W = 480;
    const H = 854;
    const c = this._root;
    c.removeAll(true);

    const hero = this._selectedHero();
    const inv = this._inventory();
    const perPage = 5;
    const maxPage = Math.max(0, Math.ceil(inv.length / perPage) - 1);
    this._page = Phaser.Math.Clamp(this._page, 0, maxPage);

    if (this._selectedGearId && !inv.some(g => g.id === this._selectedGearId)) {
      this._selectedGearId = inv[0]?.id || null;
    }
    if (!this._selectedGearId && inv.length) this._selectedGearId = inv[0].id;

    c.add(this.add.rectangle(W / 2, H / 2, W, H, 0x0a0a1a));
    c.add(this.add.rectangle(W / 2, 44, W, 88, 0x181028));
    c.add(this.add.text(W / 2, 44, '⚒ GEAR FORGE', { font: '24px monospace', fill: '#ffd700' }).setOrigin(0.5));
    c.add(this.add.text(16, 44, '< BACK', { font: '14px monospace', fill: '#aaaaaa' })
      .setOrigin(0, 0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', () => this.scene.start('MainHub')));
    c.add(this.add.text(W - 16, 44, `Gold: ${CurrencyManager.get(CURRENCY.GOLD).toLocaleString()}`,
      { font: '11px monospace', fill: '#ffd700' }).setOrigin(1, 0.5));

    if (!hero) {
      c.add(this.add.text(W / 2, 420,
        'No heroes available.\nSummon heroes before using Gear Forge.',
        { font: '16px monospace', fill: '#888888', align: 'center' }).setOrigin(0.5));
      return;
    }

    this._addHeroPicker(c, hero, W);
    this._addEquippedPanel(c, hero, W);
    this._addFilterBar(c, W);
    this._addInventoryList(c, inv, perPage, W);
    this._addActionBar(c, hero, W);

    if (this._msg) {
      c.add(this.add.text(W / 2, 828, this._msg, { font: '11px monospace', fill: '#88bbff' }).setOrigin(0.5));
    }
  }

  _addHeroPicker(c, hero, W) {
    c.add(this.add.rectangle(W / 2, 118, 448, 62, 0x121230).setStrokeStyle(1, 0x363660));

    const mkArrow = (x, label, dir) => {
      const btn = this.add.rectangle(x, 118, 34, 34, 0x20204a).setStrokeStyle(1, 0x5757aa)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
          this._heroIndex += dir;
          this._msg = '';
          this._render();
        });
      c.add([btn, this.add.text(x, 118, label, { font: '14px monospace', fill: '#ffffff' }).setOrigin(0.5)]);
    };

    mkArrow(40, '<', -1);
    mkArrow(W - 40, '>', 1);

    c.add(this.add.text(W / 2, 108, hero.name, { font: '18px monospace', fill: '#ffffff' }).setOrigin(0.5));
    c.add(this.add.text(W / 2, 130, `${hero.rarity}  LV ${hero.level}  ${hero.heroClass}`,
      { font: '11px monospace', fill: '#88aaff' }).setOrigin(0.5));
  }

  _addEquippedPanel(c, hero, W) {
    c.add(this.add.rectangle(W / 2, 192, 448, 90, 0x101024).setStrokeStyle(1, 0x2a2a55));
    c.add(this.add.text(W / 2, 156, 'EQUIPPED SLOTS', { font: '11px monospace', fill: '#6677aa' }).setOrigin(0.5));

    SLOT_ORDER.forEach((slot, i) => {
      const x = 45 + i * 98;
      const gear = GearManager.getGear(hero.gear[slot]);
      c.add(this.add.rectangle(x, 198, 86, 56, 0x16163a).setStrokeStyle(1, 0x333366));
      c.add(this.add.text(x, 179, SLOT_SHORT[slot], { font: '9px monospace', fill: '#7777aa' }).setOrigin(0.5));
      c.add(this.add.text(x, 194, gear ? gear.name.slice(0, 10) : 'EMPTY',
        { font: '9px monospace', fill: gear ? (RARITY_COLOR[gear.rarity] || '#ffffff') : '#444466' }).setOrigin(0.5));
      c.add(this.add.text(x, 211, gear ? `+${gear.level}` : '—',
        { font: '10px monospace', fill: gear ? '#cccccc' : '#444466' }).setOrigin(0.5));
    });
  }

  _addFilterBar(c, W) {
    c.add(this.add.text(20, 248, 'FILTER:', { font: '10px monospace', fill: '#888888' }));
    const filters = ['ALL', ...SLOT_ORDER];
    filters.forEach((slot, i) => {
      const active = slot === this._slotFilter;
      const x = 70 + i * 67;
      const btn = this.add.rectangle(x, 248, 62, 24, active ? 0x2f2f67 : 0x161638)
        .setStrokeStyle(1, active ? 0x6677ff : 0x3a3a66)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
          this._slotFilter = slot;
          this._page = 0;
          this._msg = '';
          this._render();
        });
      c.add([btn, this.add.text(x, 248, slot === 'ALL' ? slot : SLOT_SHORT[slot], {
        font: '9px monospace', fill: active ? '#ffffff' : '#aaaaaa'
      }).setOrigin(0.5)]);
    });
  }

  _addInventoryList(c, inv, perPage, W) {
    c.add(this.add.rectangle(W / 2, 423, 448, 320, 0x0f0f24).setStrokeStyle(1, 0x2a2a55));
    c.add(this.add.text(W / 2, 276, 'INVENTORY', { font: '11px monospace', fill: '#6677aa' }).setOrigin(0.5));

    const pageStart = this._page * perPage;
    const pageItems = inv.slice(pageStart, pageStart + perPage);

    if (!pageItems.length) {
      c.add(this.add.text(W / 2, 423, 'No gear for this filter.',
        { font: '14px monospace', fill: '#666688' }).setOrigin(0.5));
    }

    pageItems.forEach((gear, i) => {
      const y = 322 + i * 58;
      const selected = gear.id === this._selectedGearId;
      const border = selected ? 0x8899ff : 0x2b2b4f;
      const bg = this.add.rectangle(W / 2, y, 432, 52, 0x161634).setStrokeStyle(1, border)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
          this._selectedGearId = gear.id;
          this._render();
        });
      c.add(bg);

      c.add(this.add.text(34, y - 12, `${gear.name}  [${gear.slot}]`, {
        font: '11px monospace', fill: RARITY_COLOR[gear.rarity] || '#ffffff'
      }));
      c.add(this.add.text(34, y + 7,
        `Lv ${gear.level}  ATK+${gear.statBonus.damage}  DEF+${gear.statBonus.defense}  HP+${gear.statBonus.hp}`,
        { font: '10px monospace', fill: '#bbbbcc' }));

      const status = gear.equippedTo ? `Equipped (${HeroManager.getHero(gear.equippedTo)?.name || 'Unknown'})` : 'Unequipped';
      c.add(this.add.text(W - 28, y - 2, status,
        { font: '9px monospace', fill: gear.equippedTo ? '#ffcc66' : '#66cc88' }).setOrigin(1, 0.5));
    });

    const pageCount = Math.max(1, Math.ceil(inv.length / perPage));
    const pageLabel = `${this._page + 1} / ${pageCount}`;
    c.add(this.add.text(W / 2, 584, pageLabel, { font: '10px monospace', fill: '#7777aa' }).setOrigin(0.5));

    const mkPageBtn = (x, text, delta) => {
      const enabled = delta < 0 ? this._page > 0 : this._page < pageCount - 1;
      const btn = this.add.rectangle(x, 584, 44, 24, enabled ? 0x20204a : 0x111122)
        .setStrokeStyle(1, enabled ? 0x5555aa : 0x2a2a44);
      c.add(btn);
      c.add(this.add.text(x, 584, text, { font: '11px monospace', fill: enabled ? '#ffffff' : '#444466' }).setOrigin(0.5));
      if (!enabled) return;
      btn.setInteractive({ useHandCursor: true }).on('pointerup', () => {
        this._page += delta;
        this._render();
      });
    };

    mkPageBtn(140, '< PREV', -1);
    mkPageBtn(340, 'NEXT >', 1);
  }

  _addActionBar(c, hero, W) {
    c.add(this.add.rectangle(W / 2, 700, 448, 172, 0x101024).setStrokeStyle(1, 0x2a2a55));
    c.add(this.add.text(W / 2, 628, 'SELECTED ITEM ACTIONS', { font: '11px monospace', fill: '#6677aa' }).setOrigin(0.5));

    const gear = this._selectedGearId ? GearManager.getGear(this._selectedGearId) : null;
    if (!gear) {
      c.add(this.add.text(W / 2, 700, 'Select a gear item above.',
        { font: '13px monospace', fill: '#666688' }).setOrigin(0.5));
      return;
    }

    c.add(this.add.text(W / 2, 664, `${gear.name} (${gear.rarity})`,
      { font: '13px monospace', fill: RARITY_COLOR[gear.rarity] || '#ffffff' }).setOrigin(0.5));
    c.add(this.add.text(W / 2, 682, `Upgrade Cost: ${gear.upgradeCost().toLocaleString()} Gold  •  Salvage: ${gear.salvageValue().toLocaleString()} Gold`,
      { font: '10px monospace', fill: '#bbbbcc' }).setOrigin(0.5));

    const equipLabel = gear.equippedTo === hero.id ? 'UNEQUIP' : 'EQUIP TO HERO';
    this._mkActionBtn(c, 92, 730, 126, 42, equipLabel, '#88ccff', () => {
      const ok = gear.equippedTo === hero.id
        ? GearManager.unequip(gear.id)
        : GearManager.equip(gear.id, hero.id, gear.slot);
      this._msg = ok ? `Updated ${gear.name}.` : 'Could not change equip state.';
      if (ok) GameState.save();
      this._render();
    });

    this._mkActionBtn(c, 240, 730, 126, 42, 'UPGRADE', '#66ff88', () => {
      const ok = gear.upgrade();
      this._msg = ok ? `${gear.name} upgraded to +${gear.level}.` : 'Not enough gold for upgrade.';
      if (ok) GameState.save();
      this._render();
    });

    this._mkActionBtn(c, 388, 730, 126, 42, 'SALVAGE', '#ff8888', () => {
      const ok = GearManager.salvage(gear.id);
      this._msg = ok ? `${gear.name} salvaged for gold.` : 'Unequip item before salvaging.';
      if (ok) {
        if (this._selectedGearId === gear.id) this._selectedGearId = null;
        GameState.save();
      }
      this._render();
    });

    this._mkActionBtn(c, W / 2, 786, 180, 34, 'UNEQUIP ALL HERO GEAR', '#ffaa66', () => {
      let count = 0;
      for (const slot of SLOT_ORDER) {
        const id = hero.gear[slot];
        if (id && GearManager.unequip(id)) count++;
      }
      this._msg = count ? `Unequipped ${count} item(s).` : 'No equipped gear to unequip.';
      if (count) GameState.save();
      this._render();
    });
  }

  _mkActionBtn(c, x, y, w, h, label, color, fn) {
    const bgHex = Number.parseInt(color.replace('#', '0x'), 16);
    const btn = this.add.rectangle(x, y, w, h, bgHex).setStrokeStyle(1, 0xffffff)
      .setAlpha(0.24)
      .setInteractive({ useHandCursor: true })
      .on('pointerup', fn);
    c.add([btn, this.add.text(x, y, label, { font: '10px monospace', fill: color }).setOrigin(0.5)]);
  }
}
