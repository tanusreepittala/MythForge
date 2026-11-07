/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { FantasyCharacter, RollFilters, CharacterClass } from './types/character';
import { generateRandomCharacter, generateRandomName, generateOriginStory } from './utils/characterGenerator';
import { CLASS_DEFINITIONS, CHARACTER_BACKGROUNDS } from './data/fantasyData';
import {
  playDiceRollSound,
  playClassChimeSound,
  setSoundMuted,
  isSoundMuted as checkSoundMuted,
} from './utils/soundEffects';
import { Header } from './components/Header';
import { CharacterCard } from './components/CharacterCard';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterSheetModal } from './components/CharacterSheetModal';
import { RosterView } from './components/RosterView';
import { MyDeckView } from './components/MyDeckView';
import { ClassCodexView } from './components/ClassCodexView';
import { AboutRulesView } from './components/AboutRulesView';
import { Dices, Sparkles, BookOpen, Layers } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'generator' | 'deck' | 'roster' | 'classes' | 'about'>('generator');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundMuted, setLocalSoundMuted] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const [filters, setFilters] = useState<RollFilters>({
    lockedClass: 'Random',
    lockedRace: 'Random',
    levelTier: 'Apprentice (1-3)',
  });

  // Current active character
  const [character, setCharacter] = useState<FantasyCharacter>(() => {
    // Initial hero generated right away
    return generateRandomCharacter();
  });

  // Saved My Deck list
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('mythforge_my_deck');
        if (saved) return JSON.parse(saved);
      } catch {
        // Ignore
      }
    }
    return [];
  });

  // History Roster
  const [roster, setRoster] = useState<FantasyCharacter[]>(() => {
    return [];
  });

  // Modal Sheet
  const [sheetModalChar, setSheetModalChar] = useState<FantasyCharacter | null>(null);

  // Sync deck to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mythforge_my_deck', JSON.stringify(deck));
    } catch {
      // Ignore
    }
  }, [deck]);

  // Initialize theme and roster on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Sync sound muted
  const toggleSound = () => {
    const next = !soundMuted;
    setLocalSoundMuted(next);
    setSoundMuted(next);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Main generation handler
  const handleRollCharacter = useCallback(
    (customFilters?: Partial<RollFilters>) => {
      if (isRolling) return;

      setIsRolling(true);
      playDiceRollSound();

      // Short delay for satisfying dice animation
      setTimeout(() => {
        const mergedFilters = { ...filters, ...(customFilters || {}) };
        const newHero = generateRandomCharacter(mergedFilters);
        setCharacter(newHero);
        setRoster((prev) => [newHero, ...prev.slice(0, 49)]); // Keep last 50
        playClassChimeSound(newHero.class);
        setIsRolling(false);
      }, 350);
    },
    [filters, isRolling]
  );

  // Keyboard shortcut listener for Space or 'R'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or select
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'SELECT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.code === 'Space' || e.key.toLowerCase() === 'r') {
        e.preventDefault();
        handleRollCharacter();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRollCharacter]);

  // Re-roll specific field on current character
  const handleRerollField = (field: 'name' | 'class' | 'equipment' | 'backstory') => {
    playDiceRollSound();
    setCharacter((prev) => {
      if (!prev) return prev;
      const updated = { ...prev };

      if (field === 'name') {
        const { name, title } = generateRandomName(prev.race);
        updated.name = name;
        updated.title = title;
      } else if (field === 'equipment') {
        const classDef = CLASS_DEFINITIONS[prev.class];
        const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
        updated.equipment = {
          weapon: randomItem(classDef.weapons),
          armor: randomItem(classDef.armors),
          trinket: randomItem(classDef.trinkets),
        };
      } else if (field === 'backstory') {
        const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
        const bg = randomItem(CHARACTER_BACKGROUNDS);
        updated.backstory = {
          ...updated.backstory,
          origin: bg.origin,
          personalityTrait: bg.trait,
          secretFlaw: bg.flaw,
          notableQuote: bg.quote,
        };
      }
      return updated;
    });
  };

  // Generate a unique 1-to-2 sentence origin story for the character currently on screen
  const handleGenerateBackstory = () => {
    if (!character) return;
    playDiceRollSound();
    const story = generateOriginStory(character);
    setCharacter((prev) => ({
      ...prev,
      backstory: {
        ...prev.backstory,
        storySnippet: story,
      },
    }));

    setRoster((prev) =>
      prev.map((c) =>
        c.id === character.id
          ? {
              ...c,
              backstory: {
                ...c.backstory,
                storySnippet: story,
              },
            }
          : c
      )
    );
  };

  // Toggle card inside My Deck list
  const handleToggleDeck = (char: FantasyCharacter) => {
    playDiceRollSound();
    setDeck((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        return prev.filter((c) => c.id !== char.id);
      } else {
        return [{ ...char, inDeck: true }, ...prev];
      }
    });
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  const handleToggleFavorite = (id: string) => {
    setCharacter((prev) => (prev.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev));
    setRoster((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const handleDeleteFromRoster = (id: string) => {
    setRoster((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearRoster = () => {
    setRoster([]);
  };

  const handleSelectFromRoster = (char: FantasyCharacter) => {
    setCharacter(char);
    setActiveView('generator');
  };

  const handleRollSpecificClass = (className: CharacterClass) => {
    setFilters((prev) => ({ ...prev, lockedClass: className }));
    handleRollCharacter({ lockedClass: className });
    setActiveView('generator');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans relative selection:bg-amber-600/30 selection:text-amber-200">
      {/* Ancient Alchemist's Workbench Background Image & Textured Scrim */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity filter contrast-125"
        style={{
          backgroundImage: `url('/src/assets/images/alchemist_workbench_bg_1794039631237.jpg')`,
        }}
      />
      {/* Dark textured vignette scrim */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-stone-950/90 via-stone-950/80 to-stone-950/95" />

      {/* Top Bar Navigation */}
      <div className="relative z-30">
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          onQuickRoll={() => handleRollCharacter()}
          isSoundMuted={soundMuted}
          toggleSound={toggleSound}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          rosterCount={roster.length}
          deckCount={deck.length}
        />
      </div>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col items-center relative z-10">
        {activeView === 'generator' && (
          <div className="w-full space-y-8 flex flex-col items-center">
            {/* Ancient Alchemist's Workbench Header */}
            <div className="text-center max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-amber-400/90">
                <span>✦</span>
                <span>The Alchemist's Transmutation Workbench</span>
                <span>✦</span>
              </div>
              <h2 className="font-fantasy text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-yellow-100 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Transmute a Living Legend
              </h2>
              <p className="text-xs md:text-sm text-stone-300 font-alchemical text-base">
                Stir the crucible and roll the alchemical dial to summon a fantasy hero etched onto ancient vellum.
              </p>
            </div>

            {/* Primary Action Button & Customization Filters */}
            <GeneratorControls
              filters={filters}
              setFilters={setFilters}
              onRoll={() => handleRollCharacter()}
              isRolling={isRolling}
              onResetFilters={() =>
                setFilters({
                  lockedClass: 'Random',
                  lockedRace: 'Random',
                  levelTier: 'Apprentice (1-3)',
                })
              }
            />

            {/* Character Player Card with Health, Mana, Strength & Save to Deck */}
            {character && (
              <CharacterCard
                character={character}
                onToggleFavorite={handleToggleFavorite}
                onToggleDeck={handleToggleDeck}
                isInDeck={deck.some((c) => c.id === character.id)}
                onOpenSheet={(c) => setSheetModalChar(c)}
                onRerollField={handleRerollField}
                onGenerateBackstory={handleGenerateBackstory}
                onRollNew={() => handleRollCharacter()}
                isRolling={isRolling}
              />
            )}
          </div>
        )}

        {/* My Deck View */}
        {activeView === 'deck' && (
          <MyDeckView
            deck={deck}
            onSelectCard={(char) => {
              setCharacter(char);
              setActiveView('generator');
            }}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
            onRollNew={() => {
              handleRollCharacter();
              setActiveView('generator');
            }}
          />
        )}

        {activeView === 'roster' && (
          <RosterView
            roster={roster}
            selectedCharacterId={character.id}
            onSelectCharacter={handleSelectFromRoster}
            onToggleFavorite={handleToggleFavorite}
            onDeleteCharacter={handleDeleteFromRoster}
            onClearAll={handleClearRoster}
            onRollNew={() => {
              handleRollCharacter();
              setActiveView('generator');
            }}
          />
        )}

        {activeView === 'classes' && (
          <ClassCodexView onRollClass={handleRollSpecificClass} />
        )}

        {activeView === 'about' && <AboutRulesView />}
      </main>

      {/* Full Tabletop Character Sheet Modal */}
      <CharacterSheetModal
        character={sheetModalChar}
        onClose={() => setSheetModalChar(null)}
      />

      {/* Quiet, Human-Crafted Footer (§1.B - no fake telemetry or status tickers) */}
      <footer className="w-full border-t border-slate-800/80 py-6 px-6 mt-12 bg-slate-950/60 text-slate-400 text-xs text-center transition-colors">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 MythForge · Tabletop Character Generation Engine</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Press <kbd className="font-mono px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Space</kbd> or <kbd className="font-mono px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">R</kbd> to roll</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
