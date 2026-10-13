import { couple, heroImage, weddingDate } from "../data";
import { Corner } from "./Common";

const dateLine = weddingDate.toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Yash and Sudharani"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/85 via-cream/55 to-cream" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(109,18,38,0.18))]" />
      </div>

      {/* frame */}
      <div className="pointer-events-none absolute inset-4 border border-gold/40 sm:inset-7" />
      <Corner className="pointer-events-none absolute left-4 top-4 h-20 w-20 sm:left-7 sm:top-7 sm:h-28 sm:w-28" />
      <Corner className="pointer-events-none absolute right-4 top-4 h-20 w-20 -scale-x-100 sm:right-7 sm:top-7 sm:h-28 sm:w-28" />
      <Corner className="pointer-events-none absolute bottom-4 left-4 h-20 w-20 -scale-y-100 sm:bottom-7 sm:left-7 sm:h-28 sm:w-28" />
      <Corner className="pointer-events-none absolute bottom-4 right-4 h-20 w-20 -scale-100 sm:bottom-7 sm:right-7 sm:h-28 sm:w-28" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="fade-up font-sans text-[10px] uppercase tracking-[0.5em] text-maroon-soft sm:text-xs">
          Together with our families
        </p>

        <h1
          className="fade-up mt-6 font-script text-6xl leading-[1.05] text-maroon drop-shadow-sm sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.15s" }}
        >
          {couple.groom.name}
        </h1>
        <div
          className="fade-up my-3 flex items-center gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="gold-line h-px w-14 sm:w-24" />
          <span className="font-display text-xl text-gold sm:text-2xl">weds</span>
          <span className="gold-line h-px w-14 sm:w-24" />
        </div>
        <h1
          className="fade-up font-script text-6xl leading-[1.05] text-maroon drop-shadow-sm sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.45s" }}
        >
          {couple.bride.name}
        </h1>

        <p
          className="fade-up mt-9 max-w-xl font-serif text-lg italic text-ink/75 sm:text-xl"
          style={{ animationDelay: "0.6s" }}
        >
          “The beginning of a lifetime, the promise of forever — we invite you to be part of our forever”
        </p>

        <div
          className="fade-up mt-9 inline-flex flex-col items-center rounded-2xl border border-gold/50 bg-cream/70 px-8 py-4 backdrop-blur-sm"
          style={{ animationDelay: "0.75s" }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-maroon-soft">
            Save the Date
          </span>
          <span className="mt-2 font-display text-lg text-maroon sm:text-2xl">
            {dateLine}
          </span>
          <span className="mt-1 font-sans text-xs tracking-[0.25em] text-ink/60">
            The Heritage Banquet · Dombivli (E)
          </span>
        </div>

        <a
          href="#events"
          className="fade-up mt-12 flex flex-col items-center gap-2 text-maroon-soft"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.35em]">
            Scroll
          </span>
          <span className="float-slow text-xl">❧</span>
        </a>
      </div>
    </section>
  );
}
