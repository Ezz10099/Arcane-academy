// Region 1 — The Academy Grounds (tutorial, 5 stages).
// Enemy objects are spread directly into BattleEngine combatants, so fields
// must match what BattleEngine expects: id, name, heroClass, affinity, range,
// stats {hp,defense,damage}, row, abilityIds, ultimateAbilityId, ultimateCharge.
// milestoneRewards fires once on first clear.

const STAGE_DEFINITIONS = [
  {
    id: '1-1', region: 1, stage: 1, name: 'Academy Gates',
    enemies: [
      { id: 'e_1_1_a', name: 'Guard', heroClass: 'WARRIOR', affinity: 'FIRE', range: 'melee',
        stats: { hp: 95, defense: 8, damage: 12 }, row: 'FRONT',
        abilityIds: ['wa_slash'], ultimateAbilityId: 'wa_berserker_surge', ultimateCharge: 0 }
    ],
    rewards: { gold: 50, xp: 20 },
    milestoneRewards: []
  },
  {
    id: '1-2', region: 1, stage: 2, name: 'Training Yard',
    enemies: [
      { id: 'e_1_2_a', name: 'Soldier', heroClass: 'WARRIOR', affinity: 'EARTH', range: 'melee',
        stats: { hp: 115, defense: 10, damage: 14 }, row: 'FRONT',
        abilityIds: ['wa_slash', 'wa_shield_bash'], ultimateAbilityId: 'wa_berserker_surge', ultimateCharge: 0 },
      { id: 'e_1_2_b', name: 'Scout', heroClass: 'ARCHER', affinity: 'ICE', range: 'ranged',
        stats: { hp: 75, defense: 6, damage: 16 }, row: 'BACK',
        abilityIds: ['ar_swift_shot'], ultimateAbilityId: 'ar_rain_of_arrows', ultimateCharge: 0 }
    ],
    rewards: { gold: 80, xp: 30 },
    milestoneRewards: []
  },
  {
    id: '1-3', region: 1, stage: 3, name: 'The East Wing',
    enemies: [
      { id: 'e_1_3_a', name: 'Veteran', heroClass: 'WARRIOR', affinity: 'FIRE', range: 'melee',
        stats: { hp: 145, defense: 14, damage: 18 }, row: 'FRONT',
        abilityIds: ['wa_slash', 'aff_burning_touch'], ultimateAbilityId: 'wa_berserker_surge', ultimateCharge: 0 },
      { id: 'e_1_3_b', name: 'Archer', heroClass: 'ARCHER', affinity: 'EARTH', range: 'ranged',
        stats: { hp: 90, defense: 8, damage: 20 }, row: 'BACK',
        abilityIds: ['ar_piercing_arrow'], ultimateAbilityId: 'ar_rain_of_arrows', ultimateCharge: 0 }
    ],
    rewards: { gold: 120, xp: 40 },
    milestoneRewards: [
      { type: 'giftHero', heroDefId: 'hero_brynn', hint: 'Brynn joins your team!' }
    ]
  },
  {
    id: '1-4', region: 1, stage: 4, name: 'The Grand Hall',
    enemies: [
      { id: 'e_1_4_a', name: 'Warden', heroClass: 'TANK', affinity: 'EARTH', range: 'melee',
        stats: { hp: 230, defense: 28, damage: 14 }, row: 'FRONT',
        abilityIds: ['tk_provoke', 'aff_earthen_grip'], ultimateAbilityId: 'tk_bulwark', ultimateCharge: 0 },
      { id: 'e_1_4_b', name: 'Acolyte', heroClass: 'MAGE', affinity: 'ICE', range: 'ranged',
        stats: { hp: 82, defense: 8, damage: 26 }, row: 'BACK',
        abilityIds: ['mg_arcane_bolt', 'aff_glacial_spike'], ultimateAbilityId: 'mg_void_burst', ultimateCharge: 0 }
    ],
    rewards: { gold: 160, xp: 55 },
    milestoneRewards: []
  },
  {
    id: '1-5', region: 1, stage: 5, name: "Headmaster's Trial",
    enemies: [
      { id: 'e_1_5_a', name: 'Captain', heroClass: 'TANK', affinity: 'EARTH', range: 'melee',
        stats: { hp: 265, defense: 32, damage: 16 }, row: 'FRONT',
        abilityIds: ['tk_provoke', 'aff_earthen_grip'], ultimateAbilityId: 'tk_bulwark', ultimateCharge: 0 },
      { id: 'e_1_5_b', name: 'Knight', heroClass: 'WARRIOR', affinity: 'FIRE', range: 'melee',
        stats: { hp: 175, defense: 18, damage: 22 }, row: 'FRONT',
        abilityIds: ['wa_slash', 'aff_burning_touch'], ultimateAbilityId: 'wa_berserker_surge', ultimateCharge: 0 },
      { id: 'e_1_5_c', name: 'Sorc', heroClass: 'MAGE', affinity: 'FIRE', range: 'ranged',
        stats: { hp: 95, defense: 10, damage: 30 }, row: 'BACK',
        abilityIds: ['mg_arcane_bolt', 'aff_burning_touch'], ultimateAbilityId: 'mg_void_burst', ultimateCharge: 0 }
    ],
    rewards: { gold: 250, xp: 80 },
    milestoneRewards: [
      { type: 'giftHero',     heroDefId: 'hero_sylva', hint: 'Sylva joins your team!' },
      { type: 'unlockSystem', system: 'BASIC_SUMMON',  hint: 'Basic Summon unlocked!' }
    ]
  }
];

export default STAGE_DEFINITIONS;
