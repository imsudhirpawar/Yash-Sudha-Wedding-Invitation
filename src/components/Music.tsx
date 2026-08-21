import { useEffect, useRef, useState } from "react";

/**
 * Gentle ambient "shehnai-like" melody generated with the Web Audio API,
 * so the invitation needs no external audio file.
 */
const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];

export default function Music({ autostart }: { autostart: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const stop = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    const m = masterRef.current;
    const ctx = ctxRef.current;
    if (m && ctx) {
      m.gain.cancelScheduledValues(ctx.currentTime);
      m.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    }
    setPlaying(false);
  };

  const start = () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;
      ctx = new Ctor();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterRef.current = master;
    }
    void ctx.resume();
    const master = masterRef.current!;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setTargetAtTime(0.16, ctx.currentTime, 0.6);

    const note = (freq: number, dur: number, type: OscillatorType, vol: number) => {
      const c = ctxRef.current!;
      const osc = c.createOscillator();
      const g = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      g.gain.setValueAtTime(0, c.currentTime);
      g.gain.linearRampToValueAtTime(vol, c.currentTime + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      osc.connect(g);
      g.connect(master);
      osc.start();
      osc.stop(c.currentTime + dur + 0.05);
    };

    const tick = () => {
      const s = stepRef.current++;
      const idx = [0, 2, 4, 3, 5, 4, 2, 1, 0, 2, 5, 7, 5, 4, 2, 0][s % 16];
      note(SCALE[idx], 1.8, "triangle", 0.5);
      if (s % 4 === 0) note(SCALE[idx] / 2, 3.2, "sine", 0.35);
      if (s % 8 === 2) note(SCALE[(idx + 2) % 8] * 2, 1.1, "sine", 0.12);
    };

    tick();
    timerRef.current = window.setInterval(tick, 900);
    setPlaying(true);
  };

  useEffect(() => {
    if (autostart) start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autostart]);

  useEffect(() => () => stop(), []);

  return (
    <button
      onClick={() => (playing ? stop() : start())}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-cream/90 text-maroon shadow-lg shadow-maroon/10 backdrop-blur transition hover:scale-110"
    >
      <span className={playing ? "spin-slow text-lg" : "text-lg opacity-60"}>
        {playing ? "🎵" : "🔇"}
      </span>
      {playing && (
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
      )}
    </button>
  );
}
