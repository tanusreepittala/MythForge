/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Dices, Shield, Sparkles, BookOpen } from 'lucide-react';

export const AboutRulesView: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-slate-300">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-fantasy text-2xl md:text-3xl font-extrabold text-white">
          The Mechanics of Destiny
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          How MythForge calculates attributes, class ratings, and combat vitals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Dices className="w-5 h-5" />
            <h3 className="font-fantasy font-bold text-base text-white">
              Attribute Generation (4d6 Drop Lowest)
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Every attribute score is generated using the classic tabletop standard: rolling four six-sided dice (4d6) and discarding the lowest die result. Primary attributes are weighted to ensure every hero is competent in their chosen class.
          </p>
          <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 space-y-1">
            <div>Score 16-17: +3 Modifier</div>
            <div>Score 14-15: +2 Modifier</div>
            <div>Score 12-13: +1 Modifier</div>
            <div>Score 10-11: +0 Modifier</div>
            <div>Score 08-09: -1 Modifier</div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <Shield className="w-5 h-5" />
            <h3 className="font-fantasy font-bold text-base text-white">
              Combat Vitals Calculation
            </h3>
          </div>
          <ul className="text-xs leading-relaxed text-slate-400 space-y-2">
            <li>
              <strong className="text-slate-200">Hit Points (HP):</strong> Calculated from the class Hit Die (d6 for Mages, d8 for Rogues, d10 for Warriors) plus Constitution modifier.
            </li>
            <li>
              <strong className="text-slate-200">Armor Class (AC):</strong> Determined by the protective defense of equipped armor and dexterity agility.
            </li>
            <li>
              <strong className="text-slate-200">Initiative:</strong> Equal to Dexterity modifier, deciding turn order in tactical combat.
            </li>
          </ul>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-400">
          <BookOpen className="w-5 h-5" />
          <h3 className="font-fantasy font-bold text-base text-white">
            Unique Lore & Backstory Synthesis
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-slate-400">
          MythForge crafts cultural surnames and mythic epithets suited to each ancestry, pairing heroes with authentic equipment loadouts, signature spellbooks, and roleplaying hooks like secret flaws and memorable battle quotes.
        </p>
      </div>
    </div>
  );
};
