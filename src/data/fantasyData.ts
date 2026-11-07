/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterClass, CharacterRace, Alignment, CharacterAbility } from '../types/character';

export const FANTASY_NAMES: Record<CharacterRace, { firstNames: string[]; surnames: string[] }> = {
  'High Elf': {
    firstNames: [
      'Aeloria', 'Faelan', 'Sylas', 'Vaelin', 'Eliandor', 'Lyari', 'Theron',
      'Ilyana', 'Valerius', 'Kaelen', 'Alestria', 'Caelum', 'Seraphina', 'Eryndor'
    ],
    surnames: [
      'Dawnwhisper', 'Silverglen', 'Starweaver', 'Moonfall', 'Sunstrider',
      'Silverleaf', 'Emberveil', 'Spellweaver', 'Silvershadow', 'Aetherium'
    ],
  },
  'Wood Elf': {
    firstNames: [
      'Tanis', 'Kaelen', 'Brynn', 'Rowan', 'Aerith', 'Corin', 'Lyra',
      'Faenor', 'Sylva', 'Bram', 'Talia', 'Oakhaven', 'Fenris', 'Syrin'
    ],
    surnames: [
      'Oakenshield', 'Briarwood', 'Wildrunner', 'Fernhollow', 'Hawkwing',
      'Thornvale', 'Mosstrider', 'Shadowbranch', 'Swiftbreeze', 'Deepwood'
    ],
  },
  'Mountain Dwarf': {
    firstNames: [
      'Thorgar', 'Baelor', 'Kragan', 'Dwalin', 'Brakka', 'Vondor', 'Gimli',
      'Thorin', 'Morgrim', 'Durnik', 'Hulda', 'Bruna', 'Thrum', 'Galdur'
    ],
    surnames: [
      'Ironbreaker', 'Stonehammer', 'Deepdelver', 'Forgebeard', 'Anvilguard',
      'Cragbrow', 'Bronzevein', 'Mountainpeak', 'Granitefist', 'Goldhand'
    ],
  },
  'Iron Dwarf': {
    firstNames: [
      'Rorik', 'Durgan', 'Kaelith', 'Bramur', 'Varn', 'Drayke', 'Garrick',
      'Brandur', 'Kord', 'Steelmar', 'Hrogar', 'Skulda', 'Vraka', 'Korg'
    ],
    surnames: [
      'Ironvein', 'Steelmantle', 'Cinderforge', 'Blackanvil', 'Furnaceweaver',
      'Moltenblood', 'Smeltborn', 'Gavelgloom', 'Oreshield', 'Pyrecrest'
    ],
  },
  'Human': {
    firstNames: [
      'Alden', 'Caelan', 'Garrick', 'Leona', 'Isolde', 'Gideon', 'Cassian',
      'Valeria', 'Roderic', 'Rowena', 'Theron', 'Maeve', 'Lucian', 'Kael'
    ],
    surnames: [
      'Stormguard', 'Blackwood', 'Hawthorne', 'Ashford', 'Valencrest',
      'Crownhallow', 'Winterbourne', 'Silverlake', 'Vanguard', 'Ravencrest'
    ],
  },
  'Tiefling': {
    firstNames: [
      'Malakor', 'Zephyra', 'Vespera', 'Azrael', 'Xander', 'Kallista', 'Bane',
      'Ravena', 'Ignis', 'Nyx', 'Dorian', 'Lilith', 'Moros', 'Solstice'
    ],
    surnames: [
      'Hellforged', 'Shadowhorn', 'Ashborne', 'Brimstone', 'Nethergaze',
      'Pyreclaw', 'Cinderveil', 'Duskborn', 'Voidtouch', 'Sinweaver'
    ],
  },
  'Dragonborn': {
    firstNames: [
      'Drakon', 'Balthazar', 'Vrakor', 'Ignis', 'Rhogar', 'Zarkon', 'Kava',
      'Sora', 'Tarhun', 'Medrash', 'Donaar', 'Nala', 'Garrath', 'Vermithrax'
    ],
    surnames: [
      'Scaleguard', 'Pyrebreath', 'Stormclaw', 'Wyrmbreaker', 'Drakeblood',
      'Cinderflame', 'Ironscale', 'Emberfang', 'Thunderhide', 'Dragonroar'
    ],
  },
  'Halfling': {
    firstNames: [
      'Pip', 'Milo', 'Rosie', 'Finnick', 'Barnaby', 'Tilly', 'Clover',
      'Bramwell', 'Peregrin', 'Lilibet', 'Corbin', 'Eldo', 'Bree', 'Kip'
    ],
    surnames: [
      'Bramblefoot', 'Tealeaf', 'Goodbarrel', 'Swiftstep', 'Underhill',
      'Greenbottle', 'Highhill', 'Copperkettle', 'Butterbur', 'Lightfoot'
    ],
  },
  'Half-Orc': {
    firstNames: [
      'Grommash', 'Vorg', 'Rondar', 'Kragh', 'Thokk', 'Zul', 'Karg',
      'Morgath', 'Brakka', 'Valka', 'Garruk', 'Shump', 'Dench', 'Grim'
    ],
    surnames: [
      'Bonecleaver', 'Ironjaw', 'Bloodfang', 'Skullcrusher', 'Warcaller',
      'Ashenscar', 'Thundergrip', 'Stonebreaker', 'Gorehowl', 'Doomfist'
    ],
  },
  'Aasimar': {
    firstNames: [
      'Auriel', 'Celestia', 'Ezekiel', 'Uriel', 'Liora', 'Zephyr', 'Castiel',
      'Seraph', 'Solomon', 'Luminara', 'Evander', 'Gabriel', 'Theia', 'Zion'
    ],
    surnames: [
      'Dawnbringer', 'Radiantstar', 'Silverwing', 'Heavenguard', 'Sunbeam',
      'Aurelius', 'Haloheart', 'Crownoflight', 'Elysian', 'Starlight'
    ],
  },
  'Gnome': {
    firstNames: [
      'Bimble', 'Fizban', 'Tinker', 'Zook', 'Gimble', 'Nissa', 'Boddynock',
      'Wrenn', 'Dimble', 'Pippa', 'Orryn', 'Kaz', 'Nyx', 'Flick'
    ],
    surnames: [
      'Cogspinner', 'Sparkwhistle', 'Gimcrack', 'Quickgear', 'Springvalve',
      'Gemfinder', 'Moonshadow', 'Clockwise', 'Bafflestone', 'Tinkerpot'
    ],
  },
};

export const EPITHETS: string[] = [
  'the Undaunted',
  'the Spellforged',
  'the Silent Whisper',
  'the Stormcaller',
  'the Ironheart',
  'the Voidgazer',
  'the Star-Eyed',
  'of the Silver Grove',
  'Bane of Wyrms',
  'the Unbroken',
  'the Flamekeeper',
  'the Shadowdancer',
  'the Sun-Blessed',
  'the Frostborn',
  'the Wandering Blade',
  'Seeker of Truths',
  'the Ashen Phoenix',
  'the Oathbound',
  'the Swift-Handed',
  'of the High Spire',
];

export interface ClassDefinition {
  name: CharacterClass;
  tagline: string;
  description: string;
  primaryStat: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  hitDie: number; // e.g. 1d6, 1d8, 1d10, 1d12
  armorClassBase: number;
  subclasses: string[];
  themeColor: {
    badge: string;
    text: string;
    bg: string;
    border: string;
    accent: string;
  };
  weapons: { name: string; type: string; damage: string; property: string }[];
  armors: { name: string; type: string; defense: string }[];
  trinkets: { name: string; origin: string; effect: string }[];
  abilities: CharacterAbility[];
}

export const CLASS_DEFINITIONS: Record<CharacterClass, ClassDefinition> = {
  Mage: {
    name: 'Mage',
    tagline: 'Wielder of esoteric leylines and arcane mysteries',
    description: 'Scholars of the primordial elements capable of reshaping reality through intellect and runic formula.',
    primaryStat: 'intelligence',
    hitDie: 6,
    armorClassBase: 12,
    subclasses: ['Pyromancer', 'Chronomancer', 'Abjurer', 'Weavemaster', 'Cryomancer'],
    themeColor: {
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      text: 'text-indigo-400',
      bg: 'from-indigo-950/60 via-purple-950/30 to-slate-950',
      border: 'border-indigo-500/30',
      accent: '#818cf8',
    },
    weapons: [
      { name: 'Runed Star-Glass Staff', type: 'Staff', damage: '1d6 Bludgeoning + 1d4 Arcane', property: 'Focus, Versatile' },
      { name: 'Crystal-Edged Wand', type: 'Wand', damage: '1d4 Piercing + 1d6 Force', property: 'Finesse, Spell Focus' },
      { name: 'Tome of the Celestial Comet', type: 'Grimoire', damage: '2d4 Radiant Burst', property: 'Ritual, Ranged' },
      { name: 'Spellfire Athame', type: 'Dagger', damage: '1d4 Piercing + 1d6 Fire', property: 'Finesse, Light' },
    ],
    armors: [
      { name: 'Weave-Spun Robes of the Archmagus', type: 'Arcane Robe', defense: 'AC 13 + INT mod' },
      { name: 'Astral Silk Tunic', type: 'Cloth', defense: 'AC 12 + DEX mod' },
      { name: 'Runic Stole of Safeguarding', type: 'Warded Vestment', defense: 'AC 14 (Warded)' },
    ],
    trinkets: [
      { name: 'Pocket Astrolabe of Eternity', origin: 'Gifted by a dying stellar sphinx', effect: 'Advantage on Arcana and time perception' },
      { name: 'Resonating Mana Prism', origin: 'Mined from the Core of Mount Aethel', effect: 'Stores one bonus spell slot each dawn' },
      { name: 'Vial of Bottled Aurora', origin: 'Harvested from northern skies', effect: 'Illuminates invisible ethereal creatures' },
    ],
    abilities: [
      { name: 'Arcane Singularity', type: 'Spell', cost: '1 Slot (3rd)', description: 'Crushes gravitational fabric at a point, pulling all foes into a 20ft vortex of pure force.' },
      { name: 'Temporal Blink', type: 'Technique', cost: 'Bonus Action', description: 'Instantly teleports up to 30 feet, leaving behind an afterimage that absorbs the next incoming blow.' },
      { name: 'Leyline Surge', type: 'Passive', cost: 'Innate', description: 'Whenever a spell crits, roll a d6 to instantly recharge a used spell slot of that level.' },
    ],
  },
  Rogue: {
    name: 'Rogue',
    tagline: 'Silent stalker of moonlit rooftops and forgotten shadows',
    description: 'Masters of stealth, infiltration, and lethal precision who strike from the unlit corners of the world.',
    primaryStat: 'dexterity',
    hitDie: 8,
    armorClassBase: 14,
    subclasses: ['Shadowblade', 'Assassin', 'Arcane Trickster', 'Phantom Thief', 'Swashbuckler'],
    themeColor: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      text: 'text-emerald-400',
      bg: 'from-emerald-950/60 via-teal-950/30 to-slate-950',
      border: 'border-emerald-500/30',
      accent: '#34d399',
    },
    weapons: [
      { name: 'Twin Serpent-Fang Daggers', type: 'Daggers', damage: '1d4+DEX Piercing + 1d6 Poison', property: 'Finesse, Light, Thrown' },
      { name: 'Midnight Stalker Crossbow', type: 'Hand Crossbow', damage: '1d6+DEX Piercing', property: 'Ammunition, Silent, Range 80/320' },
      { name: 'Whispering Rapier', type: 'Rapier', damage: '1d8+DEX Piercing', property: 'Finesse, Bleed on Crit' },
      { name: 'Concealed Wrist-Blades', type: 'Exotic Light', damage: '1d4 Slashing', property: 'Hidden, Surprise Advantage' },
    ],
    armors: [
      { name: 'Shadowsilk Gambeson', type: 'Light Leather', defense: 'AC 14 + DEX mod' },
      { name: 'Supple Wyvern-Hide Jerkin', type: 'Studded Leather', defense: 'AC 15 + DEX mod' },
      { name: 'Chameleon Cloak of the Mist', type: 'Stealth Weave', defense: 'AC 13 (Silent steps)' },
    ],
    trinkets: [
      { name: 'Skeleton Key of the Thieves Guildmaster', origin: 'Passed through seven generations of lockpicks', effect: 'Advantage when bypassing mundane and magical locks' },
      { name: 'Coin of the Blind Fate', origin: 'Found in the mouth of a guild founder', effect: 'Allows re-rolling one failed Dexterity saving throw per day' },
      { name: 'Vial of Ghost-Mist Extract', origin: 'Distilled marsh gas from the Sunken Crypts', effect: 'Can vanish into smoke as a reaction to danger' },
    ],
    abilities: [
      { name: 'Shadow Step', type: 'Technique', cost: '1 Ki / Cunning', description: 'Melts into one shadow and emerges from another up to 40 feet away with guaranteed advantage on the next attack.' },
      { name: 'Precision Sever', type: 'Technique', cost: 'Full Turn', description: 'Targets an enemy vital artery, dealing 4d6 bonus sneak attack damage and causing grievous bleeding.' },
      { name: 'Evasion Reflex', type: 'Passive', cost: 'Innate', description: 'Takes zero damage on successful Dexterity saves and only half damage on failed saves.' },
    ],
  },
  Warrior: {
    name: 'Warrior',
    tagline: 'Indomitable bastion of martial supremacy and raw steel',
    description: 'Frontline champions of unmatched combat stamina, capable of wielding any armament with lethal mastery.',
    primaryStat: 'strength',
    hitDie: 10,
    armorClassBase: 16,
    subclasses: ['Battlemaster', 'Berserker', 'Dreadnought', 'Champion', 'Echo Knight'],
    themeColor: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      text: 'text-rose-400',
      bg: 'from-rose-950/60 via-amber-950/30 to-slate-950',
      border: 'border-rose-500/30',
      accent: '#fb7185',
    },
    weapons: [
      { name: 'Meteorite Greathammer', type: 'Maul', damage: '2d6+STR Bludgeoning', property: 'Heavy, Two-Handed, Crushing' },
      { name: 'Folded Damascus Claymore', type: 'Greatsword', damage: '2d6+STR Slashing', property: 'Heavy, Cleave, Reach' },
      { name: 'Gilded Sun-Halberd', type: 'Polearm', damage: '1d10+STR Slashing', property: 'Reach, Heavy, Sweep' },
      { name: 'War-Forged Broadsword & Tower Shield', type: 'One-Handed + Shield', damage: '1d8+STR Slashing (+2 AC)', property: 'Versatile, Defensive' },
    ],
    armors: [
      { name: 'Full Adamantine Field Plate', type: 'Heavy Plate', defense: 'AC 18 (Immune to Crits)' },
      { name: 'Dragon-Forged Splint Armor', type: 'Splint Mail', defense: 'AC 17 + Fire Resist' },
      { name: 'Battered Veteran Chain Hauberk', type: 'Chain Mail', defense: 'AC 16' },
    ],
    trinkets: [
      { name: 'Whetstone of the Blood-Singers', origin: 'Chipped from the monolith of siege victory', effect: 'Grants +1 damage bonus to any weapon honed with it' },
      { name: 'War Horn of the High Bastion', origin: 'Carved from an ancient mammoth tusk', effect: 'Rallies all allies within 60ft with temporary hit points' },
      { name: 'Engraved Iron Dog Tag', origin: 'A keepsake from the Last Stand at Red Ridge', effect: 'Cannot be frightened or shaken in combat' },
    ],
    abilities: [
      { name: 'Action Surge', type: 'Technique', cost: '1 / Encounter', description: 'Pushes past mortal physical limits to immediately take an additional action this turn.' },
      { name: 'Sundering Cleave', type: 'Technique', cost: 'Attack Action', description: 'Strikes in a wide arc hitting up to three adjacent enemies for weapon damage plus knockdown.' },
      { name: 'Second Wind', type: 'Passive', cost: 'Bonus Action', description: 'Regains 1d10 + Level hit points when below half health once per rest.' },
    ],
  },
  Paladin: {
    name: 'Paladin',
    tagline: 'Holy crusader bound by unbreakable divine vows',
    description: 'Armored sentinels who channel celestial wrath and restorative grace through unyielding devotion.',
    primaryStat: 'charisma',
    hitDie: 10,
    armorClassBase: 17,
    subclasses: ['Oath of Devotion', 'Oath of Vengeance', 'Oath of the Ancients', 'Oath of the Crown'],
    themeColor: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      text: 'text-amber-400',
      bg: 'from-amber-950/60 via-yellow-950/30 to-slate-950',
      border: 'border-amber-500/30',
      accent: '#fbbf24',
    },
    weapons: [
      { name: 'Dawn-Forged Holy Avenger', type: 'Longsword', damage: '1d8+STR Slashing + 2d8 Radiant', property: 'Versatile, Holy Aura' },
      { name: 'Silvered Flail of Judgment', type: 'Flail', damage: '1d8+STR Bludgeoning + 1d6 Radiant', property: 'Disarm, Heavy' },
      { name: 'Sun-Piercing Lance', type: 'Lance', damage: '1d12+STR Piercing', property: 'Reach, Mounted' },
    ],
    armors: [
      { name: 'Sanctified Aegis Plate', type: 'Full Plate', defense: 'AC 19 (Radiant Glow)' },
      { name: 'Solaris Crested Cuirass', type: 'Half-Plate', defense: 'AC 17 + DEX' },
      { name: 'Blessed Mail of the Sun', type: 'Heavy Chain', defense: 'AC 16' },
    ],
    trinkets: [
      { name: 'Reliquary of the First Dawn', origin: 'Contains holy incense blessed by the High Hierophant', effect: 'Emits a 10ft aura of disease immunity' },
      { name: 'Gilded Seal of Absolution', origin: 'Pendant worn by saints of old', effect: 'Can cleanse poison or cursed afflictions with a touch' },
      { name: 'Chalice of Eternal Faith', origin: 'Kept in cathedral vaults for a century', effect: 'Purifies any liquid poured into it' },
    ],
    abilities: [
      { name: 'Divine Smite', type: 'Spell', cost: '1 Slot (Any)', description: 'Channels holy vengeance into the weapon impact, inflicting 2d8 to 5d8 radiant damage against darkness.' },
      { name: 'Lay on Hands', type: 'Technique', cost: 'Action', description: 'Restores a pool of hit points up to 5 times the Paladin’s level to any ally.' },
      { name: 'Aura of Courage', type: 'Aura', cost: 'Always Active', description: 'Allies within 10 feet cannot be frightened and gain +3 to all saving throws.' },
    ],
  },
  Ranger: {
    name: 'Ranger',
    tagline: 'Pathfinder and master marksman of uncharted frontiers',
    description: 'Hunters and wilderness scouts attuned to the natural world, lethal with bow and twin blades.',
    primaryStat: 'dexterity',
    hitDie: 10,
    armorClassBase: 15,
    subclasses: ['Gloom Stalker', 'Beast Master', 'Hunter', 'Horizon Walker', 'Fey Wanderer'],
    themeColor: {
      badge: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      text: 'text-teal-400',
      bg: 'from-teal-950/60 via-emerald-950/30 to-slate-950',
      border: 'border-teal-500/30',
      accent: '#2dd4bf',
    },
    weapons: [
      { name: 'Yew-Wood Recurve Longbow', type: 'Longbow', damage: '1d8+DEX Piercing', property: 'Range 150/600, Two-Handed' },
      { name: 'Twin Feathered Scimitars', type: 'Scimitars', damage: '1d6+DEX Slashing', property: 'Finesse, Light' },
      { name: 'Stalker’s Sniping Heavy Bow', type: 'Compound Bow', damage: '1d10 Piercing', property: 'Heavy, Piercing Arrow' },
    ],
    armors: [
      { name: 'Forest-Stalking Leather Brigandine', type: 'Studded Leather', defense: 'AC 14 + DEX' },
      { name: 'Treated Dire-Wolf Pelts', type: 'Hide', defense: 'AC 13 + DEX (Cold Resist)' },
      { name: 'Leaf-Weave Cloak', type: 'Camo Weave', defense: 'AC 15' },
    ],
    trinkets: [
      { name: 'Compass of the North Star', origin: 'Crafted from meteoric lodestone', effect: 'Always points directly to safety and reveals hidden trails' },
      { name: 'Falconer’s Bone Whistle', origin: 'Carved from an eagle talons', effect: 'Calls forth a scout hawk to map the terrain ahead' },
      { name: 'Quiver of Endless Brambles', origin: 'Blessed by dryads of the deep glade', effect: 'Arrows sprout entangling vines on impact' },
    ],
    abilities: [
      { name: 'Hunter’s Mark', type: 'Spell', cost: '1 Slot (1st)', description: 'Focuses quarry sight, adding 1d6 damage to all strikes against the target and impossible to lose track.' },
      { name: 'Volley of Thorns', type: 'Technique', cost: 'Action', description: 'Fires a storm of arrows bursting into spectral thorns, damaging all enemies in a 30ft cone.' },
      { name: 'Wilderness Stride', type: 'Passive', cost: 'Innate', description: 'Moves unhindered through nonmagical difficult terrain and leaves no tracks behind.' },
    ],
  },
  Cleric: {
    name: 'Cleric',
    tagline: 'Mortal vessel of divine miracle and sanctified fury',
    description: 'Devout conduits of deities who heal the mortally wounded and smite heretics with radiant sunlight.',
    primaryStat: 'wisdom',
    hitDie: 8,
    armorClassBase: 16,
    subclasses: ['Life Domain', 'War Domain', 'Tempest Domain', 'Light Domain', 'Grave Domain'],
    themeColor: {
      badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      text: 'text-cyan-400',
      bg: 'from-cyan-950/60 via-blue-950/30 to-slate-950',
      border: 'border-cyan-500/30',
      accent: '#22d3ee',
    },
    weapons: [
      { name: 'Sun-Emblazoned Morningstar', type: 'Morningstar', damage: '1d8+STR Piercing + 1d6 Radiant', property: 'Versatile' },
      { name: 'Sanctified War Mace & Crest Shield', type: 'Mace', damage: '1d6+STR Bludgeoning (+2 AC)', property: 'Defensive' },
      { name: 'Divine Radiant Scepter', type: 'Scepter', damage: '1d6 Force + 1d8 Radiant', property: 'Spell Focus' },
    ],
    armors: [
      { name: 'Hallowed Silver Chainmail', type: 'Heavy Chain', defense: 'AC 16' },
      { name: 'Vestments of the Solar Maiden', type: 'Scale Mail', defense: 'AC 15 + DEX' },
      { name: 'Sanctuary Ward Cloak', type: 'Blessed Garb', defense: 'AC 17' },
    ],
    trinkets: [
      { name: 'Holy Relic of the Dawn Seraph', origin: 'Preserved feather from an archangel’s wing', effect: 'Emits gentle warmth that stabilizes dying companions' },
      { name: 'Silver Censer of Sanctity', origin: 'Used during high solstice ceremonies', effect: 'Wards off undead and fiends within 20 feet' },
      { name: 'Prayer Beads of the Martyr', origin: 'Carved from petrified cedar', effect: 'Grants advantage on all Death saving throws' },
    ],
    abilities: [
      { name: 'Solar Radiance Burst', type: 'Spell', cost: 'Channel Divinity', description: 'Dispels all magical darkness in 30ft and bathes all enemies in searing radiant fire.' },
      { name: 'Healing Word of Grace', type: 'Spell', cost: 'Bonus Action', description: 'Calls down divine rejuvenation, restoring 1d8 + WIS hit points to a creature within 60ft.' },
      { name: 'Turn Undead', type: 'Technique', cost: 'Action', description: 'Forces all nearby undead creatures to flee in terror for 1 minute or crumble to dust.' },
    ],
  },
  Druid: {
    name: 'Druid',
    tagline: 'Guardian of the primal earth and shapeshifter of the wild',
    description: 'Shamans attuned to the elemental heartbeat of the world, commanding flora, fauna, and storms.',
    primaryStat: 'wisdom',
    hitDie: 8,
    armorClassBase: 13,
    subclasses: ['Circle of the Moon', 'Circle of Spores', 'Circle of the Land', 'Circle of Stars'],
    themeColor: {
      badge: 'bg-lime-500/10 text-lime-400 border-lime-500/20',
      text: 'text-lime-400',
      bg: 'from-lime-950/60 via-emerald-950/30 to-slate-950',
      border: 'border-lime-500/30',
      accent: '#a3e635',
    },
    weapons: [
      { name: 'Living Ash-Wood Staff', type: 'Staff', damage: '1d6 Bludgeoning + Sprout Vines', property: 'Focus, Shillelagh' },
      { name: 'Bone-Carved Primal Sickle', type: 'Sickle', damage: '1d4 Slashing + 1d4 Nature', property: 'Light, Finesse' },
      { name: 'Thorn-Whip Vine', type: 'Exotic Natural', damage: '1d6 Piercing', property: 'Pull 10ft, Reach' },
    ],
    armors: [
      { name: 'Ironwood Bark Cuirass', type: 'Natural Armor', defense: 'AC 14 + DEX' },
      { name: 'Hydra-Scale Tunic', type: 'Scale (Non-metal)', defense: 'AC 15 + DEX' },
      { name: 'Primal Moss Mantle', type: 'Hide', defense: 'AC 13' },
    ],
    trinkets: [
      { name: 'Ever-Blooming Lunar Orchid', origin: 'Plucked from the moonlit canopy of the Elder Glade', effect: 'Can be eaten once per week to fully restore all wounds' },
      { name: 'Petrified Oak Acorn', origin: 'From the first tree that sprouted in creation', effect: 'Communicates feelings and warnings from local flora' },
      { name: 'Feather of the Primal Phoenix', origin: 'Gifted by a beast of summer', effect: 'Grants resistance to natural fire and ice' },
    ],
    abilities: [
      { name: 'Wild Shape', type: 'Technique', cost: 'Bonus Action', description: 'Shapeshifts into a ferocious Dire Wolf, Giant Bear, or Eagle, adopting its speed, claws, and hit points.' },
      { name: 'Call Lightning', type: 'Spell', cost: '1 Slot (3rd)', description: 'Summons a roiling thunderstorm overhead, calling down 3d10 thunderbolts each turn.' },
      { name: 'Barkskin Ward', type: 'Passive', cost: 'Innate', description: 'Skin hardens like ancient oak; Armor Class cannot fall below 16.' },
    ],
  },
  Warlock: {
    name: 'Warlock',
    tagline: 'Pact-bound seeker of forbidden and forgotten patrons',
    description: 'Sorcerers who traded service to eldritch horrors or archfey for devastating otherworldly hexes.',
    primaryStat: 'charisma',
    hitDie: 8,
    armorClassBase: 13,
    subclasses: ['The Fiend', 'The Great Old One', 'The Archfey', 'The Hexblade', 'The Undead'],
    themeColor: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      text: 'text-purple-400',
      bg: 'from-purple-950/60 via-fuchsia-950/30 to-slate-950',
      border: 'border-purple-500/30',
      accent: '#c084fc',
    },
    weapons: [
      { name: 'Cursed Obsidian Hex-Blade', type: 'Pact Blade', damage: '1d8+CHA Slashing + 1d6 Necrotic', property: 'Finesse, Cursed Bond' },
      { name: 'Void-Glass Focus Rod', type: 'Rod', damage: '1d6 Force + Eldritch Blast', property: 'Spell Focus' },
      { name: 'Eldritch Scythe of Souls', type: 'Scythe', damage: '2d4 Slashing + Life Drain', property: 'Two-Handed, Reach' },
    ],
    armors: [
      { name: 'Shadow-Mantle of the Void', type: 'Pact Robe', defense: 'AC 13 + CHA mod' },
      { name: 'Demon-Skin Brigandine', type: 'Studded Leather', defense: 'AC 14 + DEX' },
      { name: 'Starlit Velvet Robes', type: 'Cloth', defense: 'AC 12' },
    ],
    trinkets: [
      { name: 'Jar of Whispering Eyes', origin: 'A patron’s watchful organ preserved in ether', effect: 'Allows seeing through magical darkness up to 120 feet' },
      { name: 'Pact Tome of the Unspeakable', origin: 'Penned in shimmering silver ink on blackened vellum', effect: 'Teaches three forbidden cantrips from any class' },
      { name: 'Black Iron Key without a Lock', origin: 'Dug from a crater where a star fell', effect: 'Opens portals between shadow-doors' },
    ],
    abilities: [
      { name: 'Agonizing Eldritch Blast', type: 'Spell', cost: 'Cantrip', description: 'Hurls beams of crackling violet void force, dealing 1d10+CHA damage per beam up to 300 feet.' },
      { name: 'Hex of the Accursed', type: 'Spell', cost: 'Bonus Action', description: 'Curses a foe to take extra necrotic damage on every hit and disadvantage on chosen ability checks.' },
      { name: 'Pact of the Blade', type: 'Passive', cost: 'Innate', description: 'Can summon a magical weapon from thin air instantly, using Charisma for attack and damage rolls.' },
    ],
  },
  Bard: {
    name: 'Bard',
    tagline: 'Spellbinding virtuoso of words, melodies, and satire',
    description: 'Entertainers and lore-keepers who weave ancient songs of creation to bolster allies and confound tyrants.',
    primaryStat: 'charisma',
    hitDie: 8,
    armorClassBase: 13,
    subclasses: ['College of Lore', 'College of Swords', 'College of Glamour', 'College of Whispers'],
    themeColor: {
      badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      text: 'text-pink-400',
      bg: 'from-pink-950/60 via-rose-950/30 to-slate-950',
      border: 'border-pink-500/30',
      accent: '#f472b6',
    },
    weapons: [
      { name: 'Silver-Strung Lute & Hidden Foil', type: 'Instrument / Rapier', damage: '1d8+DEX Piercing', property: 'Finesse, Performance Focus' },
      { name: 'Siren’s Call Crystal Flute', type: 'Blowpipe / Flute', damage: '1d4 Piercing + Hypnotic Note', property: 'Spell Focus, Subtle' },
      { name: 'Acrobat’s Twin Dueling Knives', type: 'Daggers', damage: '1d4+DEX Piercing', property: 'Finesse, Light' },
    ],
    armors: [
      { name: 'Embroidered Silk Doublet', type: 'Reinforced Silk', defense: 'AC 13 + DEX' },
      { name: 'Court Jester’s Motley Leather', type: 'Studded Leather', defense: 'AC 14 + DEX' },
      { name: 'Traveler’s Velvet Cape', type: 'Light Cape', defense: 'AC 12' },
    ],
    trinkets: [
      { name: 'Deck of Many Illusions', origin: 'Won in a high-stakes tavern dice game in Oakhaven', effect: 'Can throw cards that materialize lifelike illusory creatures' },
      { name: 'Tuning Fork of the Spheres', origin: 'Tuned to the resonance of planar harmony', effect: 'Restores inspiration dice on a critical hit' },
      { name: 'Golden Quill of Slander', origin: 'Once owned by the chief court chronicler', effect: 'Writes down whatever the speaker desires in any known dialect' },
    ],
    abilities: [
      { name: 'Bardic Inspiration', type: 'Technique', cost: 'Bonus Action', description: 'Inspires an ally with a rousing chord, granting them a d8 to add to any roll in the next 10 minutes.' },
      { name: 'Vicious Mockery', type: 'Spell', cost: 'Cantrip', description: 'Unleashes a string of magically laced insults, inflicting psychic agony and disadvantage on their attack.' },
      { name: 'Cutting Words', type: 'Technique', cost: 'Reaction', description: 'Distracts and rattles an attacking enemy, subtracting 1d8 from their attack roll or damage roll.' },
    ],
  },
  Monk: {
    name: 'Monk',
    tagline: 'Master of spiritual ki, supersonic strikes, and serenity',
    description: 'Ascetic martial artists who transform body and spirit into lethal living weapons through disciplined meditation.',
    primaryStat: 'dexterity',
    hitDie: 8,
    armorClassBase: 15,
    subclasses: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements', 'Way of the Kensei'],
    themeColor: {
      badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      text: 'text-orange-400',
      bg: 'from-orange-950/60 via-amber-950/30 to-slate-950',
      border: 'border-orange-500/30',
      accent: '#fb923c',
    },
    weapons: [
      { name: 'Iron-Bound Mountain Bo Staff', type: 'Quarterstaff', damage: '1d8+DEX Bludgeoning', property: 'Versatile, Ki Conduit' },
      { name: 'Tempered Dragon Nunchaku', type: 'Flail / Special', damage: '1d6+DEX Bludgeoning', property: 'Light, Finesse' },
      { name: 'Thunder-Wrapped Bare Fists', type: 'Unarmed Strike', damage: '1d8+DEX Magical Bludgeoning', property: 'Finesse, Fast' },
    ],
    armors: [
      { name: 'Monastery Sash of Tranquility', type: 'Unarmored Defense', defense: 'AC 10 + DEX + WIS' },
      { name: 'Wind-Dancer Wraps', type: 'Cloth', defense: 'AC 15' },
      { name: 'Prayer Robes of the Lotus', type: 'Silken Vestments', defense: 'AC 16' },
    ],
    trinkets: [
      { name: 'Prayer Wheel of Cloud Mountain', origin: 'Spun ten thousand times in the silent peak monastery', effect: 'Prevents falling damage when falling within arm’s reach of a wall' },
      { name: 'Lotus Root Incense Burner', origin: 'Blessed by Grandmaster Shen', effect: 'Cleanses the mind and grants advantage on Wisdom saves' },
      { name: 'Bonsai of the Whispering Spring', origin: 'Grown from the mountain apex', effect: 'Provides pure drinking water drop by drop' },
    ],
    abilities: [
      { name: 'Flurry of Blows', type: 'Technique', cost: '1 Ki', description: 'Immediately executes two additional lightning-fast unarmed strikes after taking the Attack action.' },
      { name: 'Stunning Strike', type: 'Technique', cost: '1 Ki', description: 'Interferes with the flow of ki in a foe’s body, stunning them until the end of your next turn.' },
      { name: 'Patient Defense', type: 'Technique', cost: 'Bonus Action', description: 'Spends 1 Ki to instantly take the Dodge action, making all incoming attacks against you roll with disadvantage.' },
    ],
  },
  Necromancer: {
    name: 'Necromancer',
    tagline: 'Lord of spectral shadows and the cold border of life',
    description: 'Occult masters who decipher the forbidden boundary between mortality and the restless grave.',
    primaryStat: 'intelligence',
    hitDie: 6,
    armorClassBase: 12,
    subclasses: ['Bone Weaver', 'Soul Reaper', 'Crypt Herald', 'Death Knight Initiate'],
    themeColor: {
      badge: 'bg-emerald-600/10 text-emerald-400 border-emerald-600/20',
      text: 'text-emerald-400',
      bg: 'from-emerald-950/70 via-slate-950 to-slate-950',
      border: 'border-emerald-500/30',
      accent: '#34d399',
    },
    weapons: [
      { name: 'Spine-Bone Harvest Scythe', type: 'Scythe', damage: '1d10 Slashing + 1d6 Necrotic', property: 'Two-Handed, Soul Tap' },
      { name: 'Skull of the Betrayed Chancellor', type: 'Macabre Focus', damage: '1d8 Necrotic Ray', property: 'Spell Focus' },
      { name: 'Embalmer’s Bone Dagger', type: 'Dagger', damage: '1d4 Piercing + 1d6 Chill', property: 'Finesse, Light' },
    ],
    armors: [
      { name: 'Shroud of the Tomb King', type: 'Funeral Shroud', defense: 'AC 13 + INT' },
      { name: 'Pestilence Silk Vestments', type: 'Cloth', defense: 'AC 12 + DEX' },
      { name: 'Ossuary Bone Corset', type: 'Bone-Plated Robe', defense: 'AC 14' },
    ],
    trinkets: [
      { name: 'Soul Lantern of the Pale Marsh', origin: 'Fueled by harmless restless wisp-spirits', effect: 'Detects invisible souls and lingering death within 60 feet' },
      { name: 'Preserved Finger of the Lich King', origin: 'Stolen from the sepulcher of the Undying One', effect: 'Prevents natural decay and preserves dead specimens indefinitely' },
      { name: 'Grave-Soil Urn', origin: 'Taken from the crossroads of seven hanged highwaymen', effect: 'Can animate minor bone servants once per long rest' },
    ],
    abilities: [
      { name: 'Soul Siphon', type: 'Spell', cost: 'Action', description: 'Rips vitality from a target creature, dealing 3d8 necrotic damage and restoring half that amount as hit points.' },
      { name: 'Danse Macabre', type: 'Spell', cost: '1 Slot (3rd)', description: 'Animates up to three skeletal or thrall defenders to fight at your side for 1 hour.' },
      { name: 'Grim Harvest', type: 'Passive', cost: 'Innate', description: 'Whenever you slay a creature with a spell of 1st level or higher, you regain hit points equal to double the spell level.' },
    ],
  },
};

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
];

export const CHARACTER_BACKGROUNDS = [
  {
    origin: 'Outcast Royal Scholar',
    trait: 'Speaks with archaic courtly vocabulary and always cites forgotten library manuscripts.',
    flaw: 'Believes they are the smartest mind in any room and refuses to accept commoner advice.',
    quote: '"The stars have already transcribed our victory; I am merely translating it into steel."'
  },
  {
    origin: 'Wandering Guild Mercenary',
    trait: 'Constantly inspects the condition of their boots, blades, and emergency exit routes.',
    flaw: 'Trusts gold and written contracts far more than vague promises of friendship.',
    quote: '"A clean blade makes for short arguments."'
  },
  {
    origin: 'Sole Survivor of the Sunken Citadel',
    trait: 'Listens intently to the wind, swearing the sunken bells still toll underwater.',
    flaw: 'Terrified of confined, waterlogged spaces and drowning nightmares.',
    quote: '"When the stones cracked, only the drowned stayed silent."'
  },
  {
    origin: 'Exiled Temple Heretic',
    trait: 'Wears holy relics as ordinary jewelry to mock orthodox dogma.',
    flaw: 'Consistently seeks forbidden knowledge regardless of the sanity risk.',
    quote: '"Your gods are merely louder than your prayers."'
  },
  {
    origin: 'Nomadic Horizon Scout',
    trait: 'Can predict tomorrow’s weather by tasting the soil and smelling the mountain breeze.',
    flaw: 'Becomes restless and irritable if kept inside a city wall for more than two nights.',
    quote: '"The horizon does not ask for permission, neither do I."'
  },
  {
    origin: 'High-Stakes Gambler & Rogue',
    trait: 'Fiddles with a lucky brass coin between their fingers whenever contemplating danger.',
    flaw: 'Cannot turn down a wager or a seemingly impossible dare.',
    quote: '"The odds are terrible. That means the payout is magnificent."'
  },
  {
    origin: 'Forest Hermit & Dream-Weaver',
    trait: 'Treats wild beasts and forest ravens with greater courtesy than nobility.',
    flaw: 'Often speaks aloud in enigmatic riddles and forgets civilized customs.',
    quote: '"Roots run deeper than stone crowns will ever reach."'
  },
  {
    origin: 'Order of the Gilded Bastion',
    trait: 'Stands at rigid attention and cannot bear seeing armor unpolished.',
    flaw: 'Inflexible adherence to tactical protocol, even when chaos demands improvisation.',
    quote: '"Honor is not a shield we hold; it is the wall we become."'
  },
];
