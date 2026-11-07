/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_DEFINITIONS } from '../data/fantasyData';
import { ClassCrestIcon } from './ClassCrestIcon';
import { Dices, Sparkles, Shield, Heart } from 'lucide-react';

interface ClassCodexViewProps {
  onRollClass: (className: CharacterClass) => void;
}

export const ClassCodexView: React.FC<ClassCodexViewProps> = ({ onRollClass }) => {
  const classesList = Object.values(CLASS_DEFINITIONS);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Introduction Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="font-fantasy text-2xl md:text-3xl font-extrabold text-white">
          Class Codex & Archetypes
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Explore the eleven classic fantasy archetypes. Click on any class to immediately forge a hero of that discipline.
        </p>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classesList.map((classDef) => {
          return (
            <div
              key={classDef.name}
              className="group p-5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between gap-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800"
                      style={{ color: classDef.themeColor.accent }}
                    >
                      <ClassCrestIcon characterClass={classDef.name} className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-fantasy text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                        {classDef.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 capitalize block">
                        Primary: {classDef.primaryStat}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    d{classDef.hitDie} HP
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {classDef.description}
                </p>

                {/* Subclasses list */}
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-slate-300">Specializations: </strong>
                  {classDef.subclasses.join(', ')}
                </div>
              </div>

              {/* Action Button: Roll this class */}
              <button
                onClick={() => onRollClass(classDef.name)}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold font-fantasy rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700 hover:border-amber-400 transition-all cursor-pointer shadow-sm"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Roll a {classDef.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
