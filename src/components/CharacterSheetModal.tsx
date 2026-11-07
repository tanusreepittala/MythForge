/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FantasyCharacter } from '../types/character';
import { exportCharacterToMarkdown } from '../utils/characterGenerator';
import { ClassCrestIcon } from './ClassCrestIcon';
import { X, Printer, Download, Copy, Check } from 'lucide-react';

interface CharacterSheetModalProps {
  character: FantasyCharacter | null;
  onClose: () => void;
}

export const CharacterSheetModal: React.FC<CharacterSheetModalProps> = ({
  character,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!character) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const md = exportCharacterToMarkdown(character);
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(character, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${character.name.toLowerCase().replace(/\s+/g, '_')}_sheet.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 print:bg-white print:text-black print:border-none print:shadow-none print:m-0">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-fantasy text-lg font-bold text-amber-400">
              Character Dossier
            </span>
            <span className="text-xs text-slate-400">· {character.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Character Sheet Body */}
        <div className="p-6 md:p-8 space-y-6 parchment-sheet brass-border">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 pb-6 border-b border-amber-900/30 print:border-black">
            <div>
              <h2 className="font-character-name text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 print:text-black print:bg-none">
                {character.name}
              </h2>
              <p className="font-fantasy italic text-amber-400 print:text-slate-800 text-sm">
                "{character.title}"
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 print:text-slate-600 pt-2 font-medium">
                <span>Level {character.level}</span>
                <span>·</span>
                <span>{character.race}</span>
                <span>·</span>
                <span>{character.class} ({character.subclass})</span>
                <span>·</span>
                <span>{character.backstory.alignment}</span>
              </div>
            </div>

            <div className="shrink-0 p-3 rounded-xl bg-slate-950 border border-slate-800 print:border-black print:bg-transparent">
              <ClassCrestIcon characterClass={character.class} className="w-12 h-12 text-amber-400 print:text-black" />
            </div>
          </div>

          {/* Combat Stats Bar: Health, Mana, Strength, Armor */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 print:border-black print:bg-transparent">
              <span className="text-[10px] uppercase font-bold text-rose-400 print:text-black block">Health</span>
              <span className="font-mono text-xl font-bold text-rose-100 print:text-black">{character.health} / {character.maxHealth}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 print:border-black print:bg-transparent">
              <span className="text-[10px] uppercase font-bold text-cyan-400 print:text-black block">Mana</span>
              <span className="font-mono text-xl font-bold text-cyan-100 print:text-black">{character.mana} / {character.maxMana}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 print:border-black print:bg-transparent">
              <span className="text-[10px] uppercase font-bold text-amber-400 print:text-black block">Strength</span>
              <span className="font-mono text-xl font-bold text-amber-100 print:text-black">{character.strength}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-900/30 print:border-black print:bg-transparent">
              <span className="text-[10px] uppercase font-bold text-stone-400 print:text-black block">Armor Class</span>
              <span className="font-mono text-xl font-bold text-stone-100 print:text-black">{character.ac}</span>
            </div>
          </div>

          {/* Attributes */}
          <div className="grid grid-cols-6 gap-2 text-center">
            {Object.entries(character.attributes).map(([key, val]) => (
              <div key={key} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 print:border-black print:bg-transparent">
                <span className="text-[10px] uppercase font-bold text-slate-400 print:text-black block">{key.slice(0, 3)}</span>
                <span className="font-mono text-lg font-bold block">{val.score}</span>
                <span className="text-xs font-mono text-amber-400 print:text-black font-semibold">
                  {val.modifier >= 0 ? `+${val.modifier}` : val.modifier}
                </span>
              </div>
            ))}
          </div>

          {/* Equipment & Abilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-slate-800 pb-1">
                Equipment Loadout
              </h4>
              <ul className="text-xs space-y-2">
                <li>
                  <strong className="text-white print:text-black">{character.equipment.weapon.name}</strong>
                  <span className="text-slate-400 print:text-slate-700 block">{character.equipment.weapon.damage} · {character.equipment.weapon.property}</span>
                </li>
                <li>
                  <strong className="text-white print:text-black">{character.equipment.armor.name}</strong>
                  <span className="text-slate-400 print:text-slate-700 block">{character.equipment.armor.defense}</span>
                </li>
                <li>
                  <strong className="text-white print:text-black">{character.equipment.trinket.name}</strong>
                  <span className="text-slate-400 print:text-slate-700 block italic">{character.equipment.trinket.effect}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-slate-800 pb-1">
                Signature Abilities
              </h4>
              <div className="space-y-2 text-xs">
                {character.abilities.map((ability, idx) => (
                  <div key={idx}>
                    <span className="font-bold text-white print:text-black">{ability.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono ml-2">({ability.type} · {ability.cost})</span>
                    <p className="text-slate-400 print:text-slate-700 leading-tight mt-0.5">{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lore */}
          <div className="pt-2 border-t border-amber-900/30 print:border-black text-xs space-y-2 text-stone-300 print:text-slate-800">
            {character.backstory.storySnippet && (
              <div className="p-3 rounded-lg bg-stone-950/70 border border-amber-600/30 font-alchemical text-sm text-amber-100 italic">
                "{character.backstory.storySnippet}"
              </div>
            )}
            <p><strong>Origin:</strong> {character.backstory.origin}</p>
            <p><strong>Personality:</strong> {character.backstory.personalityTrait}</p>
            <p><strong>Secret Flaw:</strong> {character.backstory.secretFlaw}</p>
            <p className="italic text-amber-300 print:text-black font-fantasy pt-1">
              {character.backstory.notableQuote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
