import { useEffect, useRef, useState, type ReactNode } from "react";

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${seen ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------------- Ornaments ---------------- */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="gold-line h-px w-16 sm:w-28" />
      <svg width="58" height="20" viewBox="0 0 58 20" fill="none" className="text-gold">
        <path
          d="M29 2c3 5 8 6 11 8-3 2-8 3-11 8-3-5-8-6-11-8 3-2 8-3 11-8Z"
          fill="currentColor"
          opacity=".85"
        />
        <circle cx="8" cy="10" r="2.4" fill="currentColor" opacity=".7" />
        <circle cx="50" cy="10" r="2.4" fill="currentColor" opacity=".7" />
      </svg>
      <span className="gold-line h-px w-16 sm:w-28" />
    </div>
  );
}

export function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="text-center">
      {kicker && (
        <p className="font-sans text-[11px] uppercase tracking-[0.42em] text-maroon-soft/80">
          {kicker}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl text-maroon sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <Divider className="mt-5" />
      {subtitle && (
        <p className="mx-auto mt-5 max-w-2xl px-4 text-lg italic text-ink/70 sm:text-xl">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------- Corner flourishes ---------------- */
export function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={`text-gold/60 ${className}`} fill="none">
      <path
        d="M4 116V44C4 22 22 4 44 4h72"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M14 116V48c0-19 15-34 34-34h68"
        stroke="currentColor"
        strokeWidth="0.7"
        opacity=".7"
      />
      <path
        d="M44 14c0 10-8 18-18 18 10 0 18 8 18 18 0-10 8-18 18-18-10 0-18-8-18-18Z"
        fill="currentColor"
        opacity=".55"
      />
      <circle cx="18" cy="90" r="2.6" fill="currentColor" opacity=".6" />
      <circle cx="90" cy="18" r="2.6" fill="currentColor" opacity=".6" />
    </svg>
  );
}

/* ---------------- Falling petals ---------------- */
const PETAL_COLORS = ["#e8a33d", "#d8703f", "#c1912f", "#e6b8c2", "#8f2740"];

export function Petals({ count = 22 }: { count?: number }) {
  const petals = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 7 + Math.random() * 11,
      duration: 11 + Math.random() * 14,
      delay: -Math.random() * 20,
      drift: (Math.random() - 0.5) * 240,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      opacity: 0.35 + Math.random() * 0.4,
    })),
  ).current;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.68,
            background: p.color,
            opacity: p.opacity,
            borderRadius: "60% 0 60% 0",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
