/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { ClassCrestIcon } from './ClassCrestIcon';
import { Star, Trash2, ExternalLink, Dices, Eye } from 'lucide-react';

interface RosterViewProps {
  roster: FantasyCharacter[];
  selectedCharacterId: string | null;
  onSelectCharacter: (char: FantasyCharacter) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteCharacter: (id: string) => void;
  onClearAll: () => void;
  onRollNew: () => void;
}

export const RosterView: React.FC<RosterViewProps> = ({
  roster,
  selectedCharacterId,
  onSelectCharacter,
  onToggleFavorite,
  onDeleteCharacter,
  onClearAll,
  onRollNew,
}) => {
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [classFilter, setClassFilter] = useState<string>('All');

  const filteredRoster = roster.filter((char) => {
    if (filterFavorites && !char.isFavorite) return false;
    if (classFilter !== 'All' && char.class !== classFilter) return false;
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
        <div>
          <h2 className="font-fantasy text-xl font-bold text-white">
            Adventurer Roster
          </h2>
          <p className="text-xs text-slate-400">
            {roster.length} hero{roster.length === 1 ? '' : 'es'} summoned · {roster.filter(c => c.isFavorite).length} bookmarked
          </p>
        </div>

        {/* Filter Controls (Segmented buttons - allowed for functional interaction) */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
              filterFavorites
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${filterFavorites ? 'fill-amber-400' : ''}`} />
            <span>Favorites</span>
          </button>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Classes</option>
            <option value="Mage">Mage</option>
            <option value="Rogue">Rogue</option>
            <option value="Warrior">Warrior</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Warlock">Warlock</option>
            <option value="Bard">Bard</option>
            <option value="Monk">Monk</option>
            <option value="Necromancer">Necromancer</option>
          </select>

          {roster.length > 0 && (
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
              title="Clear all generated history"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Characters Grid */}
      {filteredRoster.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400">
            <Dices className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-fantasy text-lg font-bold text-slate-200">
              No Adventurers Found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {roster.length === 0
                ? 'Your hall of heroes is currently empty. Roll your first hero to start building a party!'
                : 'No characters match the currently selected filter.'}
            </p>
          </div>
          <button
            onClick={onRollNew}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold font-fantasy text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer shadow-sm"
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Generate Fantasy Hero</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoster.map((char) => {
            const isSelected = char.id === selectedCharacterId;

            return (
              <div
                key={char.id}
                className={`relative group p-4 rounded-xl border transition-all duration-300 bg-slate-900/90 hover:bg-slate-850 flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-amber-500/60 ring-1 ring-amber-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Top row with Crest and Action Buttons */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                        style={{ color: char.crest.primaryColor }}
                      >
                        <ClassCrestIcon characterClass={char.class} className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-character-name font-bold text-amber-100 text-base leading-snug group-hover:text-amber-300 transition-colors">
                          {char.name}
                        </h3>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <span>{char.race}</span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span style={{ color: char.crest.primaryColor }} className="font-semibold">
                            {char.class}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleFavorite(char.id)}
                      className={`p-1.5 rounded-md transition-colors ${
                        char.isFavorite
                          ? 'text-amber-400 bg-amber-400/10'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={char.isFavorite ? 'Unfavorite' : 'Favorite'}
                    >
                      <Star className={`w-4 h-4 ${char.isFavorite ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Character Title & Weapon snippet */}
                  <div className="text-xs text-slate-400 line-clamp-1 italic font-fantasy text-amber-200/70">
                    "{char.title}"
                  </div>

                  {/* Player Card Stats summary: HP, MP, STR */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg bg-stone-950/80 border border-amber-900/30 text-center font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-rose-400 font-semibold block">HP</span>
                      <span className="font-bold text-rose-100">{char.health}</span>
                    </div>
                    <div className="border-x border-amber-900/30">
                      <span className="text-[10px] text-cyan-400 font-semibold block">MP</span>
                      <span className="font-bold text-cyan-100">{char.mana}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-amber-400 font-semibold block">STR</span>
                      <span className="font-bold text-amber-100">{char.strength}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <button
                    onClick={() => onSelectCharacter(char)}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </button>

                  <button
                    onClick={() => onDeleteCharacter(char.id)}
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove from roster"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
