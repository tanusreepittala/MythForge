/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CharacterClass,
  CharacterRace,
  FantasyCharacter,
  CharacterAttributes,
  RollFilters,
  AttributeScore,
} from '../types/character';
import {
  FANTASY_NAMES,
  EPITHETS,
  CLASS_DEFINITIONS,
  ALIGNMENTS,
  CHARACTER_BACKGROUNDS,
} from '../data/fantasyData';

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

function rollD6(): number {
  return Math.floor(Math.random() * 6) + 1;
}

// Roll 4d6, drop lowest (classic tabletop standard)
function rollAttributeValue(): number {
  const rolls = [rollD6(), rollD6(), rollD6(), rollD6()];
  rolls.sort((a, b) => a - b);
  // drop index 0
  return rolls[1] + rolls[2] + rolls[3];
}

export function generateRandomName(race: CharacterRace): { name: string; title: string } {
  const racePool = FANTASY_NAMES[race] || FANTASY_NAMES['Human'];
  const firstName = getRandomItem(racePool.firstNames);
  
  // 50% chance of surname, 50% chance of surname + epithet or just epithet
  const hasSurname = Math.random() > 0.15;
  const surname = hasSurname ? getRandomItem(racePool.surnames) : '';
  const fullName = surname ? `${firstName} ${surname}` : firstName;
  const title = getRandomItem(EPITHETS);

  return { name: fullName, title };
}

export function generateAttributes(characterClass: CharacterClass): CharacterAttributes {
  const def = CLASS_DEFINITIONS[characterClass];
  const primary = def.primaryStat;

  // Generate 6 attribute rolls
  const rawRolls: number[] = [
    rollAttributeValue(),
    rollAttributeValue(),
    rollAttributeValue(),
    rollAttributeValue(),
    rollAttributeValue(),
    rollAttributeValue(),
  ].sort((a, b) => b - a); // highest to lowest

  // Ensure heroic fantasy stats: minimum highest roll is at least 15 for primary
  if (rawRolls[0] < 15) {
    rawRolls[0] = Math.floor(Math.random() * 4) + 15; // 15-18
  }
  if (rawRolls[1] < 13) {
    rawRolls[1] = Math.floor(Math.random() * 3) + 13; // 13-15
  }

  const keys: (keyof CharacterAttributes)[] = [
    'strength',
    'dexterity',
    'constitution',
    'intelligence',
    'wisdom',
    'charisma',
  ];

  // Assign highest to primary stat
  const result: Partial<Record<keyof CharacterAttributes, AttributeScore>> = {};
  result[primary] = {
    score: rawRolls[0],
    modifier: calculateModifier(rawRolls[0]),
  };

  const remainingKeys = keys.filter((k) => k !== primary);
  
  // Distribute remaining rolls
  remainingKeys.forEach((key, index) => {
    const score = rawRolls[index + 1];
    result[key] = {
      score,
      modifier: calculateModifier(score),
    };
  });

  return result as CharacterAttributes;
}

export function generateRandomCharacter(filters?: Partial<RollFilters>): FantasyCharacter {
  const classes: CharacterClass[] = [
    'Mage',
    'Rogue',
    'Warrior',
    'Paladin',
    'Ranger',
    'Cleric',
    'Druid',
    'Warlock',
    'Bard',
    'Monk',
    'Necromancer',
  ];

  const races: CharacterRace[] = [
    'High Elf',
    'Wood Elf',
    'Mountain Dwarf',
    'Iron Dwarf',
    'Human',
    'Tiefling',
    'Dragonborn',
    'Halfling',
    'Half-Orc',
    'Aasimar',
    'Gnome',
  ];

  const selectedClass = filters?.lockedClass && filters.lockedClass !== 'Random'
    ? filters.lockedClass
    : getRandomItem(classes);

  const selectedRace = filters?.lockedRace && filters.lockedRace !== 'Random'
    ? filters.lockedRace
    : getRandomItem(races);

  const classDef = CLASS_DEFINITIONS[selectedClass];
  const { name, title } = generateRandomName(selectedRace);
  const subclass = getRandomItem(classDef.subclasses);

  // Level calculation based on tier
  let level = 1;
  if (filters?.levelTier === 'Hero (4-7)') {
    level = Math.floor(Math.random() * 4) + 4;
  } else if (filters?.levelTier === 'Master (8-12)') {
    level = Math.floor(Math.random() * 5) + 8;
  } else if (filters?.levelTier === 'Legend (13-20)') {
    level = Math.floor(Math.random() * 8) + 13;
  } else {
    level = Math.floor(Math.random() * 3) + 1; // 1-3
  }

  const attributes = generateAttributes(selectedClass);

  // Health calculation (Player Card Stat)
  const conMod = attributes.constitution.modifier;
  const dexMod = attributes.dexterity.modifier;
  const baseHealthMap: Record<CharacterClass, number> = {
    Warrior: 125,
    Paladin: 120,
    Monk: 105,
    Ranger: 100,
    Cleric: 100,
    Druid: 95,
    Rogue: 90,
    Bard: 85,
    Warlock: 80,
    Necromancer: 75,
    Mage: 70,
  };
  const healthRoll = (baseHealthMap[selectedClass] || 90) + (conMod * 8) + Math.floor(Math.random() * 20) + (level * 6);
  const maxHealth = Math.max(50, healthRoll);

  // Mana calculation (Player Card Stat)
  const intMod = attributes.intelligence.modifier;
  const wisMod = attributes.wisdom.modifier;
  const chaMod = attributes.charisma.modifier;
  const baseManaMap: Record<CharacterClass, number> = {
    Mage: 120,
    Warlock: 110,
    Necromancer: 105,
    Cleric: 95,
    Druid: 90,
    Bard: 85,
    Paladin: 70,
    Monk: 65,
    Ranger: 55,
    Rogue: 45,
    Warrior: 30,
  };
  const primaryMentalMod = Math.max(intMod, wisMod, chaMod);
  const manaRoll = (baseManaMap[selectedClass] || 50) + (primaryMentalMod * 10) + Math.floor(Math.random() * 15) + (level * 5);
  const maxMana = Math.max(20, manaRoll);

  // Strength (Player Card Stat)
  const strengthStat = attributes.strength.score;

  // Rarity calculation
  let rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' = 'Common';
  if (level >= 13 || maxHealth > 140 || maxMana > 130 || strengthStat >= 19) {
    rarity = 'Legendary';
  } else if (level >= 8 || maxHealth > 120 || maxMana > 110 || strengthStat >= 16) {
    rarity = 'Epic';
  } else if (level >= 4 || strengthStat >= 14 || maxMana > 80) {
    rarity = 'Rare';
  }

  // AC calculation
  const ac = Math.max(10, classDef.armorClassBase + (selectedClass === 'Rogue' || selectedClass === 'Ranger' ? dexMod : 0));

  // Speed
  const speed = selectedRace === 'Halfling' || selectedRace === 'Gnome' || selectedRace.includes('Dwarf') ? 25 : 30;

  // Equipment
  const weapon = getRandomItem(classDef.weapons);
  const armor = getRandomItem(classDef.armors);
  const trinket = getRandomItem(classDef.trinkets);

  // Backstory & Alignment
  const background = getRandomItem(CHARACTER_BACKGROUNDS);
  const alignment = getRandomItem(ALIGNMENTS);

  const crest = {
    primaryColor: classDef.themeColor.accent,
    secondaryColor: classDef.themeColor.text,
    accentColor: classDef.themeColor.accent,
    crestIcon: selectedClass,
    auraGradient: classDef.themeColor.bg,
  };

  return {
    id: `char-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    title,
    class: selectedClass,
    subclass,
    race: selectedRace,
    level,
    health: maxHealth,
    maxHealth,
    mana: maxMana,
    maxMana,
    strength: strengthStat,
    hp: maxHealth,
    maxHp: maxHealth,
    ac,
    speed,
    initiative: dexMod,
    rarity,
    attributes,
    abilities: classDef.abilities,
    equipment: {
      weapon,
      armor,
      trinket,
    },
    backstory: {
      origin: background.origin,
      alignment,
      personalityTrait: background.trait,
      secretFlaw: background.flaw,
      notableQuote: background.quote,
      storySnippet: undefined,
    },
    crest,
    createdAt: Date.now(),
    isFavorite: false,
    inDeck: false,
  };
}

/**
 * Generates a unique, tailored one-to-two-sentence origin story for the character currently on screen.
 */
export function generateOriginStory(char: FantasyCharacter): string {
  const sentenceOneStarters = [
    `Hailing from the mist-shrouded ruins of an ancient kingdom, ${char.name} took up the mantle of a ${char.class} after uncovering the ${char.equipment.weapon.name} within an ancestral crypt.`,
    `Once a promising ${char.backstory.origin.toLowerCase()}, ${char.name} was thrust into exile when their mastery over ${char.subclass.toLowerCase()} arts alarmed the elder council.`,
    `Raised in the unforgiving borderlands where only the cunning survive, ${char.name} forged their reputation as a lethal ${char.class} defending their kin with little more than raw grit and their ${char.equipment.weapon.name}.`,
    `Marked by ancient prophecy during the celestial convergence, ${char.name} was chosen by the spirits to inherit the secretive tenets of the ${char.subclass}.`,
    `After surviving a catastrophic betrayal that shattered their former life, ${char.name} abandoned courtly society to master the blade and arcane ways of the ${char.class}.`,
    `Drawn by faint whispers that only a ${char.race} could comprehend, ${char.name} unearthed the ${char.equipment.trinket.name} from the sunken catacombs of a forgotten era.`,
    `Trained from youth in the cloistered sanctuaries of the high mountains, ${char.name} discovered their true path as a ${char.subclass} when demonic shadows breached the outer gates.`,
    `Born under a blood-red moon with an innate spark of power, ${char.name} rose from common sellsword to legendary ${char.class} through unyielding discipline and iron will.`,
  ];

  const sentenceTwoClosers = [
    `Now armed with the ${char.equipment.weapon.name}, they traverse the fractured frontiers determined to unravel the mystery that binds their bloodline to the realm's fate.`,
    `Guided by an unshakeable ${char.backstory.alignment.toLowerCase()} conviction, they scour ancient ruins to retrieve the lost secrets that can prevent an impending cataclysm.`,
    `With lethal resolve, they wander the realm as a solitary champion, hunting down the dark cabal that destroyed everything they once held dear.`,
    `Bearing the ${char.equipment.trinket.name} at their side, they walk the treacherous path between shadow and salvation, answering only to their own code of honor.`,
    `Driven by an insatiable hunger for truth, they journey toward the edge of known maps to confront the tyrant who branded them an outcast.`,
    `Now tested by a hundred skirmishes, they stand ready to confront whatever nightmare stirs in the deep places of the world.`,
  ];

  const s1 = getRandomItem(sentenceOneStarters);
  const s2 = getRandomItem(sentenceTwoClosers);

  return `${s1} ${s2}`;
}

// Helper to format character as clean Markdown
export function exportCharacterToMarkdown(char: FantasyCharacter): string {
  const attrStr = Object.entries(char.attributes)
    .map(([key, val]) => {
      const name = key.toUpperCase().slice(0, 3);
      const mod = val.modifier >= 0 ? `+${val.modifier}` : `${val.modifier}`;
      return `**${name}**: ${val.score} (${mod})`;
    })
    .join(' | ');

  const originStorySection = char.backstory.storySnippet
    ? `\n---\n### Origin Story\n${char.backstory.storySnippet}\n`
    : '';

  return `# ${char.name}
*${char.title}*

**Race & Class:** Level ${char.level} ${char.race} ${char.class} (${char.subclass})
**Alignment:** ${char.backstory.alignment}
**Origin:** ${char.backstory.origin}
${originStorySection}
---
### Combat Attributes
**HP:** ${char.hp}/${char.maxHp} | **AC:** ${char.ac} | **Speed:** ${char.speed}ft | **Initiative:** ${char.initiative >= 0 ? `+${char.initiative}` : char.initiative}

${attrStr}

---
### Equipment & Armament
- **Weapon:** ${char.equipment.weapon.name} (${char.equipment.weapon.damage}, ${char.equipment.weapon.property})
- **Armor:** ${char.equipment.armor.name} (${char.equipment.armor.defense})
- **Trinket:** ${char.equipment.trinket.name} — *${char.equipment.trinket.effect}*

---
### Signature Abilities
${char.abilities.map((a) => `- **${a.name}** (${a.type} · ${a.cost}): ${a.description}`).join('\n')}

---
### Persona & Lore
- **Trait:** ${char.backstory.personalityTrait}
- **Secret/Flaw:** ${char.backstory.secretFlaw}
- **Quote:** ${char.backstory.notableQuote}
`;
}
