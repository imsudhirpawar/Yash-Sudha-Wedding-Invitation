import { useEffect, useState } from "react";
import { weddingDate } from "../data";
import { Reveal, SectionTitle } from "./Common";

function diff() {
  const ms = Math.max(0, weddingDate.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

export default function Countdown() {
  const [t, setT] = useState(diff);

  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <section id="countdown" className="relative overflow-hidden bg-maroon py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <svg viewBox="0 0 600 200" className="h-full w-full text-gold-light" preserveAspectRatio="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={i} cx={i * 46 + 20} cy="20" r="16" fill="none" stroke="currentColor" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <circle key={`b${i}`} cx={i * 46 + 20} cy="180" r="16" fill="none" stroke="currentColor" />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.45em] text-gold-light">
          Counting every moment
        </p>
        <h2 className="mt-4 font-script text-4xl text-cream sm:text-5xl">
          Until we say “I do”
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 90}>
              <div className="rounded-2xl border border-gold/40 bg-cream/[0.07] px-3 py-6 backdrop-blur-sm">
                <div className="font-display text-4xl text-gold-light sm:text-5xl">
                  {String(it.value).padStart(2, "0")}
                </div>
                <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.35em] text-cream/70">
                  {it.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {t.done && (
          <p className="mt-8 font-script text-3xl text-gold-light">
            Today is the day! 🎉
          </p>
        )}
      </div>
    </section>
  );
}

export function StorySection({
  story,
}: {
  story: { year: string; title: string; text: string }[];
}) {
  return (
    <section id="story" className="paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionTitle
          kicker="How it all began"
          title="Our Little Story"
          subtitle="Every love story is beautiful, but ours is our favourite."
        />
        <div className="relative mt-14">
          <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent sm:left-1/2" />
          {story.map((s, i) => (
            <Reveal key={s.year} delay={i * 80}>
              <div
                className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0
                    ? "sm:mr-auto sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                }`}
              >
                <span
                  className={`absolute top-2 left-[9px] h-3.5 w-3.5 rounded-full border-2 border-gold bg-cream sm:left-auto ${
                    i % 2 === 0 ? "sm:-right-[7px]" : "sm:-left-[7px]"
                  }`}
                />
                <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-gold">
                  {s.year}
                </p>
                <h3 className="mt-2 font-display text-2xl text-maroon">{s.title}</h3>
                <p className="mt-2 text-lg leading-relaxed text-ink/75">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
