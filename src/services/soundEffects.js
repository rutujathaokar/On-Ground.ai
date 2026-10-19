/**
 * Web Audio API synthesizer for telecom tones:
 * - US/Standard Ringback Tone (440Hz + 480Hz)
 * - Call Connected Chime
 * - Call End / Disconnect Tone
 * - DTMF Keypad Tones
 */

class SoundEffectsService {
  constructor() {
    this.audioCtx = null;
    this.ringInterval = null;
    this.activeNodes = [];
  }

  getAudioContext() {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Play a dual-frequency tone
  playDualTone(freq1, freq2, durationMs = 150, gainVal = 0.08) {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freq1;
      osc2.frequency.value = freq2;

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationMs / 1000);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1.stop(ctx.currentTime + durationMs / 1000);
      osc2.stop(ctx.currentTime + durationMs / 1000);
    } catch (e) {
      console.warn("Sound tone playback error:", e);
    }
  }

  // Start realistic telecom ringback tone (440Hz + 480Hz, 2s tone, 3s pause)
  startRinging() {
    this.stopRinging();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const playBurst = () => {
      try {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.value = 440;
        osc2.frequency.value = 480;

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + 1.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.95);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 2.0);
        osc2.stop(ctx.currentTime + 2.0);

        this.activeNodes.push(osc1, osc2, gain);
      } catch (err) {
        console.warn("Ring burst error:", err);
      }
    };

    playBurst();
    this.ringInterval = setInterval(playBurst, 4000);
  }

  stopRinging() {
    if (this.ringInterval) {
      clearInterval(this.ringInterval);
      this.ringInterval = null;
    }
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // ignore already stopped
      }
    });
    this.activeNodes = [];
  }

  // Pleasant ascending chime when call is connected
  playConnectedChime() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.25);
      });
    } catch (e) {
      console.warn("Connected chime error:", e);
    }
  }

  // Descending tone when call ends
  playEndCallTone() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [440, 330, 220];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.06, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.25);
      });
    } catch (e) {
      console.warn("End call tone error:", e);
    }
  }

  // DTMF Keypad Tones (0-9, *, #)
  playDtmfTone(key) {
    const dtmfFreqs = {
      '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
      '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
      '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
      '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
    };

    const freqs = dtmfFreqs[key] || [700, 1200];
    this.playDualTone(freqs[0], freqs[1], 160, 0.09);
  }
}

export const soundEffects = new SoundEffectsService();
