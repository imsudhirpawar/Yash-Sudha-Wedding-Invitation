import { useEffect, useState, type FormEvent } from "react";
import { couple, venue, weddingDate } from "../data";
import { Divider, Reveal, SectionTitle } from "./Common";
import { supabase } from "../lib/supabase";

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
                · 11:12 AM
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

/* ------------------------------------------------ Blessings */
type Wish = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

const LOCAL_WISHES_KEY = "yash-sudharani-blessings";

function readLocalWishes(): Wish[] {
  const saved = window.localStorage.getItem(LOCAL_WISHES_KEY);
  if (!saved) return [];

  const wishes: unknown = JSON.parse(saved);
  if (
    !Array.isArray(wishes) ||
    !wishes.every(
      (wish): wish is Wish =>
        typeof wish === "object" &&
        wish !== null &&
        typeof wish.id === "number" &&
        typeof wish.name === "string" &&
        typeof wish.message === "string" &&
        typeof wish.created_at === "string",
    )
  ) {
    throw new Error("Saved blessings have an invalid format.");
  }

  return wishes;
}

function saveLocalWish(name: string, message: string): Wish {
  const wishes = readLocalWishes();
  const wish: Wish = {
    id: Math.min(-Date.now(), ...wishes.map((savedWish) => savedWish.id - 1)),
    name,
    message,
    created_at: new Date().toISOString(),
  };
  window.localStorage.setItem(
    LOCAL_WISHES_KEY,
    JSON.stringify([wish, ...wishes]),
  );
  return wish;
}

export function RsvpSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) {
      try {
        setWishes(readLocalWishes());
      } catch (loadError) {
        const details =
          loadError instanceof Error ? loadError.message : "Unexpected storage error.";
        setError(`Could not load saved blessings: ${details}`);
      }
      setLoading(false);
      return;
    }

    let active = true;
    const loadWishes = async () => {
      try {
        const { data, error: loadError } = await client
          .from("blessings")
          .select("id, name, message, created_at")
          .order("created_at", { ascending: false });

        if (!active) return;
        if (loadError) {
          setError(`Could not load blessings: ${loadError.message}`);
        } else {
          setWishes(data);
          setError(null);
        }
      } catch (loadError) {
        if (!active) return;
        const details =
          loadError instanceof Error ? loadError.message : "Unexpected network error.";
        setError(`Could not load blessings: ${details}`);
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadWishes();
    const channel = client
      .channel("shared-blessings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blessings" },
        () => void loadWishes(),
      )
      .subscribe();
    const refreshInterval = window.setInterval(() => void loadWishes(), 15000);

    return () => {
      active = false;
      window.clearInterval(refreshInterval);
      void client.removeChannel(channel);
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const message = form.message.trim();
    if (!name || !message) {
      setError("Please enter your name and a blessing before sending.");
      return;
    }

    const client = supabase;
    if (!client) {
      setSaving(true);
      setError(null);
      try {
        const wish = saveLocalWish(name, message);
        setWishes((current) => [wish, ...current]);
        setForm({ name: "", message: "" });
        setSent(true);
        setTimeout(() => setSent(false), 5000);
      } catch (saveError) {
        const details =
          saveError instanceof Error ? saveError.message : "Unexpected storage error.";
        setError(`Could not save your blessing on this device: ${details}`);
      } finally {
        setSaving(false);
      }
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const { data, error: insertError } = await client
        .from("blessings")
        .insert({ name, message })
        .select("id, name, message, created_at")
        .single();

      if (insertError) {
        setError(`Could not save your blessing: ${insertError.message}`);
        return;
      }

      setWishes((current) => [data, ...current.filter((wish) => wish.id !== data.id)]);
      setForm({ name: "", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (insertError) {
      const details =
        insertError instanceof Error ? insertError.message : "Unexpected network error.";
      setError(`Could not save your blessing: ${details}`);
    } finally {
      setSaving(false);
    }
  };

  const field =
    "w-full rounded-xl border border-gold/40 bg-cream px-4 py-3 font-sans text-sm text-ink outline-none transition focus:border-maroon focus:ring-2 focus:ring-gold/30";

  return (
    <section id="blessings" className="paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle
          kicker="Share your good wishes"
          title="Blessings"
          subtitle="Leave a blessing for Yash & Sudharani as they begin their life together."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-8 lg:grid-cols-2">
          <Reveal>
            <form
              onSubmit={submit}
              className="rounded-[2rem] border border-gold/40 bg-white/60 p-8 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="blessing-name" className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                    Your Name
                  </label>
                  <input
                    id="blessing-name"
                    className={`mt-2 ${field}`}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    maxLength={100}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blessing-message" className="font-sans text-[10px] uppercase tracking-[0.3em] text-maroon-soft">
                    Your Wish for Us
                  </label>
                  <textarea
                    id="blessing-message"
                    className={`mt-2 h-32 resize-none ${field}`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your blessings for Yash & Sudharani…"
                    maxLength={2000}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-full bg-maroon py-4 font-sans text-[11px] uppercase tracking-[0.35em] text-cream transition hover:scale-[1.02]"
                >
                  {saving ? "Saving…" : "Send Blessings"}
                </button>
                {sent && (
                  <p role="status" className="fade-up text-center font-serif text-lg italic text-maroon">
                    {supabase
                      ? "Thank you! Your blessing has been added to our shared book. 💐"
                      : "Thank you! Your blessing has been saved on this device. 💐"}
                  </p>
                )}
                {!supabase && (
                  <p className="text-center font-sans text-xs text-ink/60">
                    Saved on this device only. Connect Supabase to share blessings
                    with everyone.
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-center font-sans text-sm text-maroon">
                    {error}
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
                {loading ? (
                  <p className="py-8 text-center font-serif text-lg italic text-ink/55">
                    Loading blessings…
                  </p>
                ) : error && wishes.length === 0 ? (
                  <p role="alert" className="py-8 text-center font-serif text-lg italic text-maroon">
                    {error}
                  </p>
                ) : wishes.length === 0 ? (
                  <p className="py-8 text-center font-serif text-lg italic text-ink/55">
                    Be the first to share a blessing.
                  </p>
                ) : (
                  wishes.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-2xl border border-gold/30 bg-cream px-5 py-4"
                    >
                      <p className="font-display text-lg text-maroon">{w.name}</p>
                      <p className="mt-2 whitespace-pre-wrap font-serif text-lg italic leading-relaxed text-ink/75">
                        “{w.message}”
                      </p>
                    </div>
                  ))
                )}
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
          30 · 12 · 2026 · Dombivli
        </p>
        <p className="mt-6 font-serif text-base text-cream/55">
          With love, from the Pandit &amp; Kasar families
        </p>
      </div>
      <p className="relative mt-10 font-sans text-[9px] text-cream/45">
        Planning your wedding website? Connect on{" "}
        <a
          href="https://www.instagram.com/imsudhirpawar"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 transition hover:text-cream/75"
        >
          Instagram @imsudhirpawar
        </a>
      </p>
    </footer>
  );
}
