const SaveManager = {
  KEY: 'arcane_academy_save',

  save(state) {
    try { localStorage.setItem(this.KEY, JSON.stringify(state)); } catch (e) { console.error('Save failed', e); }
  },

  load() {
    try { const d = localStorage.getItem(this.KEY); return d ? JSON.parse(d) : null; } catch (e) { return null; }
  },

  deleteSave() { localStorage.removeItem(this.KEY); }
};

export default SaveManager;
