import { useEffect, useState } from "react";
import { couple } from "../data";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "couple", label: "Couple" },
  { id: "story", label: "Our Story" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "venue", label: "Venue" },
  { id: "rsvp", label: "RSVP" },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 60);
      let current = "home";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "border-b border-gold/30 bg-cream/90 py-3 shadow-sm backdrop-blur-md"
          : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-script text-2xl text-maroon">
          {couple.groom.name} <span className="text-gold">&amp;</span>{" "}
          {couple.bride.name}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`font-sans text-[11px] uppercase tracking-[0.25em] transition ${
                  active === l.id
                    ? "text-maroon"
                    : "text-ink/55 hover:text-maroon"
                }`}
              >
                {l.label}
                <span
                  className={`mt-1 block h-px bg-gold transition-all ${
                    active === l.id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span
            className={`h-px w-6 bg-maroon transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-maroon transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-maroon transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`overflow-hidden bg-cream/95 backdrop-blur-md transition-all duration-500 md:hidden ${
          open ? "max-h-96 border-t border-gold/30" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-3">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="block border-b border-gold/15 py-3 font-sans text-xs uppercase tracking-[0.3em] text-ink/70"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
