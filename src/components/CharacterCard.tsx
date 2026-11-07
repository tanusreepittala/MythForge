/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FantasyCharacter,
} from '../types/character';
import { ClassCrestIcon } from './ClassCrestIcon';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import {
  Heart,
  Droplet,
  Shield,
  Zap,
  Footprints,
  Star,
  Copy,
  Check,
  FileText,
  Sparkles,
  Sword,
  Scroll,
  RefreshCw,
  Feather,
  BookOpen,
  BookmarkPlus,
  BookmarkCheck,
  Layers,
  Dices,
} from 'lucide-react';

interface CharacterCardProps {
  character: FantasyCharacter;
  onToggleFavorite: (id: string) => void;
  onToggleDeck: (character: FantasyCharacter) => void;
  isInDeck: boolean;
  onOpenSheet: (character: FantasyCharacter) => void;
  onRerollField?: (field: 'name' | 'class' | 'equipment' | 'backstory') => void;
  onGenerateBackstory: () => void;
  onRollNew?: () => void;
  isRolling?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onToggleFavorite,
  onToggleDeck,
  isInDeck,
  onOpenSheet,
  onRerollField,
  onGenerateBackstory,
  onRollNew,
  isRolling = false,
}) => {
  const [copied, setCopied] = useState(false);
  const classDef = CLASS_DEFINITIONS[character.class];

  const handleCopySummary = async () => {
    const originText = character.backstory.storySnippet
      ? `\nOrigin Story: ${character.backstory.storySnippet}`
      : '';
    const summary = `=== MYTHFORGE PLAYER CARD ===\n${character.name}, ${character.title}\nLevel ${character.level} ${character.race} ${character.class} (${character.subclass})\n[${character.rarity} Card]\nHealth: ${character.health}/${character.maxHealth} HP | Mana: ${character.mana}/${character.maxMana} MP | Strength: ${character.strength} STR\nAlignment: ${character.backstory.alignment}${originText}\nWeapon: ${character.equipment.weapon.name} (${character.equipment.weapon.damage})\nArmor: ${character.equipment.armor.name}\nAbilities: ${character.abilities.map(a => a.name).join(', ')}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-stone-950 font-bold border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      case 'Epic':
        return 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-700 text-white font-bold border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.4)]';
      case 'Rare':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]';
      default:
        return 'bg-stone-800 text-stone-300 font-semibold border-stone-600';
    }
  };

  const attributesList = [
    { key: 'STR', label: 'Strength', data: character.attributes.strength },
    { key: 'DEX', label: 'Dexterity', data: character.attributes.dexterity },
    { key: 'CON', label: 'Constitution', data: character.attributes.constitution },
    { key: 'INT', label: 'Intelligence', data: character.attributes.intelligence },
    { key: 'WIS', label: 'Wisdom', data: character.attributes.wisdom },
    { key: 'CHA', label: 'Charisma', data: character.attributes.charisma },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-2">
      {/* Outer Bordered Player Card Frame */}
      <div
        className={`relative rounded-3xl p-3 md:p-4 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] ${
          isRolling ? 'opacity-60 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #452b12 0%, #1f140a 40%, #150d06 100%)',
          boxShadow: '0 0 0 2px #d4a050, 0 0 0 5px #3a220e, 0 0 25px rgba(212,160,80,0.25), 0 25px 50px -12px rgba(0,0,0,0.95)',
        }}
      >
        {/* Ornate Corner Brass Insets */}
        <div className="absolute top-2 left-2 text-amber-400/70 font-mono text-xs select-none">❖</div>
        <div className="absolute top-2 right-2 text-amber-400/70 font-mono text-xs select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-amber-400/70 font-mono text-xs select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-amber-400/70 font-mono text-xs select-none">❖</div>

        {/* Inner Card Parchment Body with Border */}
        <div className="rounded-2xl border-2 border-amber-600/40 parchment-sheet overflow-hidden p-5 md:p-7 space-y-6 relative z-10">
          
          {/* Card Top Header: Class Emblem, Character Name, Level & Rarity Badge */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b-2 border-amber-900/40">
            <div className="flex items-start gap-4">
              {/* Crest Medallion with Gilded Rim */}
              <div
                className="relative p-3 rounded-2xl border-2 border-amber-500/50 bg-stone-950/90 shrink-0 shadow-lg"
                style={{
                  boxShadow: `0 0 20px -2px ${character.crest.primaryColor}50, inset 0 0 10px rgba(0,0,0,0.8)`,
                }}
              >
                <div style={{ color: character.crest.primaryColor }}>
                  <ClassCrestIcon characterClass={character.class} className="w-12 h-12" />
                </div>
                <span
                  className="absolute -bottom-2 -right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-950 border border-amber-500 text-amber-300 shadow"
                >
                  Lv.{character.level}
                </span>
              </div>

              {/* Name and Character Classification */}
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-character-name text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {character.name}
                  </h1>
                  {onRerollField && (
                    <button
                      onClick={() => onRerollField('name')}
                      title="Reroll Name"
                      className="p-1 rounded text-amber-400/50 hover:text-amber-300 hover:bg-amber-950/30 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <p className="font-alchemical italic text-amber-400/90 text-sm tracking-wide">
                  "{character.title}"
                </p>

                {/* Zero-Pill Unboxed Metadata (§1.A) */}
                <div className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-stone-300/90 pt-0.5 font-alchemical">
                  <span className="font-semibold text-amber-100">{character.race}</span>
                  <span aria-hidden="true" className="text-amber-600/60">·</span>
                  <span
                    className="font-bold text-base"
                    style={{ color: character.crest.primaryColor }}
                  >
                    {character.class}
                  </span>
                  <span aria-hidden="true" className="text-amber-600/60">·</span>
                  <span className="text-stone-300">{character.subclass}</span>
                  <span aria-hidden="true" className="text-amber-600/60">·</span>
                  <span className="text-stone-400">{character.backstory.alignment}</span>
                </div>
              </div>
            </div>

            {/* Rarity Tag & Top Actions */}
            <div className="flex items-center sm:flex-col items-end gap-2 shrink-0 self-end sm:self-start">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase border ${getRarityBadge(character.rarity)}`}>
                ✦ {character.rarity}
              </span>

              <div className="flex items-center gap-1.5 pt-1">
                <button
                  onClick={() => onToggleFavorite(character.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    character.isFavorite
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                      : 'bg-stone-900/90 text-stone-400 hover:text-amber-200 border-amber-900/40'
                  }`}
                  title={character.isFavorite ? 'Remove star' : 'Star character'}
                >
                  <Star className={`w-3.5 h-3.5 ${character.isFavorite ? 'fill-amber-400' : ''}`} />
                </button>

                <button
                  onClick={handleCopySummary}
                  className="p-1.5 rounded-lg bg-stone-900/90 text-stone-300 hover:text-amber-100 border border-amber-900/40 transition-colors"
                  title="Copy player card stats"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onOpenSheet(character)}
                  className="p-1.5 rounded-lg bg-stone-900/90 text-stone-300 hover:text-amber-100 border border-amber-900/40 transition-colors"
                  title="View full RPG dossier"
                >
                  <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* NEW PROMINENT STAT TRIO: HEALTH, MANA, STRENGTH */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300/80 font-alchemical block">
              Primary Card Attributes
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* HEALTH STAT MEDALLION */}
              <div className="relative p-3.5 rounded-xl border-2 border-rose-500/40 bg-gradient-to-b from-stone-950 via-rose-950/20 to-stone-950 shadow-md flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 shrink-0 shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                  <Heart className="w-6 h-6 fill-rose-500/30" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-rose-300/90 block">
                    Health
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-2xl font-black text-rose-100 tabular-nums">
                      {character.health}
                    </span>
                    <span className="font-mono text-xs text-rose-300/60 font-semibold">
                      / {character.maxHealth} HP
                    </span>
                  </div>
                </div>
              </div>

              {/* MANA STAT MEDALLION */}
              <div className="relative p-3.5 rounded-xl border-2 border-cyan-500/40 bg-gradient-to-b from-stone-950 via-cyan-950/20 to-stone-950 shadow-md flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <Droplet className="w-6 h-6 fill-cyan-500/30" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-300/90 block">
                    Mana
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-2xl font-black text-cyan-100 tabular-nums">
                      {character.mana}
                    </span>
                    <span className="font-mono text-xs text-cyan-300/60 font-semibold">
                      / {character.maxMana} MP
                    </span>
                  </div>
                </div>
              </div>

              {/* STRENGTH STAT MEDALLION */}
              <div className="relative p-3.5 rounded-xl border-2 border-amber-500/40 bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950 shadow-md flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                  <Sword className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-amber-300/90 block">
                    Strength
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-black text-amber-100 tabular-nums">
                      {character.strength}
                    </span>
                    <span className="font-mono text-xs text-amber-300/70 font-semibold px-1 py-0.2 rounded bg-amber-500/15">
                      {character.attributes.strength.modifier >= 0 ? `+${character.attributes.strength.modifier}` : character.attributes.strength.modifier}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Vitals Bar (Armor, Speed, Initiative) */}
          <div className="grid grid-cols-3 gap-2.5 p-2 rounded-xl bg-stone-950/60 border border-amber-900/30 text-center font-mono text-xs">
            <div className="flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-stone-400 text-[11px]">Armor:</span>
              <span className="font-bold text-stone-200">{character.ac} AC</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 border-x border-amber-900/30">
              <Footprints className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-stone-400 text-[11px]">Speed:</span>
              <span className="font-bold text-stone-200">{character.speed} ft</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-stone-400 text-[11px]">Initiative:</span>
              <span className="font-bold text-stone-200">{character.initiative >= 0 ? `+${character.initiative}` : character.initiative}</span>
            </div>
          </div>

          {/* Combat Loadout & Signature Abilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Equipment Box */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-amber-900/30 space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-amber-900/30">
                <div className="flex items-center gap-2">
                  <Sword className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-alchemical">
                    Armament
                  </span>
                </div>
                {onRerollField && (
                  <button
                    onClick={() => onRerollField('equipment')}
                    title="Reroll Armament"
                    className="p-1 rounded text-amber-400/50 hover:text-amber-300 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="text-xs space-y-1.5">
                <div>
                  <span className="text-amber-200/50 text-[10px] block font-alchemical">Weapon</span>
                  <span className="font-semibold text-amber-100 font-alchemical">{character.equipment.weapon.name}</span>
                  <p className="text-stone-400 text-[11px]">{character.equipment.weapon.damage}</p>
                </div>
                <div>
                  <span className="text-amber-200/50 text-[10px] block font-alchemical">Relic / Catalyst</span>
                  <span className="font-semibold text-amber-300 font-alchemical">{character.equipment.trinket.name}</span>
                </div>
              </div>
            </div>

            {/* Signature Spell / Feat Box */}
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-amber-900/30 space-y-2">
              <div className="flex items-center gap-2 pb-1.5 border-b border-amber-900/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-alchemical">
                  Signature Action
                </span>
              </div>

              <div className="text-xs space-y-1.5">
                {character.abilities.slice(0, 2).map((ability, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-100 font-alchemical text-sm">{ability.name}</span>
                      <span className="text-[10px] text-amber-300/70 font-mono">({ability.cost})</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-tight font-alchemical">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Backstory & Origin Story Section with "Generate Backstory" Button */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-amber-900/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-amber-900/30">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-200 font-alchemical">
                  Manuscript Lore & Origin Story
                </span>
              </div>

              {/* Generate Backstory Button */}
              <button
                onClick={onGenerateBackstory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-fantasy rounded-lg bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 shadow-md transition-all cursor-pointer active:scale-95"
                title="Generate a unique 1-2 sentence origin story for this character"
              >
                <Feather className="w-3.5 h-3.5 text-stone-950" />
                <span>Generate Backstory</span>
              </button>
            </div>

            {/* Render 1-to-2 sentence origin story */}
            {character.backstory.storySnippet ? (
              <div className="p-3 rounded-lg bg-stone-950/90 border border-amber-600/40 space-y-1 shadow-inner">
                <div className="flex items-center gap-1.5 text-amber-400/80 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Origin Story</span>
                </div>
                <p className="font-alchemical text-sm md:text-base text-amber-100 leading-relaxed italic">
                  "{character.backstory.storySnippet}"
                </p>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-stone-950/40 border border-dashed border-amber-900/30 text-xs text-stone-400 font-alchemical">
                Click <strong className="text-amber-300">"Generate Backstory"</strong> to scribe a unique 1-2 sentence origin story for this character card.
              </div>
            )}

            <div className="text-xs text-stone-300 space-y-1 font-alchemical">
              <p><strong className="text-amber-200/70">Origin Background:</strong> {character.backstory.origin}</p>
              <blockquote className="font-medieval italic text-amber-200 text-xs pt-1 border-l-2 border-amber-500/40 pl-3">
                {character.backstory.notableQuote}
              </blockquote>
            </div>
          </div>

          {/* CARD FOOTER & "SAVE TO DECK" PRIMARY ACTION */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-amber-900/40">
            {/* "Save to Deck" Feature Button */}
            <button
              onClick={() => onToggleDeck(character)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-fantasy text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-lg active:scale-95 ${
                isInDeck
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white ring-2 ring-emerald-400/40'
                  : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-stone-950 ring-2 ring-amber-400/40'
              }`}
            >
              {isInDeck ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-white" />
                  <span>In My Deck (Saved)</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4 text-stone-950" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>

            {/* Quick Roll / Roll New Button */}
            {onRollNew && (
              <button
                onClick={onRollNew}
                disabled={isRolling}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-fantasy text-xs font-bold tracking-wider bg-stone-900/90 hover:bg-stone-850 text-amber-300 hover:text-amber-200 border border-amber-600/40 transition-colors cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
                <span>Roll New Character</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
