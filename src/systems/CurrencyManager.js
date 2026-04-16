import { CURRENCY } from '../data/constants.js';

const _amounts = {};
for (const key of Object.values(CURRENCY)) _amounts[key] = 0;

const CurrencyManager = {
  _amounts,
  _listeners: [],

  get(type) { return this._amounts[type] ?? 0; },

  add(type, amount) {
    this._amounts[type] = (this._amounts[type] ?? 0) + amount;
    this._notify(type);
  },

  spend(type, amount) {
    if ((this._amounts[type] ?? 0) < amount) return false;
    this._amounts[type] -= amount;
    this._notify(type);
    return true;
  },

  onChange(cb) { this._listeners.push(cb); },

  _notify(type) { for (const cb of this._listeners) cb(type, this._amounts[type]); },

  toJSON() { return { ...this._amounts }; },

  fromJSON(data) { Object.assign(this._amounts, data); }
};

export default CurrencyManager;
