import { useEffect, useState } from "react";
import { couple, events, gallery, portraits } from "../data";
import { Reveal, SectionTitle } from "./Common";

/* ------------------------------------------------ Couple */
export function CoupleSection() {
  const people = [
    { ...couple.groom, img: portraits.groom, side: "left" as const },
    { ...couple.bride, img: portraits.bride, side: "right" as const },
  ];

  return (
    <section id="couple" className="paper py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle
          kicker="The Bride & The Groom"
          title="Meet the Couple"
          subtitle="With the blessings of the Almighty and our elders, two hearts become one."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {people.map((p, i) => (
            <Reveal key={p.name} delay={i * 140}>
              <article className="group relative h-full rounded-[2rem] border border-gold/40 bg-white/60 p-8 text-center shadow-[0_18px_50px_-30px_rgba(109,18,38,0.55)] backdrop-blur-sm transition hover:-translate-y-1.5">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-[3px] border-gold/60 p-1">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.4em] text-gold">
                  {p.role}
                </p>
                <h3 className="mt-2 font-script text-4xl text-maroon">{p.name}</h3>
                <p className="mt-1 font-display text-sm tracking-widest text-ink/60">
                  {p.full.toUpperCase()}
                </p>
                <p className="mt-5 text-lg italic leading-relaxed text-ink/75">
                  “{p.words}”
                </p>
                <div className="gold-line mx-auto my-5 h-px w-24" />
                <p className="font-serif text-base text-maroon-soft">{p.parents}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mx-auto mt-12 max-w-2xl text-center font-serif text-xl italic text-ink/70">
            “Let us walk together, speak together, and may our minds be as one
            — bound by the sacred fire, blessed by our elders, for seven
            lifetimes to come.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Events */
export function EventsSection() {
  return (
    <section id="events" className="relative overflow-hidden bg-cream-2/70 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-maroon/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Save these moments"
          title="Wedding Festivities"
          subtitle="Six celebrations, countless memories — we would be honoured to have you at each one."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.name} delay={(i % 3) * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-gold/40 bg-cream p-7 shadow-[0_16px_40px_-30px_rgba(109,18,38,0.6)] transition hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-28px_rgba(109,18,38,0.55)]">
                <span className="absolute right-4 top-4 text-3xl opacity-80 transition group-hover:scale-125">
                  {e.icon}
                </span>
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
                <h3 className="font-display text-2xl text-maroon">{e.name}</h3>
                <div className="gold-line mt-3 h-px w-20" />
                <dl className="mt-5 space-y-2.5 font-sans text-sm text-ink/75">
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold">
                      Date
                    </dt>
                    <dd>{e.date}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold">
                      Time
                    </dt>
                    <dd>{e.time}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-[10px] uppercase tracking-[0.25em] text-gold">
                      Venue
                    </dt>
                    <dd>{e.venue}</dd>
                  </div>
                </dl>
                <p className="mt-5 border-t border-gold/25 pt-4 text-base italic text-maroon-soft">
                  {e.note}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Gallery */
export function GallerySection() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (active === null) return;
      if (e.key === "ArrowRight") setActive((a) => ((a ?? 0) + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setActive((a) => ((a ?? 0) - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Frames of forever"
          title="Our Moments"
          subtitle="A few glimpses of the journey that led us to this day."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 100} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
              <button
                onClick={() => setActive(i)}
                className={`group relative w-full overflow-hidden rounded-2xl border border-gold/40 ${
                  i === 0 ? "h-64 md:h-[544px]" : "h-64"
                }`}
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-maroon/70 via-maroon/0 to-transparent opacity-70 transition group-hover:opacity-90" />
                <span className="absolute bottom-4 left-0 right-0 font-script text-2xl text-cream opacity-0 transition duration-500 group-hover:opacity-100">
                  {g.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <img
            src={gallery[active].src}
            alt={gallery[active].caption}
            className="fade-up max-h-[82vh] w-auto rounded-xl border border-gold/40 object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 w-full text-center font-script text-3xl text-cream">
            {gallery[active].caption}
          </p>
          <button
            className="absolute right-6 top-6 text-3xl text-cream/80 hover:text-cream"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
