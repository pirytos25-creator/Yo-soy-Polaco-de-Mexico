export class AudioManager {
  private context: AudioContext | null = null;

  constructor(private enabled: () => boolean) {}

  chime(kind: 'soft' | 'bright' | 'crack' = 'soft'): void {
    if (!this.enabled()) return;
    const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
    if (!AudioContextCtor) return;
    this.context ??= new AudioContextCtor();
    const now = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    const frequency = kind === 'bright' ? 740 : kind === 'crack' ? 120 : 420;
    osc.type = kind === 'crack' ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.11);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(kind === 'crack' ? 0.07 : 0.05, now + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.context.destination);
    osc.start(now);
    osc.stop(now + 0.19);
  }
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
