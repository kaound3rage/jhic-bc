import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "cn";

export function PhotoGrid({ photos, onOpen, gridClassName }) {
  return (
    <div className={cn("grid gap-3", gridClassName)}>
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          type="button"
          aria-label={photo.alt ?? `Buka foto ${index + 1}`}
          onClick={() => onOpen(index)}
          className="group relative cursor-pointer overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-all duration-200 animate-in fade-in-0 hover:ring-2 hover:ring-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [animation-duration:350ms]"
        >
          <img
            src={photo.imageUrl ?? photo.src}
            alt={photo.alt ?? photo.caption ?? `Foto kegiatan ${index + 1}`}
            loading="lazy"
            decoding="async"
            className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        </button>
      ))}
    </div>
  );
}

export function Lightbox({ photos, index, onClose, onNavigate }) {
  const photo = photos[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNavigate(index + 1);
      if (event.key === "ArrowLeft") onNavigate(index - 1);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      className="fixed inset-0 z-[70] flex animate-in fade-in-0 items-center justify-center bg-black/90 p-4 [animation-duration:200ms]"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Tutup galeri"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Foto sebelumnya"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(index - 1);
        }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex max-h-[88vh] max-w-4xl flex-col items-center" onClick={(event) => event.stopPropagation()}>
        {photo && (
          <img
            key={photo.id ?? index}
            src={photo.imageUrl ?? photo.src}
            alt={photo.alt ?? photo.caption ?? `Foto galeri ke-${index + 1}`}
            className="max-h-[76vh] max-w-full rounded-xl object-contain animate-in zoom-in-95 fade-in-0 shadow-2xl [animation-duration:200ms]"
          />
        )}
        {(photo?.caption || photo?.tanggal) && (
          <div className="mt-4 max-w-full px-4 text-center animate-in fade-in-0 [animation-duration:200ms]">
            {photo?.caption && (
              <p className="text-base font-medium text-white">{photo.caption}</p>
            )}
            {photo?.tanggal && (
              <p className="mt-1 text-sm text-white/70">{photo.tanggal}</p>
            )}
          </div>
        )}
        <span className="mt-3 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
          {index + 1} / {photos.length}
        </span>
      </div>

      <button
        type="button"
        aria-label="Foto berikutnya"
        onClick={(event) => {
          event.stopPropagation();
          onNavigate(index + 1);
        }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}