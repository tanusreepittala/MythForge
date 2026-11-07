/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CharacterClass } from '../types/character';

interface ClassCrestIconProps {
  characterClass: CharacterClass;
  className?: string;
  size?: number;
}

export const ClassCrestIcon: React.FC<ClassCrestIconProps> = ({
  characterClass,
  className = 'w-12 h-12',
}) => {
  switch (characterClass) {
    case 'Mage':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Arcane seal and crystal staff */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          <polygon points="32,6 56,46 8,46" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <polygon points="32,58 8,18 56,18" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="32" cy="32" r="12" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
          {/* Central arcane eye / prism */}
          <path d="M22 32C25 26 39 26 42 32C39 38 25 38 22 32Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
          {/* Energy rays */}
          <line x1="32" y1="14" x2="32" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="32" y1="50" x2="32" y2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="32" x2="10" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="32" x2="54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'Rogue':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Crossed daggers with hood shadow */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          {/* Dagger 1 */}
          <path d="M16 48L44 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 20L49 15L43 9L38 14L44 20Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          <line x1="20" y1="40" x2="26" y2="46" stroke="currentColor" strokeWidth="2.5" />
          {/* Dagger 2 */}
          <path d="M48 48L20 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 20L15 15L21 9L26 14L20 20Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
          <line x1="44" y1="40" x2="38" y2="46" stroke="currentColor" strokeWidth="2.5" />
          {/* Poison drop */}
          <path d="M32 36C30 38 30 42 32 44C34 42 34 38 32 36Z" fill="currentColor" />
        </svg>
      );

    case 'Warrior':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Heraldic Kite Shield with Greatsword */}
          <path
            d="M32 6L50 14V32C50 44 42 54 32 58C22 54 14 44 14 32V14L32 6Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.1"
          />
          {/* Center Broadsword */}
          <line x1="32" y1="12" x2="32" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="22" x2="40" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="50" r="2.5" fill="currentColor" />
          {/* Shield rim details */}
          <path d="M22 24L32 32L42 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case 'Paladin':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Radiant Sun Cross */}
          <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          {/* Holy Cross */}
          <path d="M32 10V54M16 26H48" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          {/* Radiance beams */}
          <path d="M20 18L16 14M44 18L48 14M20 42L16 46M44 42L48 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="32" cy="26" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.3" />
        </svg>
      );

    case 'Ranger':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Recurve Bow and Arrow */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
          {/* Bow string and limb */}
          <path d="M20 12C36 20 36 44 20 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="20" y1="12" x2="20" y2="52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Arrow */}
          <line x1="16" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 26L48 32L42 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 29L14 32L18 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'Cleric':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Divine Chalice / Ankh of Life */}
          <circle cx="32" cy="32" r="27" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <path d="M22 18H42V28C42 34 38 38 32 38C26 38 22 34 22 28V18Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          <line x1="32" y1="38" x2="32" y2="48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="48" x2="40" y2="48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="32" cy="14" r="3" fill="currentColor" />
        </svg>
      );

    case 'Druid':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Oak Leaf and Crescent Moon */}
          <path d="M38 12C26 12 18 22 18 34C18 46 28 54 38 54C42 54 46 52 48 50C40 48 34 40 34 32C34 22 40 16 48 14C44 12 41 12 38 12Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
          <path d="M30 34C34 28 38 24 44 26C42 32 38 38 30 40V46" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'Warlock':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Eldritch Pentagram & Horned Sigil */}
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
          <polygon points="32,10 45,48 12,24 52,24 19,48" stroke="currentColor" strokeWidth="1.8" fill="none" opacity="0.7" />
          <circle cx="32" cy="32" r="6" fill="currentColor" />
        </svg>
      );

    case 'Bard':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Ornate Lyre / Harp */}
          <path d="M20 16C20 38 24 46 32 48C40 46 44 38 44 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <line x1="20" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="16" x2="26" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="32" y1="16" x2="32" y2="48" stroke="currentColor" strokeWidth="1.5" />
          <line x1="38" y1="16" x2="38" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="14" r="3" fill="currentColor" />
          <circle cx="46" cy="14" r="3" fill="currentColor" />
        </svg>
      );

    case 'Monk':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Yin Yang & Lotus Qi */}
          <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2" />
          <path d="M32 6C46.36 6 46.36 32 32 32C17.64 32 17.64 58 32 58" stroke="currentColor" strokeWidth="2" />
          <circle cx="32" cy="19" r="4" fill="currentColor" />
          <circle cx="32" cy="45" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'Necromancer':
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Skull and Soul Flame */}
          <path
            d="M20 32C20 22 25 16 32 16C39 16 44 22 44 32C44 38 42 42 38 44V50H26V44C22 42 20 38 20 32Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="currentColor"
            fillOpacity="0.15"
          />
          <circle cx="27" cy="30" r="3" fill="currentColor" />
          <circle cx="37" cy="30" r="3" fill="currentColor" />
          <path d="M32 34V38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="46" x2="28" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="32" y1="46" x2="32" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="46" x2="36" y2="50" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );

    default:
      return null;
  }
};
