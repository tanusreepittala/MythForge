/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Dices } from 'lucide-react';

interface DiceD20ButtonProps {
  onRoll: () => void;
  isRolling: boolean;
  disabled?: boolean;
}

export const DiceD20Button: React.FC<DiceD20ButtonProps> = ({
  onRoll,
  isRolling,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onRoll}
      disabled={disabled || isRolling}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-fantasy text-lg font-bold tracking-wider transition-all duration-300 shadow-xl select-none ${
        disabled
          ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500 border border-slate-700'
          : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95 cursor-pointer ring-1 ring-amber-400/40'
      }`}
      title="Click or press Space / R to roll a new character"
    >
      {/* Subtle outer glow pulse */}
      <span
        className={`absolute inset-0 rounded-xl bg-amber-400/20 blur-md transition-opacity duration-300 pointer-events-none ${
          isRolling || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* D20 polyhedral icon with spin animation */}
      <div
        className={`relative w-7 h-7 flex items-center justify-center transition-transform duration-500 ${
          isRolling ? 'rotate-[720deg] scale-110' : isHovered ? 'rotate-12 scale-105' : ''
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-slate-950 drop-shadow-sm"
        >
          {/* D20 Facets */}
          <polygon
            points="24,3 45,15 24,20"
            fill="currentColor"
            fillOpacity="0.85"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="24,3 3,15 24,20"
            fill="currentColor"
            fillOpacity="0.65"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="3,15 24,20 11,38"
            fill="currentColor"
            fillOpacity="0.9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="45,15 24,20 37,38"
            fill="currentColor"
            fillOpacity="0.75"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="24,20 11,38 37,38"
            fill="currentColor"
            fillOpacity="0.95"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <polygon
            points="11,38 24,45 37,38"
            fill="currentColor"
            fillOpacity="0.7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Number 20 engraved */}
          <text
            x="24"
            y="32"
            fill="#ffffff"
            fontSize="10"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            20
          </text>
        </svg>
      </div>

      <span className="relative z-10 whitespace-nowrap">
        {isRolling ? 'Forging Destiny...' : 'Generate Fantasy Hero'}
      </span>

      <span className="relative z-10 hidden sm:inline-flex items-center text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-950/20 text-slate-900 border border-slate-950/15">
        Space / R
      </span>

      {/* Subtle sparkle icon */}
      <Sparkles
        className={`w-4 h-4 text-amber-950 transition-opacity duration-300 ${
          isRolling ? 'animate-spin opacity-100' : 'opacity-70 group-hover:opacity-100'
        }`}
      />
    </button>
  );
};
