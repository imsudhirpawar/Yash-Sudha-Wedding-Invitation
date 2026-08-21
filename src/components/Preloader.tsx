import { useEffect, useState } from "react";
import { couple } from "../data";

export default function Preloader({ onOpen }: { onOpen: () => void }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  const open = () => {
    setLeaving(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div
      className={`paper fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center transition-all duration-900 ${
        leaving ? "pointer-events-none scale-105 opacity-0" : "opacity-100"
      }`}
    >
      {/* rotating mandala */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.13]">
        <svg viewBox="0 0 400 400" className="spin-slow h-[130vmin] w-[130vmin] text-gold">
          {Array.from({ length: 24 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 15} 200 200)`}>
              <ellipse cx="200" cy="70" rx="9" ry="34" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="200" cy="30" r="3" fill="currentColor" />
            </g>
          ))}
          <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.6" />
        </svg>
      </div>

      <div className="fade-up relative">
        <p className="font-display text-sm tracking-[0.3em] text-maroon-soft sm:text-base">
          || SHRI GANESHAY NAMAH ||
        </p>

        {/* Ganesha / diya emblem */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-gold/50 bg-white/50 glow">
            <span className="text-5xl">🕉️</span>
            <span className="absolute -bottom-3 text-2xl flame">🪔</span>
          </div>
        </div>

        <p className="mt-10 font-serif text-lg italic text-ink/70">
          Inviting the divine presence &amp; your blessings for
        </p>

        <h1 className="mt-4 font-script text-5xl leading-tight text-maroon sm:text-6xl">
          {couple.groom.name}
          <span className="mx-3 gold-text shimmer">&amp;</span>
          {couple.bride.name}
        </h1>

        <div className="mt-10 h-14">
          {ready ? (
            <button
              onClick={open}
              className="fade-up group relative overflow-hidden rounded-full border border-gold bg-maroon px-9 py-3.5 font-sans text-[11px] uppercase tracking-[0.32em] text-cream shadow-lg shadow-maroon/20 transition hover:scale-[1.03]"
            >
              <span className="relative z-10">Open Invitation</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gold-light/0 via-gold-light/60 to-gold-light/0 transition-transform duration-700 group-hover:translate-x-full" />
            </button>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-2 w-2 animate-bounce rounded-full bg-gold"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
