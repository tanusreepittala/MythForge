/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterClass =
  | 'Mage'
  | 'Rogue'
  | 'Warrior'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Druid'
  | 'Warlock'
  | 'Bard'
  | 'Monk'
  | 'Necromancer';

export type CharacterRace =
  | 'High Elf'
  | 'Wood Elf'
  | 'Mountain Dwarf'
  | 'Iron Dwarf'
  | 'Human'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Halfling'
  | 'Half-Orc'
  | 'Aasimar'
  | 'Gnome';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface AttributeScore {
  score: number;
  modifier: number;
}

export interface CharacterAttributes {
  strength: AttributeScore;
  dexterity: AttributeScore;
  constitution: AttributeScore;
  intelligence: AttributeScore;
  wisdom: AttributeScore;
  charisma: AttributeScore;
}

export interface CharacterAbility {
  name: string;
  type: 'Spell' | 'Technique' | 'Passive' | 'Aura' | 'Feat';
  cost: string;
  description: string;
}

export interface CharacterEquipment {
  weapon: {
    name: string;
    type: string;
    damage: string;
    property: string;
  };
  armor: {
    name: string;
    type: string;
    defense: string;
  };
  trinket: {
    name: string;
    origin: string;
    effect: string;
  };
}

export interface CharacterBackstory {
  origin: string;
  alignment: Alignment;
  personalityTrait: string;
  secretFlaw: string;
  notableQuote: string;
  storySnippet?: string;
}

export interface CharacterCrest {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  crestIcon: string;
  auraGradient: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  class: CharacterClass;
  subclass: string;
  race: CharacterRace;
  level: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  strength: number;
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  initiative: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  attributes: CharacterAttributes;
  abilities: CharacterAbility[];
  equipment: CharacterEquipment;
  backstory: CharacterBackstory;
  crest: CharacterCrest;
  createdAt: number;
  isFavorite?: boolean;
  inDeck?: boolean;
}

export interface RollFilters {
  lockedClass: CharacterClass | 'Random';
  lockedRace: CharacterRace | 'Random';
  levelTier: 'Apprentice (1-3)' | 'Hero (4-7)' | 'Master (8-12)' | 'Legend (13-20)';
}
