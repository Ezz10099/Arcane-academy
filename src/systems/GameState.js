import SaveManager from './SaveManager.js';
import CurrencyManager from './CurrencyManager.js';

const GameState = {
  heroRoster: [],
  activeSquad: [],
  campaignProgress: { regionCleared: 0, stageCleared: null },
  unlockedSystems: new Set(),
  sessionStartTime: null,

  init() {
    this.sessionStartTime = Date.now();
    const save = SaveManager.load();
    if (save) this.fromJSON(save);
    else this._seedDefaults();
  },

  _seedDefaults() {
    this.heroRoster = [];
    this.activeSquad = [];
    this.campaignProgress = { regionCleared: 0, stageCleared: null };
    this.unlockedSystems = new Set();
  },

  save() { SaveManager.save(this.toJSON()); },

  addUnlockedSystem(name) { this.unlockedSystems.add(name); this.save(); },

  isUnlocked(name) { return this.unlockedSystems.has(name); },

  toJSON() {
    return {
      heroRoster: this.heroRoster,
      activeSquad: this.activeSquad,
      campaignProgress: this.campaignProgress,
      unlockedSystems: [...this.unlockedSystems],
      currencies: CurrencyManager.toJSON()
    };
  },

  fromJSON(data) {
    this.heroRoster = data.heroRoster || [];
    this.activeSquad = data.activeSquad || [];
    this.campaignProgress = data.campaignProgress || { regionCleared: 0, stageCleared: null };
    this.unlockedSystems = new Set(data.unlockedSystems || []);
    if (data.currencies) CurrencyManager.fromJSON(data.currencies);
  }
};

export default GameState;
