import { useEffect, useMemo, useRef, useState } from "react";
import {
  Compass,
  Feather,
  Flame,
  HeartPulse,
  Mountain,
  Music,
  PenLine,
  ShieldCheck,
  Trophy,
  Users,
  Volleyball,
  Zap,
} from "lucide-react";
import { cn } from "cn";
import { ekstrakurikulerData } from "@/data/ekstrakurikuler";

const CROSSFADE_MS = 350;

const ICONS_BY_SLUG = {
  "osis-mpk": Users,
  tmc: Mountain,
  "kidung-aji-saka": Music,
  "kuli-tinta": PenLine,
  pmr: HeartPulse,
  "dewan-ambalan": Compass,
  pks: ShieldCheck,
  "wsp-tonti": Flame,
  "pencak-silat": Zap,
  "sepak-bola-futsal": Trophy,
  "bola-voli": Volleyball,
  bulutangkis: Feather,
};

function EkstrakurikulerShowcase({ data = ekstrakurikulerData }) {
  const items = useMemo(() => data.flatMap((category) => category.items), [data]);

  const categories = useMemo(
    () =>
      data.reduce((acc, category) => {
        const previous = acc[acc.length - 1];
        acc.push({
          ...category,
          startIndex: (previous?.startIndex ?? 0) + (previous?.items.length ?? 0),
        });
        return acc;
      }, []),
    [data],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!fading) return;
    timerRef.current = window.setTimeout(() => {
      setDisplayedIndex(activeIndex);
      setFading(false);
    }, CROSSFADE_MS);
    return () => window.clearTimeout(timerRef.current);
  }, [fading, activeIndex]);

  const selectEkskul = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setFading(true);
  };

  if (items.length === 0) return null;

  const active = items[activeIndex];
  const displayed = items[displayedIndex];

  return (
    <div className="flex flex-col gap-8">
      {/* Foto Besar (featured) */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10">
        {/* Lapisan gambar yang sedang ditampilkan */}
        <img
          src={displayed.fotoUrl}
          alt={displayed.fotoAlt}
          loading="lazy"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out duration-[350ms]",
            fading ? "opacity-0" : "opacity-100",
          )}
        />
        {/* Lapisan gambar baru (crossfade masuk) */}
        {fading && (
          <img
            src={active.fotoUrl}
            alt={active.fotoAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover animate-in fade-in-0 [animation-duration:350ms] ease-in-out"
          />
        )}

        {/* Overlay gradient agar teks tetap terbaca */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

        {/* Teks nama ekskul (crossfade bersamaan dengan gambar) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center sm:px-8">
          <div
            className={cn(
              "flex w-full flex-col items-center gap-1.5 transition-opacity ease-in-out duration-[350ms] sm:gap-2",
              fading ? "opacity-0" : "opacity-100",
            )}
          >
            <h2 className="font-bold text-3xl tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              {displayed.nama}
            </h2>
            <p className="max-w-2xl text-sm text-white/85 text-pretty sm:text-base">
              {displayed.deskripsi}
            </p>
          </div>

          {fading && (
            <div className="absolute inset-0 flex w-full flex-col items-center justify-center gap-1.5 px-4 sm:gap-2 animate-in fade-in-0 [animation-duration:350ms]">
              <h2 className="font-bold text-3xl tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {active.nama}
              </h2>
              <p className="max-w-2xl text-sm text-white/85 text-pretty sm:text-base">
                {active.deskripsi}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* List Box-Box Kecil (selector) */}
      <div className="flex flex-col gap-6">
        {categories.map((category) => {
          return (
            <div key={category.kategori} className="flex flex-col gap-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="h-4 w-1 rounded-full bg-primary" />
                {category.kategori}
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {category.items.map((item, index) => {
                  const itemIndex = category.startIndex + index;
                  const isActive = itemIndex === activeIndex;
                  const Icon = ICONS_BY_SLUG[item.slug] ?? ShieldCheck;

                  return (
                    <button
                      key={item.slug}
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => selectEkskul(itemIndex)}
                      onFocus={() => selectEkskul(itemIndex)}
                      onClick={() => selectEkskul(itemIndex)}
                      className={cn(
                        "group flex cursor-pointer flex-col items-center gap-2.5 rounded-xl bg-card p-3.5 ring-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-4",
                        isActive
                          ? "bg-primary/5 shadow-md ring-2 ring-primary/70"
                          : "ring-foreground/10 shadow-sm hover:bg-primary/5 hover:shadow-md hover:ring-primary/50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors sm:h-11 sm:w-11",
                          isActive
                            ? "border-[#BAE6FD] bg-[#F0F9FF] text-primary"
                            : "border-border text-muted-foreground group-hover:border-[#BAE6FD] group-hover:bg-[#F0F9FF] group-hover:text-primary",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={cn(
                          "text-xs leading-snug font-medium transition-colors sm:text-sm",
                          isActive ? "text-primary" : "text-foreground",
                        )}
                      >
                        {item.nama}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EkstrakurikulerShowcase;