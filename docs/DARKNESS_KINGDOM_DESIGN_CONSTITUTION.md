# Darkness Kingdoms — Design Constitution

## 1. Authority

This document is the highest-level design authority for the project identity. It prevents project drift.

When future prompts, code changes, UI work, asset generation, lore writing, or system naming conflict with this document, this document wins unless the owner explicitly updates it.

## 2. Locked Game Identity

**Title:** Darkness Kingdoms

**Genre:** Mobile portrait idle RPG / hero collector / gacha, inspired by the AFK Arena core loop.

**Tone:** Dark fantasy, gothic royalty, kingdom wars, ancient magic, abyssal power, cursed bloodlines, ruined realms, and premium mobile RPG spectacle.

**Player Role:** The player is the resurrected ruler of a fallen dark kingdom, returning to rebuild power, summon heroes, reclaim lost authority, and confront rival kingdoms.

## 3. Inspiration Boundary

The game may use AFK Arena-style structure:

- 5-hero teams
- front/back formation
- mostly auto combat
- player-triggered ultimates
- idle rewards
- campaign chapter maps
- progression walls
- hero collection
- summoning/gacha
- duplicate shard/ascension logic
- gear progression
- arena
- guild
- faction/kingdom towers
- world boss
- daily/weekly tasks
- long-term account progression

The game must not copy AFK Arena's protected expression:

- character names
- character designs
- faction names
- lore text
- exact UI screens
- icons
- artwork
- dialogue
- skill names/descriptions
- exact economy numbers if they are recognizably copied

Rule: **Clone the player loop, not the identity.**

## 4. World Rule

Darkness Kingdoms is not one kingdom. It is a world of multiple kingdoms.

At launch, the world has **five major kingdoms/factions**. They are based on ancient political kingdoms, corrupted bloodlines, royal identity, and dark magical themes, not simple elemental categories only.

Not every kingdom must be physically dark. “Darkness Kingdoms” is the title identity and marketing hook, while the world can include varied cultures, regions, and factions.

## 5. Current System Direction

Keep these major systems:

- Campaign
- Roster / Heroes
- Summon
- Gear
- Arena
- Guild
- Towers
- World Boss
- Elder Tree equivalent
- Codex / daily task equivalent

Do not remove major systems yet. Rename academy-related systems only.

## 6. Naming Rule

Avoid academy/school/student/classroom/lesson terminology unless explicitly approved.

Preferred vocabulary:

- kingdom
- throne
- crown
- royal
- abyss
- shadow
- void
- curse
- bloodline
- relic
- guild
- tower
- realm
- ancient
- oath
- dominion
- fallen
- resurrected

## 7. Visual Identity

The visual identity is:

**Premium Gothic Dark Fantasy UI**

Core visual pillars:

- black depth
- royal purple magic
- antique gold trim
- crimson danger/event accents
- dark carved stone
- gothic panels
- ornate borders
- crystal resources
- premium gacha presentation

The UI should feel expensive, deep, royal, ancient, and dangerous.

## 8. UI Rule

Use a reusable Darkness Kingdoms UI kit before redesigning every screen individually.

Reusable components should include:

- top resource bar
- bottom navigation bar
- side panel buttons
- premium panel
- ornate button
- icon button
- hero card
- reward card
- tab button
- notification badge
- modal overlay

## 9. Screen Priority

Development priority:

1. Identity rename visible text
2. Reusable UI kit
3. Main Hub redesign
4. Campaign chapter map shell
5. Summon screen redesign
6. Heroes/Roster redesign
7. Campaign battle polish
8. Guild / Towers / World Boss / Elder Tree / Shop polish
9. Economy and monetization pass

## 10. Asset Rule

Assets must be designed as reusable layers, not random full-screen clutter.

Preferred asset groups:

- top panel frame
- bottom panel frame
- side panel frame
- large content frame
- small card frame
- ornate button states
- icon frames
- kingdom/faction icons
- chapter backgrounds
- hero portraits
- reward icons
- FX overlays

## 11. Implementation Rule

For code work:

- small PRs only
- one screen or one subsystem per PR
- fresh Codex task/branch after each merged PR
- no broad multi-screen visual prompts unless the UI kit is stable
- preserve gameplay behavior unless the task explicitly changes it

## 12. Current Locked First Priority

The first priority screen is **Main Hub**.

The second priority is **Campaign**, because the campaign must use chapter map screens, not plain stage lists.
