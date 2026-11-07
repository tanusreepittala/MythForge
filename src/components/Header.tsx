/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Dices } from 'lucide-react';

interface HeaderProps {
  activeView: 'generator' | 'deck' | 'roster' | 'classes' | 'about';
  setActiveView: (view: 'generator' | 'deck' | 'roster' | 'classes' | 'about') => void;
  onQuickRoll: () => void;
  isSoundMuted: boolean;
  toggleSound: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  rosterCount: number;
  deckCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onQuickRoll,
  isSoundMuted,
  toggleSound,
  isDarkMode,
  toggleTheme,
  rosterCount,
  deckCount,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-amber-900/40 bg-stone-950/85 backdrop-blur-md sticky top-0 z-40 transition-colors">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveView('generator');
        }}
        className="font-fantasy text-xl font-bold tracking-wider text-amber-400 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
      >
        MythForge
      </a>

      {/* Zone 2: 4–5 concise single-line text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
        <button
          onClick={() => setActiveView('generator')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'generator' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Character Card
        </button>
        <button
          onClick={() => setActiveView('deck')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
            activeView === 'deck' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          <span>My Deck</span>
          {deckCount > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {deckCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveView('roster')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'roster' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Roster {rosterCount > 0 ? `(${rosterCount})` : ''}
        </button>
        <button
          onClick={() => setActiveView('classes')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'classes' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Class Codex
        </button>
        <button
          onClick={() => setActiveView('about')}
          className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeView === 'about' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''
          }`}
        >
          Rules
        </button>
      </nav>

      {/* Zone 3: 1 primary action + subtle utility controls */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleSound}
          aria-label={isSoundMuted ? 'Unmute sounds' : 'Mute sounds'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          title={isSoundMuted ? 'Enable Audio (Dice & Spells)' : 'Mute Audio'}
        >
          {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
          title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          onClick={onQuickRoll}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          <Dices className="w-3.5 h-3.5" />
          <span>Roll Hero</span>
        </button>
      </div>
    </header>
  );
};
