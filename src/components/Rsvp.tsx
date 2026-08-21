import { useEffect, useState, type FormEvent } from "react";
import { couple, venue, weddingDate } from "../data";
import { Divider, Reveal, SectionTitle } from "./Common";

/* ------------------------------------------------ Venue */
export function VenueSection() {
  const mapSrc = `https://maps.google.com/maps?q=${venue.mapsQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  return (
    <section id="venue" className="bg-cream-2/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Where the magic happens"
          title="The Venue"
          subtitle="Come as guests, leave as family."
        />

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-[2rem] border border-gold/40 bg-cream p-9 text-center">
              <span className="mx-auto text-4xl">📍</span>
              <h3 className="mt-4 font-display text-3xl text-maroon">{venue.name}</h3>
              <Divider className="my-5" />
              <p className="font-serif text-lg leading-relaxed text-ink/75">
                {venue.address}
              </p>
              <p className="mt-6 font-sans text-xs uppercase tracking-[0.3em] text-maroon-soft">
                {weddingDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · 8:12 PM
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${venue.mapsQuery}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-maroon px-7 py-3 font-sans text-[11px] uppercase tracking-[0.3em] text-cream transition hover:scale-105"
                >
                  Get Directions
                </a>
                <AddToCalendar />
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="h-80 overflow-hidden rounded-[2rem] border border-gold/40 lg:h-full">
              <iframe
                title="Venue map"
                src={mapSrc}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AddToCalendar() {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
  const end = new Date(weddingDate.getTime() + 4 * 3600000);
  const href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${couple.groom.name} weds ${couple.bride.name}`,
  )}&dates=${fmt(weddingDate)}/${fmt(end)}&details=${encodeURIComponent(
    "With love, we invite you to our wedding.",
  )}&location=${encodeURIComponent(venue.name + ", " + venue.address)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-maroon/40 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.3em] text-maroon transition hover:bg-maroon hover:text-cream"
    >
      Add to Calendar
    </a>
  );
}

/* ------------------------------------------------ RSVP + Wishes */
type Wish = { name: string; message: string; attending: string; at: number };

const KEY = "yash-sudharani-wishes";

const SEED: Wish[] = [
  {
    name: "Aarti Kulkarni",
    message:
      "So happy for you both! Wishing you a lifetime of laughter and long chai evenings.",
    attending: "Joyfully attending",
    at: Date.now() - 86400000 * 3,
  },
  {
    name: "Rohan & Family",
    message: "May your journey together be as beautiful as your love story. See you at the mandap!",
    attending: "Joyfully attending",
    at: Date.now() - 86400000,
  },
];

export function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>(SEED);
  const [form, setForm] = useState({
    name: "",
    guests: "1",
    attending: "Joyfully attending",
    message: "",
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWishes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    const next = [
      {
        name: form.name.trim(),
        message: form.message.trim(),
        attending: form.attending,
        at: Date.now(),
      },
      ...wishes,
    ];
    setWishes(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setForm({ name: "", guests: "1", attending: "Joyfully attending", message: "" });
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const field =
    "w-full rounded-xl border border-gold/40 bg-cream px-4 py-3 font-sans text-sm text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/30";

  return (
    <section id="rsvp" className="paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Will you join us?"
          title="RSVP & Blessings"
          subtitle="Kindly confirm your presence by 10 November 2026 — and leave a wish for the couple."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={submit}
              className="rounded-[2rem] border border-gold/40 bg-white/60 p-8 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                    Your Name
                  </label>
                  <input
                    className={`mt-2 ${field}`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                      Number of Guests
                    </label>
                    <select
                      className={`mt-2 ${field}`}
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    >
                      {["1", "2", "3", "4", "5+"].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                      Attendance
                    </label>
                    <select
                      className={`mt-2 ${field}`}
                      value={form.attending}
                      onChange={(e) => setForm({ ...form, attending: e.target.value })}
                    >
                      <option>Joyfully attending</option>
                      <option>Attending with family</option>
                      <option>Regretfully unable</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                    Your Wish for Us
                  </label>
                  <textarea
                    className={`mt-2 h-32 resize-none ${field}`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your blessings for Yash & Sudharani…"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-maroon py-4 font-sans text-[11px] uppercase tracking-[0.35em] text-cream transition hover:scale-[1.02]"
                >
                  Send Blessings
                </button>
                {sent && (
                  <p className="fade-up text-center font-serif text-lg italic text-maroon">
                    Thank you! Your wish has been added to our book of blessings. 💐
                  </p>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex h-full flex-col rounded-[2rem] border border-gold/40 bg-cream-2/60 p-8">
              <h3 className="text-center font-display text-2xl text-maroon">
                Book of Blessings
              </h3>
              <Divider className="my-5" />
              <div className="max-h-[26rem] space-y-4 overflow-y-auto pr-1">
                {wishes.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gold/30 bg-cream px-5 py-4"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-lg text-maroon">{w.name}</p>
                      <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-gold">
                        {w.attending}
                      </span>
                    </div>
                    <p className="mt-2 font-serif text-lg italic leading-relaxed text-ink/75">
                      “{w.message}”
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------ Footer */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon py-16 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="spin-slow mx-auto h-[120vmin] w-[120vmin] rounded-full border border-gold-light" />
      </div>
      <div className="relative mx-auto max-w-2xl px-6">
        <p className="text-3xl">🪔</p>
        <h3 className="mt-5 font-script text-5xl text-cream">
          {couple.groom.name} &amp; {couple.bride.name}
        </h3>
        <p className="mt-4 font-serif text-lg italic text-cream/75">
          “Your presence is the greatest blessing we could ask for.”
        </p>
        <div className="gold-line mx-auto my-7 h-px w-40" />
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-gold-light">
          22 · 11 · 2026 · Nagpur
        </p>
        <p className="mt-6 font-serif text-base text-cream/55">
          With love, from the Deshmukh &amp; Patil families
        </p>
      </div>
    </footer>
  );
}
