/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { ClassCrestIcon } from './ClassCrestIcon';
import {
  Heart,
  Droplet,
  Sword,
  Trash2,
  Eye,
  Layers,
  Dices,
  Download,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface MyDeckViewProps {
  deck: FantasyCharacter[];
  onSelectCard: (character: FantasyCharacter) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
  onRollNew: () => void;
}

export const MyDeckView: React.FC<MyDeckViewProps> = ({
  deck,
  onSelectCard,
  onRemoveFromDeck,
  onClearDeck,
  onRollNew,
}) => {
  const [copiedDeck, setCopiedDeck] = useState(false);
  const [classFilter, setClassFilter] = useState<string>('All');

  const filteredDeck = deck.filter((char) => {
    if (classFilter !== 'All' && char.class !== classFilter) return false;
    return true;
  });

  const handleCopyDeckList = async () => {
    if (deck.length === 0) return;
    const text = deck
      .map(
        (c, idx) =>
          `${idx + 1}. ${c.name} (${c.race} ${c.class} · Lv.${c.level} [${c.rarity}]) - HP: ${c.health} | MP: ${c.mana} | STR: ${c.strength}`
      )
      .join('\n');

    try {
      await navigator.clipboard.writeText(`=== MYTHFORGE HERO DECK (${deck.length} CARDS) ===\n\n${text}`);
      setCopiedDeck(true);
      setTimeout(() => setCopiedDeck(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadDeckJson = () => {
    if (deck.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(deck, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mythforge_deck_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-900/90 border border-amber-900/40 shadow-xl parchment-sheet">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-fantasy text-xl md:text-2xl font-black text-amber-100">
              My Character Deck
            </h2>
            <p className="text-xs text-stone-300 font-alchemical">
              {deck.length} card{deck.length === 1 ? '' : 's'} saved in your private grimoire deck
            </p>
          </div>
        </div>

        {/* Deck Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          {deck.length > 0 && (
            <>
              <button
                onClick={handleCopyDeckList}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-950/80 text-stone-300 hover:text-amber-200 border border-amber-900/40 transition-colors"
              >
                {copiedDeck ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDeck ? 'Copied Deck' : 'Copy List'}</span>
              </button>

              <button
                onClick={handleDownloadDeckJson}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-950/80 text-stone-300 hover:text-amber-200 border border-amber-900/40 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              <button
                onClick={onClearDeck}
                className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                title="Remove all cards from deck"
              >
                Clear Deck
              </button>
            </>
          )}

          <button
            onClick={onRollNew}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-fantasy text-stone-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Forge New Card</span>
          </button>
        </div>
      </div>

      {/* Cards Display Grid */}
      {deck.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl border-2 border-dashed border-amber-900/40 bg-stone-900/40 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-fantasy text-xl font-bold text-amber-100">
              Your Deck is Empty
            </h3>
            <p className="text-xs text-stone-400 font-alchemical text-sm leading-relaxed">
              When viewing a character card on the workbench, click the <strong className="text-amber-300">"Save to Deck"</strong> button to add them into your personal collection of legends.
            </p>
          </div>
          <button
            onClick={onRollNew}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-fantasy text-xs font-bold text-stone-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
          >
            <Dices className="w-4 h-4" />
            <span>Generate Character Card</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDeck.map((char) => {
            return (
              <div
                key={char.id}
                className="relative rounded-2xl p-2.5 bg-gradient-to-b from-amber-700/40 via-amber-950/30 to-stone-950 border border-amber-500/40 shadow-xl flex flex-col justify-between group hover:border-amber-400/70 transition-all duration-300"
              >
                {/* Mini Card Inner Frame */}
                <div className="rounded-xl parchment-sheet p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    {/* Header: Class Icon + Name + Rarity */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="p-1.5 rounded-lg bg-stone-950 border border-amber-500/40 shrink-0"
                          style={{ color: char.crest.primaryColor }}
                        >
                          <ClassCrestIcon characterClass={char.class} className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-character-name text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                            {char.name}
                          </h4>
                          <span className="text-[11px] text-stone-400 font-alchemical block">
                            Lv.{char.level} {char.race} {char.class}
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-amber-500/30 text-amber-300 font-semibold bg-stone-950/80">
                        {char.rarity}
                      </span>
                    </div>

                    {/* Stats Trio Bar: Health, Mana, Strength */}
                    <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-stone-950/80 border border-amber-900/30 text-center font-mono">
                      {/* Health */}
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-rose-400 flex items-center justify-center gap-1">
                          <Heart className="w-2.5 h-2.5" /> HP
                        </span>
                        <span className="text-xs font-bold text-rose-100">{char.health}</span>
                      </div>

                      {/* Mana */}
                      <div className="space-y-0.5 border-x border-amber-900/30">
                        <span className="text-[9px] uppercase font-bold text-cyan-400 flex items-center justify-center gap-1">
                          <Droplet className="w-2.5 h-2.5" /> MP
                        </span>
                        <span className="text-xs font-bold text-cyan-100">{char.mana}</span>
                      </div>

                      {/* Strength */}
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-amber-400 flex items-center justify-center gap-1">
                          <Sword className="w-2.5 h-2.5" /> STR
                        </span>
                        <span className="text-xs font-bold text-amber-100">{char.strength}</span>
                      </div>
                    </div>

                    {/* Weapon & Origin Story snippet */}
                    <div className="text-[11px] text-stone-300 font-alchemical space-y-1">
                      <p className="line-clamp-1 text-amber-200/80">
                        <strong>Weapon:</strong> {char.equipment.weapon.name}
                      </p>
                      {char.backstory.storySnippet && (
                        <p className="line-clamp-2 italic text-stone-400 text-[10px]">
                          "{char.backstory.storySnippet}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between">
                    <button
                      onClick={() => onSelectCard(char)}
                      className="inline-flex items-center gap-1 text-xs font-bold font-fantasy text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Player Card</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromDeck(char.id)}
                      className="p-1 rounded text-stone-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove from deck"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
