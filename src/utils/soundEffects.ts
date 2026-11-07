/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural Web Audio API sound generator for fantasy dice rolls and class chimes.
// No external mp3/wav files required, zero broken assets.

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isMuted = muted;
}

export function isSoundMuted(): boolean {
  return isMuted;
}

/**
 * Simulates a realistic multi-bounce polyhedral dice roll clatter
 */
export function playDiceRollSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bounces = [0, 0.04, 0.09, 0.15, 0.22, 0.31, 0.42];

  bounces.forEach((delay, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Wood/resin dice clatter pitch with slight random variation
    const baseFreq = 300 + Math.random() * 260 + (bounces.length - idx) * 40;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now + delay);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, now + delay + 0.05);

    // Highpass filter for crisp dice click
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(baseFreq * 1.5, now + delay);
    filter.Q.setValueAtTime(3.0, now + delay);

    const volume = Math.max(0.04, (1 - idx / bounces.length) * 0.18);
    gain.gain.setValueAtTime(volume, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.06);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.07);
  });
}

/**
 * Plays a resonant fantasy reveal chime tailored to the character class
 */
export function playClassChimeSound(characterClass: string) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Harmonious chord based on class archetype
  let freqs: number[] = [440, 554.37, 659.25]; // Default A major chord

  if (characterClass === 'Mage' || characterClass === 'Warlock' || characterClass === 'Necromancer') {
    // Arcane mystical chord (Minor / Suspended)
    freqs = [329.63, 493.88, 587.33, 783.99]; // E minor 7
  } else if (characterClass === 'Warrior' || characterClass === 'Monk') {
    // Powerful resonant fifths
    freqs = [220, 330, 440, 660];
  } else if (characterClass === 'Paladin' || characterClass === 'Cleric') {
    // Radiant divine major triad with celestial high octave
    freqs = [261.63, 329.63, 392.0, 523.25, 1046.5];
  } else if (characterClass === 'Rogue' || characterClass === 'Ranger') {
    // Swift wind pentatonic chime
    freqs = [392.0, 440.0, 587.33, 880.0];
  } else if (characterClass === 'Bard' || characterClass === 'Druid') {
    // Lyrical warm harmonic chord
    freqs = [293.66, 369.99, 440.0, 587.33];
  }

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = characterClass === 'Mage' || characterClass === 'Warlock' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.04);

    const startVol = 0.08 / freqs.length;
    gain.gain.setValueAtTime(0, now + idx * 0.04);
    gain.gain.linearRampToValueAtTime(startVol, now + idx * 0.04 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.04);
    osc.stop(now + idx * 0.04 + 0.85);
  });
}

/**
 * Quick subtle UI click
 */
export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(200, now + 0.03);

  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
}
