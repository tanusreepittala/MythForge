/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterClass, CharacterRace, RollFilters } from '../types/character';
import { DiceD20Button } from './DiceD20Button';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface GeneratorControlsProps {
  filters: RollFilters;
  setFilters: React.Dispatch<React.SetStateAction<RollFilters>>;
  onRoll: () => void;
  isRolling: boolean;
  onResetFilters: () => void;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  filters,
  setFilters,
  onRoll,
  isRolling,
  onResetFilters,
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  const classes: (CharacterClass | 'Random')[] = [
    'Random',
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

  const races: (CharacterRace | 'Random')[] = [
    'Random',
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

  const isFiltered = filters.lockedClass !== 'Random' || filters.lockedRace !== 'Random' || filters.levelTier !== 'Apprentice (1-3)';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4">
      {/* Primary Action Button (The core requirement of the user request!) */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <DiceD20Button onRoll={onRoll} isRolling={isRolling} />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
            showFilters || isFiltered
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/40'
              : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
          }`}
          title="Toggle class and race customization filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters & Constraints</span>
          {isFiltered && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
        </button>
      </div>

      {/* Expandable Customization Drawer */}
      {showFilters && (
        <div className="w-full p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold uppercase tracking-wider text-slate-300">
              Character Roll Constraints
            </span>
            {isFiltered && (
              <button
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Random</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Lock Class */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium block">
                Lock Class
              </label>
              <select
                value={filters.lockedClass}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    lockedClass: e.target.value as CharacterClass | 'Random',
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 text-slate-200 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls === 'Random' ? 'Any Class (100% Random)' : cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Lock Race */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium block">
                Lock Ancestry / Race
              </label>
              <select
                value={filters.lockedRace}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    lockedRace: e.target.value as CharacterRace | 'Random',
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 text-slate-200 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {races.map((r) => (
                  <option key={r} value={r}>
                    {r === 'Random' ? 'Any Ancestry (Random)' : r}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Tier */}
            <div className="space-y-1.5">
              <label className="text-slate-400 font-medium block">
                Power Tier / Level
              </label>
              <select
                value={filters.levelTier}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    levelTier: e.target.value as RollFilters['levelTier'],
                  }))
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-950 text-slate-200 border border-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="Apprentice (1-3)">Apprentice (Lv. 1-3)</option>
                <option value="Hero (4-7)">Heroic (Lv. 4-7)</option>
                <option value="Master (8-12)">Master (Lv. 8-12)</option>
                <option value="Legend (13-20)">Legendary (Lv. 13-20)</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
