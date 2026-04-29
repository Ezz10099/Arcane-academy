import GameState from '../systems/GameState.js';
import CurrencyManager from '../systems/CurrencyManager.js';
import IdleManager from '../systems/IdleManager.js';
import AchievementManager from '../systems/AchievementManager.js';
import LoginStreakManager from '../systems/LoginStreakManager.js';
import DailyCodexManager from '../systems/DailyCodexManager.js';
import HeroManager from '../systems/HeroManager.js';
import { CURRENCY } from '../data/constants.js';
import { ARCANE_THEME, addArcaneBackdrop, createPanel } from '../ui/ArcaneUI.js';

const W = 480;
const H = 854;
const OUTER_PADDING = 16;
const TOP_H = 78;
const BOTTOM_H = 92;
const CENTER_TOP = TOP_H + 12;
const CENTER_BOTTOM = H - BOTTOM_H - 12;
const CENTER_H = CENTER_BOTTOM - CENTER_TOP;

const ICONS = {
  settings: '⚙',
  gold: '●',
  gems: '◆',
  tickets: '◇',
  energy: 'ϟ',
  campaign: '⚔',
  heroes: '⛨',
  summon: '✹',
  guild: '⛊',
  more: '☰',
  arena: '⚔',
  tower: '♜',
  boss: '☠',
  codex: '☷',
  tree: '♧',
  shop: '◈',
  mail: '✉',
  events: '✦'
};

const NAV_TABS = [
  { key: 'Campaign', label: 'Campaign', icon: ICONS.campaign },
  { key: 'Heroes', label: 'Heroes', icon: ICONS.heroes },
  { key: 'Summon', label: 'Summon', icon: ICONS.summon, featured: true },
  { key: 'Guild', label: 'Guild', icon: ICONS.guild },
  { key: 'More', label: 'More', icon: ICONS.more }
];

export default class MainHubScene extends Phaser.Scene {
  constructor() {
    super('MainHub');
    this._selectedTab = 'Campaign';
    this._pendingIdleGold = 0;
    this._dotTargets = {};
    this._resourceTexts = [];
    this._currencyTexts = {};
  }

  create(data = {}) {
    this._selectedTab = data.tab || 'Campaign';
    this._dotTargets = {};
    this._resourceTexts = [];
    this._currencyTexts = {};

    addArcaneBackdrop(this, W, H);
    this._centerRoot = this.add.container(0, 0);
    this._bottomNavRoot = this.add.container(0, 0);
    this._drawTopBar();
    this._drawSideShortcuts();
    this._drawBottomNav();
    this._drawTabContent();

    this.time.addEvent({ delay: 500, loop: true, callback: this._refreshUI, callbackScope: this });
    this.time.addEvent({ delay: 1000, loop: true, callback: this._idleTick, callbackScope: this });
    this.time.addEvent({ delay: 30000, loop: true, callback: () => GameState.save() });
    this._refreshUI();

    if (LoginStreakManager.canClaimToday()) {
      this.time.delayedCall(120, () => this.scene.start('LoginStreak', { returnScene: 'MainHub' }));
    }

    AchievementManager.showPopups(this);
  }

  _drawTopBar() {
    const y = TOP_H / 2 + 6;
    createPanel(this, {
      x: W / 2,
      y,
      width: W - OUTER_PADDING * 2,
      height: TOP_H,
      fill: 0x120c22,
      border: 0x89613f,
      withInner: false,
      alpha: 0.88
    });

    this.add.circle(OUTER_PADDING + 28, y, 24, 0x2a1d45, 0.95).setStrokeStyle(2, 0xc69d63, 1);
    this.add.circle(OUTER_PADDING + 28, y, 15, 0x4e2f72, 0.8).setStrokeStyle(1, 0xe3bf80, 0.8);
    this._levelBadge = this.add.circle(OUTER_PADDING + 14, y + 18, 9, 0x4a316b, 1).setStrokeStyle(1, 0xe5be7e, 0.9);
    this._levelText = this.add.text(OUTER_PADDING + 14, y + 18, '1', { font: '10px monospace', fill: ARCANE_THEME.colors.textPrimary }).setOrigin(0.5);

    this._usernameText = this.add.text(OUTER_PADDING + 58, y - 16, 'Risen Ruler', { font: '14px monospace', fill: ARCANE_THEME.colors.textPrimary });
    this._powerText = this.add.text(OUTER_PADDING + 58, y + 5, 'Power 0', { font: '11px monospace', fill: ARCANE_THEME.colors.textSecondary });

    const currencyDefs = [
      { key: CURRENCY.GOLD, icon: ICONS.gold, tint: '#ffd27b', short: 'gold' },
      { key: CURRENCY.PREMIUM_CRYSTALS, icon: ICONS.gems, tint: '#d3a2ff', short: 'abyss crystals' },
      { key: CURRENCY.CRYSTALS, icon: ICONS.tickets, tint: '#bba8ff', short: 'summon seals' }
    ];

    let cx = 258;
    currencyDefs.forEach(def => {
      const holder = this.add.container(cx, y);
      const chip = this.add.rectangle(0, 0, 58, 24, 0x1c1230, 0.94).setStrokeStyle(1, 0x8f6947, 0.8);
      const icon = this.add.text(-22, 0, def.icon, { font: '11px serif', fill: def.tint }).setOrigin(0.5);
      const value = this.add.text(2, 0, '0', { font: '10px monospace', fill: ARCANE_THEME.colors.textPrimary }).setOrigin(0.5);
      const plus = this.add.text(25, 0, '+', { font: '11px monospace', fill: '#ffe4b8' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
      plus.on('pointerup', () => this._showToast(`${def.short} sources`));
      holder.add([chip, icon, value, plus]);
      this._currencyTexts[def.key] = value;
      cx += 58;
    });

    this._makeSmallButton(W - OUTER_PADDING - 20, y, ICONS.settings, () => this.scene.start('Settings'));
  }

  _drawSideShortcuts() {
    const shortcuts = [
      { x: OUTER_PADDING + 22, y: 180, label: 'Events', icon: ICONS.events, scene: 'Achievement', dotKey: 'events' },
      { x: OUTER_PADDING + 22, y: 238, label: 'Codex', icon: ICONS.codex, scene: 'DailyCodex', dotKey: 'codex' },
      { x: W - OUTER_PADDING - 22, y: 180, label: 'Arena', icon: ICONS.arena, scene: 'Arena' },
      { x: W - OUTER_PADDING - 22, y: 238, label: 'Shop', icon: ICONS.shop, scene: 'GuildShop', dotKey: 'offers' }
    ];

    shortcuts.forEach(item => {
      const button = this.add.container(item.x, item.y);
      const bg = this.add.circle(0, 0, 22, 0x201335, 0.9).setStrokeStyle(1, 0xba915a, 0.85);
      const icon = this.add.text(0, -1, item.icon, { font: '16px serif', fill: '#f5dfbc' }).setOrigin(0.5);
      const label = this.add.text(0, 29, item.label, { font: '9px monospace', fill: ARCANE_THEME.colors.textSecondary }).setOrigin(0.5);
      const hit = this.add.zone(0, 0, 52, 52).setInteractive({ useHandCursor: true });
      hit.on('pointerup', () => {
        const gate = this._getSceneUnlock(item.scene);
        this._startSceneOrLocked(item.scene, gate?.unlockKey, gate?.lockedMsg);
      });
      button.add([bg, icon, label, hit]);
      if (item.dotKey) {
        const dot = this.add.circle(item.x + 14, item.y - 14, 5, ARCANE_THEME.colors.danger).setVisible(false);
        this._dotTargets[item.dotKey] = dot;
      }
    });
  }

  _drawBottomNav() {
    this._bottomNavRoot.removeAll(true);
    const c = this._bottomNavRoot;
    const navY = H - BOTTOM_H / 2;
    c.add(createPanel(this, {
      x: W / 2,
      y: navY,
      width: W - OUTER_PADDING * 2,
      height: BOTTOM_H,
      fill: 0x140e25,
      border: 0x9a7340,
      withInner: false,
      alpha: 0.9
    }));

    const startX = 54;
    const gap = 93;
    NAV_TABS.forEach((item, index) => {
      const x = startX + index * gap;
      const selected = item.key === this._selectedTab;
      const y = item.featured ? navY - 14 : navY;
      const radius = item.featured ? 30 : 24;
      const bg = this.add.circle(x, y - 8, radius, selected ? 0x44206d : 0x241639, 0.96)
        .setStrokeStyle(2, selected ? 0xffd27a : 0x9a7340, selected ? 1 : 0.75);
      const icon = this.add.text(x, y - 10, item.icon, { font: `${item.featured ? 20 : 16}px serif`, fill: selected ? '#fff0c6' : '#d9c09a' }).setOrigin(0.5);
      const text = this.add.text(x, navY + 25, item.label, { font: '10px monospace', fill: selected ? '#ffd27a' : ARCANE_THEME.colors.textSecondary }).setOrigin(0.5);
      const hit = this.add.zone(x, navY, 78, BOTTOM_H).setInteractive({ useHandCursor: true });
      hit.on('pointerup', () => this._selectTab(item.key));
      hit.on('pointerdown', () => this.tweens.add({ targets: [bg, icon, text], scale: 1.04, duration: 90, yoyo: true }));
      c.add([bg, icon, text, hit]);
      if (item.key === 'Summon') {
        const dot = this.add.circle(x + 20, y - 29, 5, ARCANE_THEME.colors.danger).setVisible(false);
        this._dotTargets.summon = dot;
        c.add(dot);
      }
    });
  }

  _selectTab(tabKey) {
    this._selectedTab = tabKey;
    this._drawBottomNav();
    this._drawTabContent();
    this._refreshUI();
  }

  _drawTabContent() {
    this._centerRoot.removeAll(true);
    const c = this._centerRoot;

    c.add(this.add.rectangle(W / 2, CENTER_TOP + CENTER_H / 2, W - OUTER_PADDING * 2, CENTER_H, 0x0c0818, 0.72)
      .setStrokeStyle(1, 0x513a66, 0.65));

    switch (this._selectedTab) {
      case 'Campaign':
        this._drawCampaignTab(c);
        break;
      case 'Heroes':
        this._drawHeroesTab(c);
        break;
      case 'Summon':
        this._drawSummonTab(c);
        break;
      case 'Guild':
        this._drawGuildTab(c);
        break;
      case 'More':
      default:
        this._drawMoreTab(c);
        break;
    }
  }

  _drawCampaignTab(c) {
    this._drawTabHeader(c, 'CAMPAIGN', 'Chapter map placeholder — functional layout first');
    const mapY = 352;
    c.add(this.add.rectangle(W / 2, mapY, 360, 300, 0x120a20, 0.94).setStrokeStyle(2, 0x8f6947, 0.9));
    c.add(this.add.text(W / 2, mapY - 118, 'Fallen Crown Road', { font: '16px monospace', fill: '#ffd27a' }).setOrigin(0.5));

    const nodes = [
      { x: 130, y: mapY + 65, label: '1-1' },
      { x: 190, y: mapY + 15, label: '1-2' },
      { x: 255, y: mapY - 20, label: '1-3' },
      { x: 325, y: mapY - 70, label: 'BOSS', boss: true }
    ];
    nodes.forEach((node, index) => {
      if (index > 0) c.add(this.add.line(0, 0, nodes[index - 1].x, nodes[index - 1].y, node.x, node.y, 0x7b4fa1, 0.75).setOrigin(0));
      c.add(this.add.circle(node.x, node.y, node.boss ? 20 : 15, node.boss ? 0x5a1830 : 0x261542, 1).setStrokeStyle(2, node.boss ? 0xff6b8b : 0xd0a469, 1));
      c.add(this.add.text(node.x, node.y, node.label, { font: node.boss ? '9px monospace' : '10px monospace', fill: '#f5dfbc' }).setOrigin(0.5));
    });

    const stage = GameState.campaignProgress.stageCleared || 'none';
    c.add(this.add.text(W / 2, 548, `Last cleared: ${stage}`, { font: '12px monospace', fill: ARCANE_THEME.colors.textSecondary }).setOrigin(0.5));
    this._addActionButton(c, W / 2, 592, 230, 42, 'OPEN CAMPAIGN', () => this.scene.start('Campaign'));
  }

  _drawHeroesTab(c) {
    this._drawTabHeader(c, 'HEROES', 'Roster, squad, gear and upgrades');
    const heroes = HeroManager.getAllHeroes();
    const squad = GameState.getBattleSquadEntries?.() || [];

    c.add(this.add.rectangle(W / 2, 285, 360, 150, 0x120a20, 0.94).setStrokeStyle(2, 0x8f6947, 0.9));
    c.add(this.add.text(W / 2, 235, `${heroes.length} heroes owned`, { font: '18px monospace', fill: '#ffd27a' }).setOrigin(0.5));
    c.add(this.add.text(W / 2, 270, `Battle squad: ${squad.length}/5`, { font: '13px monospace', fill: ARCANE_THEME.colors.textPrimary }).setOrigin(0.5));
    c.add(this.add.text(W / 2, 310, squad.map(entry => HeroManager.getHero(entry.heroId)?.name || 'Unknown').join('  |  ') || 'No squad selected', {
      font: '10px monospace', fill: ARCANE_THEME.colors.textSecondary, align: 'center', wordWrap: { width: 320 }
    }).setOrigin(0.5));

    this._addActionButton(c, W / 2, 450, 230, 42, 'OPEN ROSTER', () => this.scene.start('Roster'));
    this._addActionButton(c, W / 2, 502, 230, 36, 'GEAR FORGE', () => this.scene.start('GearForge'), 'secondary');
  }

  _drawSummonTab(c) {
    this._drawTabHeader(c, 'SUMMON', 'Abyssal gate placeholder');
    const portalY = 330;
    c.add(this.add.circle(W / 2, portalY, 92, 0x22103a, 0.95).setStrokeStyle(3, 0xb47cff, 0.9));
    c.add(this.add.circle(W / 2, portalY, 56, 0x5a1ca2, 0.45).setStrokeStyle(2, 0xffd27a, 0.7));
    c.add(this.add.text(W / 2, portalY, 'ABYSS\nGATE', { font: '18px monospace', fill: '#f5dfbc', align: 'center' }).setOrigin(0.5));
    this.tweens.add({ targets: c.list[c.list.length - 2], alpha: 0.18, duration: 1000, yoyo: true, repeat: -1 });

    this._addActionButton(c, W / 2, 506, 230, 42, 'OPEN SUMMON', () => this.scene.start('Summon'));
    this._addActionButton(c, W / 2, 558, 230, 36, 'RATES / WISHLIST', () => this._showToast('Rates and wishlist'), 'secondary');
  }

  _drawGuildTab(c) {
    this._drawTabHeader(c, 'GUILD', 'War council and guild systems');
    const unlocked = GameState.isUnlocked('GUILD');
    c.add(this.add.rectangle(W / 2, 330, 360, 190, 0x120a20, 0.94).setStrokeStyle(2, unlocked ? 0x8f6947 : 0x5b4a5f, 0.9));
    c.add(this.add.text(W / 2, 300, unlocked ? 'Guild Hall Available' : 'Guild Hall Locked', {
      font: '18px monospace', fill: unlocked ? '#ffd27a' : '#999999'
    }).setOrigin(0.5));
    c.add(this.add.text(W / 2, 344, unlocked ? 'Boss, shop, quests and guild status.' : 'Unlocks after Region 3.', {
      font: '12px monospace', fill: ARCANE_THEME.colors.textSecondary, align: 'center'
    }).setOrigin(0.5));

    this._addActionButton(c, W / 2, 500, 230, 42, unlocked ? 'OPEN GUILD' : 'LOCKED', () => {
      this._startSceneOrLocked('Guild', 'GUILD', 'Unlocks after Region 3');
    }, unlocked ? 'primary' : 'disabled');
    this._addActionButton(c, W / 2, 552, 230, 36, 'GUILD SHOP', () => {
      this._startSceneOrLocked('GuildShop', 'GUILD', 'Unlocks after Region 3');
    }, unlocked ? 'secondary' : 'disabled');
  }

  _drawMoreTab(c) {
    this._drawTabHeader(c, 'MORE', 'Secondary systems');
    const items = [
      { label: 'Arena', icon: ICONS.arena, scene: 'Arena' },
      { label: 'Towers', icon: ICONS.tower, scene: 'AffinityTowerSelection' },
      { label: 'World Boss', icon: ICONS.boss, scene: 'WorldBoss' },
      { label: 'Codex', icon: ICONS.codex, scene: 'DailyCodex' },
      { label: 'Abyss Tree', icon: ICONS.tree, scene: 'ElderTree' },
      { label: 'Settings', icon: ICONS.settings, scene: 'Settings' }
    ];

    items.forEach((item, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      const x = 150 + col * 180;
      const y = 240 + row * 96;
      this._addSystemCard(c, x, y, item);
    });
  }

  _drawTabHeader(c, title, subtitle) {
    c.add(this.add.text(W / 2, CENTER_TOP + 30, title, { font: '24px monospace', fill: '#ffd27a' }).setOrigin(0.5));
    c.add(this.add.text(W / 2, CENTER_TOP + 56, subtitle, { font: '11px monospace', fill: ARCANE_THEME.colors.textSecondary }).setOrigin(0.5));
  }

  _addSystemCard(c, x, y, item) {
    const bg = this.add.rectangle(x, y, 150, 70, 0x171022, 0.94).setStrokeStyle(1, 0x8f6947, 0.75)
      .setInteractive({ useHandCursor: true });
    const icon = this.add.text(x, y - 12, item.icon, { font: '18px serif', fill: '#ffd27a' }).setOrigin(0.5);
    const label = this.add.text(x, y + 16, item.label, { font: '11px monospace', fill: ARCANE_THEME.colors.textPrimary }).setOrigin(0.5);
    bg.on('pointerup', () => {
      const gate = this._getSceneUnlock(item.scene);
      this._startSceneOrLocked(item.scene, gate?.unlockKey, gate?.lockedMsg);
    });
    c.add([bg, icon, label]);
  }

  _addActionButton(c, x, y, width, height, label, onClick, variant = 'primary') {
    const fills = {
      primary: 0x3a215a,
      secondary: 0x221a35,
      disabled: 0x1a1a1f
    };
    const strokes = {
      primary: 0xd0a469,
      secondary: 0x8f6947,
      disabled: 0x555555
    };
    const fill = fills[variant] || fills.primary;
    const stroke = strokes[variant] || strokes.primary;
    const btn = this.add.rectangle(x, y, width, height, fill, 0.96).setStrokeStyle(1, stroke, 0.95);
    const text = this.add.text(x, y, label, { font: '13px monospace', fill: variant === 'disabled' ? '#777777' : '#f5dfbc' }).setOrigin(0.5);
    if (variant !== 'disabled') {
      btn.setInteractive({ useHandCursor: true });
      btn.on('pointerdown', () => this.tweens.add({ targets: [btn, text], scale: 1.03, duration: 90, yoyo: true }));
      btn.on('pointerup', onClick);
    }
    c.add([btn, text]);
    return btn;
  }

  _makeSmallButton(x, y, label, onClick) {
    const bg = this.add.circle(x, y, 18, 0x2d1a44, 0.95).setStrokeStyle(1, 0xc69d63, 0.9);
    const text = this.add.text(x, y, label, { font: '14px monospace', fill: '#ffe4b8' }).setOrigin(0.5);
    const hit = this.add.zone(x, y, 42, 42).setInteractive({ useHandCursor: true });
    hit.on('pointerup', onClick);
    return { bg, text, hit };
  }

  _startSceneOrLocked(scene, unlockKey, lockedMsg) {
    if (unlockKey && !GameState.isUnlocked(unlockKey)) {
      this._showToast(lockedMsg || 'Locked');
      return;
    }
    this.scene.start(scene);
  }

  _getSceneUnlock(scene) {
    const rules = {
      Arena: { unlockKey: 'ARENA', lockedMsg: 'Unlocks after Region 2' },
      Guild: { unlockKey: 'GUILD', lockedMsg: 'Unlocks after Region 3' },
      GuildShop: { unlockKey: 'GUILD', lockedMsg: 'Unlocks after Region 3' },
      AffinityTowerSelection: { unlockKey: 'AFFINITY_TOWERS', lockedMsg: 'Unlocks after Region 3' },
      EndlessTower: { unlockKey: 'FULL_ENDLESS_CONTENT', lockedMsg: 'Unlocks after Region 5' }
    };
    return rules[scene] || null;
  }

  _isCodexNotifiable() {
    const tasks = DailyCodexManager.getTasks();
    const hasCompletedTask = tasks.some(t => t.completed);
    const allDone = DailyCodexManager.isAllDailyComplete();
    const hasUnclaimedChest = allDone && !DailyCodexManager.dailyChestClaimed;
    const visitTask = tasks.find(t => t.taskId === 'VISIT_CODEX');
    const resetPing = !visitTask || visitTask.progress === 0;
    return hasCompletedTask || hasUnclaimedChest || resetPing;
  }

  _isSummonNotifiable() {
    return LoginStreakManager.canClaimToday();
  }

  _updateNotificationDots() {
    const candidates = [
      { key: 'codex', show: this._isCodexNotifiable(), dot: this._dotTargets.codex },
      { key: 'summon', show: this._isSummonNotifiable(), dot: this._dotTargets.summon },
      { key: 'events', show: LoginStreakManager.canClaimToday(), dot: this._dotTargets.events },
      { key: 'offers', show: CurrencyManager.get(CURRENCY.PREMIUM_CRYSTALS) < 100, dot: this._dotTargets.offers }
    ];

    const active = candidates.filter(c => c.show).slice(0, 4);
    const activeKeys = new Set(active.map(a => a.key));
    candidates.forEach(candidate => {
      if (candidate.dot) candidate.dot.setVisible(activeKeys.has(candidate.key));
    });
  }

  _idleTick() {
    IdleManager.tick(1000, GameState.campaignProgress, GameState.activeSquad);
    const rate = IdleManager.getRate(GameState.campaignProgress);
    this._pendingIdleGold = Math.min(this._pendingIdleGold + rate, rate * 120);
  }

  _refreshUI() {
    this._currencyTexts[CURRENCY.GOLD]?.setText(this._compact(CurrencyManager.get(CURRENCY.GOLD)));
    this._currencyTexts[CURRENCY.PREMIUM_CRYSTALS]?.setText(this._compact(CurrencyManager.get(CURRENCY.PREMIUM_CRYSTALS)));
    this._currencyTexts[CURRENCY.CRYSTALS]?.setText(this._compact(CurrencyManager.get(CURRENCY.CRYSTALS)));

    this._levelText?.setText(String(GameState.playerLevel || 1));
    this._usernameText?.setText(GameState.playerName || 'Risen Ruler');
    this._powerText?.setText(`Power ${this._compact(this._getTeamPower())}`);
    this._updateNotificationDots();
  }

  _getTeamPower() {
    if (typeof GameState.getTeamPower === 'function') {
      const statePower = GameState.getTeamPower();
      return Number.isFinite(statePower) ? statePower : 0;
    }

    const entries = GameState.getActiveSquadEntries?.() || [];
    if (!entries.length) return 0;

    return entries.reduce((total, entry) => {
      const hero = HeroManager.getHero(entry.heroId);
      if (!hero?.computeStats) return total;
      const stats = hero.computeStats();
      const heroPower = (stats.damage || 0) + (stats.defense || 0) + Math.floor((stats.hp || 0) / 10);
      return total + heroPower;
    }, 0);
  }

  _compact(value) {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return `${Math.floor(value)}`;
  }

  _showToast(message) {
    const toast = this.add.text(W / 2, H - 128, message, {
      font: '14px monospace',
      fill: ARCANE_THEME.colors.textPrimary,
      backgroundColor: '#160f2acc',
      padding: { x: 10, y: 6 }
    }).setOrigin(0.5).setDepth(1000);

    this.tweens.add({
      targets: toast,
      y: toast.y - 14,
      alpha: 0,
      duration: 700,
      ease: 'Quad.Out',
      onComplete: () => toast.destroy()
    });
  }
}
