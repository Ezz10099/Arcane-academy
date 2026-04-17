# ARCANE ACADEMY — DESIGN DOCUMENT v5
*Status: Not fully locked. Subject to tuning next session.*

---

## CORE UNIT — HEROES

Every hero has:
- Name + Title (Legendary always, select Epics only)
- Class (Warrior, Tank, Mage, Archer, Healer, Assassin)
- Affinity (Fire, Ice, Earth, Shadow, Light)
- Rarity (Common → Uncommon → Rare → Epic → Legendary → Mythic → Ascended)
- Star Rating (level gate, independent from rarity)
- Level
- Normal Abilities (auto-cast, 2–3 innate to class + affinity, scale with rarity)
- Ultimate Ability (player-triggered; Legendary+ get 2)
- 5 Gear Slots (Weapon, Robe, Accessory, Relic, Sigil)

**Role Identity & Visual Design**
- A hero's CLASS defines their combat role and stat profile
- A hero's AFFINITY defines their element, strengths/weaknesses, and status effect
- Art direction must make both immediately readable at a glance:
  - Tank → armored, heavy silhouette
  - Warrior → strong, battle-ready appearance
  - Mage → arcane, mystical design
  - Archer → agile, ranged look
  - Healer → radiant, supportive aesthetic
  - Assassin → sharp, dark, threatening silhouette
- Affinity is visible through color palette and visual effects (Fire = red/orange, Ice = blue/white, etc.)
- Stats are visible on the hero card — player reads HP/Defense/Damage to confirm role
- Each hero card displays a small class icon in the corner (no text label — icon is sufficient)

---

## CLASS SYSTEM

Class defines a hero's combat role, stat profile, and default formation position.

| Class    | Role                                      | Stat Profile                      | Default Position |
|----------|-------------------------------------------|-----------------------------------|------------------|
| Warrior  | Balanced damage and durability            | Medium HP, Medium Def, Medium Dmg | Front            |
| Tank     | Absorbs damage, protects the front line   | High HP, High Def, Low Dmg        | Front            |
| Mage     | High spell damage, fragile               | Low HP, Low Def, High Dmg         | Back             |
| Archer   | Ranged damage dealer                      | Medium HP, Low Def, High Dmg      | Back             |
| Healer   | Sustains allies, support abilities        | Medium HP, Medium Def, Low Dmg    | Back             |
| Assassin | Burst damage, targets enemy back row      | Low HP, Low Def, Very High Dmg    | Front or Back    |

- Support abilities are NOT a standalone class — integrated into select heroes of other classes
- Assassins are the primary class whose innate ability bypasses the back row protection rule

---

## AFFINITY SYSTEM

Affinity defines a hero's elemental strengths, weaknesses, and status effect. Independent from class.

| Affinity | Strong vs | Weak vs | Status Effect                   |
|----------|-----------|---------|---------------------------------|
| Fire     | Earth     | Ice     | Burning (damage over time)      |
| Ice      | Fire      | Earth   | Freeze (delays enemy ultimates) |
| Earth    | Ice       | Fire    | Root (locks enemy targeting)    |
| Shadow   | Light     | Light   | Blind                           |
| Light    | Shadow    | Shadow  | Blind                           |

Shadow and Light deal increased damage TO EACH OTHER in both directions.
High risk, high reward matchup. Player must manage team **positioning** carefully.

Light and Shadow affinities are rarer than all others — their summon rates are half the normal rate within their rarity tier.

---

## TITLES

Assigned at summon — never earned through gameplay.
- All Legendary heroes receive a title.
- Select rare Epics receive a title.
- Common, Uncommon, Rare heroes: no title.

Generated from affinity + rarity combination. Examples:
- Legendary Shadow → "the Voidwalker"
- Legendary Light → "the Radiant"
- Legendary Fire → "the Ashen Crown"
- Legendary Ice → "the Eternal Frost"
- Legendary Earth → "the Earthshaker"
- Special Epic → "the Cursed" / "the Forgotten"

Each title carries a small innate passive stat bonus appropriate to its affinity.

---

## ABILITY SYSTEM

**Normal Abilities**
- Innate to the hero's class and affinity. Auto-cast during battle without player input.
- 2–3 per hero depending on rarity.
- Higher rarity = stronger version of same archetype ability.

**Ultimate Abilities**
- 1 per hero. Legendary and above get 2.
- Charges during battle via a visible energy bar on screen.
- Player taps the icon to trigger at chosen moment.
- Timing creates meaningful decisions — can interrupt enemy ultimates, chain with allies, finish boss phases.

No external ability equipping. No ability tree. No fusion crafting. All abilities are innate to the hero.

---

## FORMATION SYSTEM

- Player fields up to 5 heroes per battle
- Two rows: Front Row (up to 3 heroes) and Back Row (up to 3 heroes)
- Player chooses how to split: 3 front + 2 back, or 2 front + 3 back
- Formation is set before battle and cannot be changed mid-battle

**Row Mechanics:**
- Back row takes NO damage unless:
  - The front row has been fully wiped, OR
  - The enemy has an ability that specifically targets back row heroes, OR
  - An Assassin class enemy whose innate ability bypasses row protection
- Certain abilities target specific positions automatically:
  - Examples: back row target, lowest HP target, closest target
  - Player cannot manually select who to hit — targeting is determined by the ability's innate logic
- When the front row is wiped, heroes have different ranges:
  - Some back row heroes move forward toward enemies
  - Some stay in position — depends on the individual hero's range and design
  - This creates meaningful variation and rewards understanding your roster

**Early Progression:**
- Player begins the game with 1 hero
- Additional heroes are gifted through Campaign milestone clears:
  - Stage 1-3 clear → 2nd hero gifted
  - Stage 1-5 clear → 3rd hero gifted + Basic Summon unlocked
  - By Stage 2-1: player expected to have 4–5 heroes via gifts + early summons
  - First real formation decision occurs around Stage 2-3 when both rows can be filled

---

## BOND LINKS

Bond Links tie specific named heroes together by lore relationship — not by affinity or class.
Examples: academy rivals, master and apprentice pairs, legendary duo.

- When bonded heroes are deployed on the same team, all bond members receive a passive stat bonus
- Bonds work in pairs or trios
- Bonus scales with how many bond members are active simultaneously
- Bond pairings are discovered through collecting heroes — adds a collection incentive beyond rarity
- Full bond list TBD as hero roster is designed

---

## STAR RATING & LEVEL CAPS

Stars cost Awakening Shards. Each star unlocks the next 10 levels.
Stars and rarity ascension are two fully independent systems.

| Rarity    | Max Stars | Max Level |
|-----------|-----------|-----------|
| Common    | 3★        | 40        |
| Uncommon  | 4★        | 50        |
| Rare      | 5★        | 60        |
| Epic      | 6★        | 70        |
| Legendary | 7★        | 80        |
| Mythic    | 8★        | 90        |
| Ascended  | 9★        | 100       |

---

## RARITY ASCENSION PATH

Duplicate hero pulls automatically convert to Awakening Shards.
Shards are used for both star upgrades and rarity ascension.

| Origin Rarity (at summon) | Ascension Ceiling |
|--------------------------|-------------------|
| Common                   | Rare              |
| Uncommon                 | Epic              |
| Rare                     | Legendary         |
| Epic                     | Mythic            |
| Legendary                | Ascended          |

- Mythic requires: same Legendary hero summoned twice → merge → Mythic
- Ascended requires: same Mythic hero duplicated → merge → Ascended
- Ascended is only reachable from originally summoned Legendaries

---

## SUMMON SYSTEM

**Basic Summon** — available from Stage 1-5 clear.
**Advanced Summon** — unlocks at Campaign Region 3.

**Base Rates:**

Basic Summon:
| Rarity   | Unobtained | Obtained |
|----------|------------|----------|
| Common   | 55%        | 30%      |
| Uncommon | 28%        | 15%      |
| Rare     | 14%        | 8%       |
| Epic     | 3%         | 1.5%     |

Advanced Summon:
| Rarity    | Unobtained | Obtained |
|-----------|------------|----------|
| Rare      | 50%        | 28%      |
| Epic      | 35%        | 18%      |
| Legendary | 14%        | 6%       |

Light and Shadow affinities pull at half rate within their rarity tier on both banners.
Once a hero is obtained, its pull weight drops to the "Obtained" column — unobtained heroes of the same rarity fill the probability gap.

**Pity System:**

Basic Summon (Epic pity):
- Soft pity at pull 25 — Epic rate increases by base rate × 10 per pull
- Hard pity at pull 30 — Epic guaranteed

Advanced Summon (Legendary pity):
- Soft pity at pull 60 — Legendary rate increases by base rate × 10 per pull
- Hard pity at pull 80 — Legendary guaranteed

Pity counter carries over between sessions and never resets unless triggered.

**Wishlist**
- Player selects preferred heroes from the summon pool
- When Wishlist is active: 70% of eligible rarity pulls come from Wishlist heroes, 30% from general pool
- Gives meaningful targeting without eliminating surprise pulls

---

## THE 12 SYSTEMS

---

### SYSTEM 1 — CAMPAIGN

**World Structure:**
- World map with 5 regions at launch, each region has stages (1-1, 1-2 … 2-1, 2-2 …)
- Regions are purely thematic — distinct environments telling the story of the world
- No affinity restrictions — all heroes viable in all regions
- Difficulty scales through enemy level and ability complexity per region

| Region | Theme | Stages | System Unlocked at Completion |
|--------|-------|--------|-------------------------------|
| Region 1 — The Academy Grounds | The Academy and its surroundings. Tutorial region. | 12 | Basic Summon |
| Region 2 — The Shattered Lowlands | War-torn plains, ruins of an ancient conflict | 15 | Advanced Summon + Arena |
| Region 3 — The Thornwood | A dark ancient forest full of corrupted creatures | 15 | Affinity Towers + Guild |
| Region 4 — The Ashen Expanse | A vast volcanic wasteland, powerful enemies | 18 | World Boss hard tier |
| Region 5 — The Veilspire | A mysterious floating realm beyond the known world. Endgame. | 20 | Full endless content |

Total launch stages: 80. Expandable post-launch.

**Mechanics:**
- Animated auto-battle: normal abilities auto-cast, player taps ultimates when charged
- Ultimates affect battle outcome — player decisions matter
- Stage clear = permanent unlock, next stage opens
- Stage skip button available after first clear — costs Gold
- Passive idle rewards (Gold + XP) generated from last cleared stage, collected on app open
- Idle reward cap: 16 hours base. Upgradable via Elder Tree (see System 9)
- Campaign milestone clears unlock new game systems progressively

---

### SYSTEM 2 — ENDLESS TOWER
- Permanent, never resets
- Best heroes climb floor by floor, same battle system as Campaign
- Current highest floor = visible power benchmark for the player
- Every 10 floors: reward chest (Awakening Shards, Gold)
- Crystals generate passively at very slow trickle (present but not primary resource)
- No time limit, no resets — go back anytime after upgrading

---

### SYSTEM 3 — AFFINITY TOWERS
- 5 towers, one per affinity (Fire, Ice, Earth, Shadow, Light)
- Unlock at Region 3 Campaign milestone
- Floor-by-floor endless climbing — no stages, no resets
- Affinity-matched heroes perform dramatically better in their tower
- Every floor: small normal reward (Gold or Crystals)
- Every 10 floors: minor affinity-themed gear piece reward
- Milestone floors (one-time rewards):
  - Floor 50: Awakening Shards chest
  - Floor 100: Exclusive affinity title for player profile
  - Floor 200: Exclusive affinity-locked Common hero (unique, unobtainable elsewhere)
  - Floor 500: Exclusive affinity-locked Rare hero
- Per-tower leaderboard showing highest floor reached by all players
- Players who invested in a specific affinity roster can rank highly on that tower's leaderboard

---

### SYSTEM 4 — ARENA
- 5 attempts per day
- Frozen squad (stats locked at time of entry) fights other players' or AI-simulated squads
- Same animated battle system — player taps ultimates
- Matchmaking: rank-based, opponents within ±2 rank tiers. AI-simulated squads fill gaps
- Arena rank determines daily reward tier
- Exclusive heroes in Arena shop, unobtainable anywhere else
- Battle result shows exactly who died first and why — directly motivates roster improvement

---

### SYSTEM 5 — WORLD BOSS
- Permanent icon on main screen, always visible
- Multiple difficulty tiers — player selects based on current power
- Same battle system (normal abilities auto, ultimates player-triggered)
- Rewards proportional to HP dealt — even a failed hard attempt gives rewards
- 3 attempts per day (upgradable via Elder Tree at high tier node)
- Boss HP fully resets daily

---

### SYSTEM 6 — GUILD BOSS
- Guild-wide shared HP bar
- Each member gets 3 attacks per day
- All member damage accumulates on the shared bar
- On kill: next difficulty tier boss immediately appears
- End-of-day reward distribution based on each member's damage contribution percentage
- Guild Shop: rotating gear across all rarities + cosmetic items (student visual variants, title badges)
- Nothing in Guild Shop gates core progression — it accelerates it and adds cosmetics

---

### SYSTEM 7 — AWAKENING ALTAR
- Duplicate hero pulls automatically convert to Awakening Shards
- Shards used for: star upgrades (level cap increases) and rarity ascension
- Ascension follows the path table above
- The Ascension moment is a full-screen visual event
- Common pulls are never wasted — they can ascend and star up, just have a lower ceiling
- Two identical Legendaries merge into Mythic
- Two identical Mythics merge into Ascended

**Hero Reset**
- Any hero can be reset at any time
- Reset returns the hero to Level 1 and refunds all invested Gold and XP resources
- Cost: small Gold fee that scales with the hero's current level — higher level = higher fee
- Awakening Shards spent on stars and rarity ascension are NOT refunded — those are permanent
- Allows players to pivot their roster without punishing early investment mistakes

---

### SYSTEM 8 — GEAR FORGE
- 5 gear slots per hero: Weapon, Robe, Accessory, Relic, Sigil
- Each slot has a different stat focus:
  - Weapon → offense
  - Robe → defense
  - Accessory → utility
  - Relic → ability power
  - Sigil → wildcard passive effect
- Gear drops from all content (Campaign, Towers, Boss, Guild)
- Gear rarity availability tied strictly to stage/floor depth:
  - Early: Common frequently, Rare occasionally, Epic never, Mythic zero
  - Mid: Rare frequently, Epic occasionally, Mythic zero
  - Late: Epic frequently, Legendary occasionally, Mythic extremely rare
  - Endgame: Legendary more common, Mythic small but real chance
- Mythic gear has zero drop chance until late-game — no exceptions
- Gear upgraded with Gold
- Gear transfer: free between heroes at any time, no cost
- Gear salvage: any gear piece can be salvaged for a small Gold return
- Player decides which heroes wear what

---

### SYSTEM 9 — ELDER TREE
*Status: Confirmed. Full tree below. Inspired by AFK Arena and similar games.*

Branching passive upgrade tree bought with Gold.
Buffs economy and meta-progression ONLY — never hero HP, damage, or defense directly.
Two layers: Economy Branch (early game) and Academy Branch (mid-game unlock).

**Layer 1 — Economy Branch (available from early game):**
- +% Gold from all sources
- +% Awakening Shard drop rate
- Reduced Gear upgrade costs
- +% Daily Codex chest quality
- Reduced stage skip cost
- Idle reward cap upgrades:
  - Node 1: 16hr → 22hr
  - Node 2: 22hr → 28hr
  - Node 3: 28hr → 35hr
  - Node 4: 35hr → 45hr (hard cap — never exceeds 45 hours)

**Layer 2 — Academy Branch (unlocks at mid-game):**
- +1 Arena attempt per day
- +% Academy Grounds passive XP rate (bench training faster)
- Guild Boss attack cooldown reduced
- +% Guild Coin earnings
- +1 Wishlist slot (adds one extra hero to Wishlist)
- +1 World Boss attempt per day (high tier node)

---

### SYSTEM 10 — DAILY CODEX
- Resets daily at fixed time
- 6 tasks drawn from different systems each day
  - Examples: "Win 2 Arena matches," "Climb 5 Affinity Tower floors," "Attack the World Boss," "Upgrade 1 Gear piece," "Collect idle rewards," "Summon once"
- Complete all 6: Codex Chest (mixed currencies, guaranteed Awakening Shards)
- Weekly Codex: larger tasks, guaranteed Advanced Summon pull
- Tells the player what to do each session — prevents aimlessness, touches all systems daily

---

### SYSTEM 11 — GUILD
- Social layer housing System 6 (Guild Boss)
- Max guild size: 30 members
- Creating a guild costs a one-time Gold fee (prevents spam guilds)
- Joining: open guilds joinable freely; closed guilds require leader approval
- Guild XP earned from Boss kills. Guild level benefits:
  - Every level: +1% Guild Coin earnings for all members
  - Level 5: Guild Shop adds one extra item slot
  - Level 10: All members get +1 Guild Boss attack per day
  - Level 20: Guild Shop refreshes twice daily instead of once
  - Level 30: Exclusive cosmetic guild badge unlocked
- Guild Shop (rotating gear + cosmetics)
- Guild leaderboard
- Joining an active guild is a meaningful advantage but never required for solo progression

---

### SYSTEM 12 — ACADEMY GROUNDS

- All heroes not in the active squad are considered "in training" at the Academy
- Bench heroes passively accumulate XP at 15% of the rate the active squad earns in combat
- Cap: bench heroes cannot exceed the level of the lowest active squad member via passive training — they can only catch up, never surpass
- Prevents newly pulled heroes from being useless due to level gap
- Exact passive rate upgradable via Elder Tree (Academy Branch)
- Fits the Arcane Academy theme: the Academy is always training its students

---

## ACHIEVEMENT SYSTEM

One-time rewards only. Each achievement grants Premium Crystals on first completion.

**Progression:**
- First hero summoned
- First Legendary pulled
- First Ascended hero
- Reach Campaign Region 3
- Reach Campaign Region 5
- Clear 100 Endless Tower floors
- Clear Floor 50 on any Affinity Tower

**Collection:**
- Own 10 heroes
- Own 25 heroes
- Own 50 heroes
- Complete a full affinity roster (at least one hero of each affinity)
- Own a hero of every class

**Combat:**
- Win 10 Arena matches
- Defeat World Boss on Hard difficulty
- Deal 1,000,000 damage to Guild Boss in a single attack

**Gear:**
- Equip a full 5-slot gear set on one hero
- Obtain a Legendary gear piece
- Obtain a Mythic gear piece

**Social:**
- Join a guild
- Participate in 10 Guild Boss attacks
- Reach Guild Level 10

---

## CURRENCIES

| Currency         | Primary Source                                                                    | Primary Sink                                          |
|------------------|-----------------------------------------------------------------------------------|-------------------------------------------------------|
| Gold             | Campaign idle, stage clears, gear salvage                                         | Gear upgrades, Elder Tree, stage skip, guild creation, hero reset |
| Crystals         | Tower trickle, login streaks, achievements                                        | Basic Summon                                          |
| Premium Crystals | IAP, campaign milestones, tower milestones, Weekly Codex, login streaks, achievements | Advanced Summon                                   |
| Awakening Shards | Duplicates, Tower chests                                                          | Star upgrades, rarity ascension                       |
| Arena Tokens     | Arena daily rewards                                                               | Arena shop (exclusive heroes)                         |
| Guild Coins      | Guild Boss participation                                                          | Guild Shop (gear + cosmetics)                         |

---

## PREMIUM CRYSTAL FREE SOURCES (non-IAP)
- Campaign first-clear milestones (one-time)
- Endless Tower milestone floors (one-time)
- Affinity Tower milestone floors (one-time)
- Daily Codex weekly chest (small recurring amount)
- Login streaks: Day 7, Day 14, Day 30
- Achievement system completions
- Seasonal events (post-launch)

---

## WHAT IS NOT YET DECIDED
- Bond Links full pairing list (depends on hero roster design)
- Exact soft pity rate increase curve beyond the base formula
- Hero Reset Gold fee scaling formula
- Currency final names (keeping standard names until something thematic is found)
- Exact dungeon stage count and reward tables
- Achievement Premium Crystal reward amounts per tier
- Guild max level cap
- Elder Tree exact Gold costs per node
- Full hero roster (names, classes, affinities, bond pairings)

---

*End of Document — v5*
*Next session: continue design or begin codebase planning.*
