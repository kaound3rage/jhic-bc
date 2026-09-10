import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Compass, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getEkstrakurikulerBySlug } from "@/data/ekstrakurikuler";

function Lightbox({ images, index, onClose, onNavigate }) {
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
      aria-label="Galeri foto kegiatan"
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

      <img
        key={index}
        src={images[index]}
        alt={`Foto galeri ke-${index + 1}`}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[82vh] max-w-full rounded-xl object-contain animate-in zoom-in-95 fade-in-0 shadow-2xl [animation-duration:200ms]"
      />

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

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
        {index + 1} / {images.length}
      </span>
    </div>
  );
}

function EkstrakurikulerDetailView({ item }) {
  const [activeTab, setActiveTab] = useState("visi");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Preload gambar galeri & hero agar lightbox tidak kosong saat dibuka.
  useEffect(() => {
    const preloaded = [item.heroImage, ...item.galeri].map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });
    return () => {
      preloaded.forEach((image) => {
        image.src = "";
      });
    };
  }, [item]);

  const navigateGallery = (next) => {
    setLightboxIndex(next < 0 ? item.galeri.length - 1 : next % item.galeri.length);
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
            { label: item.nama },
          ]}
        />
      </div>

      {/* HERO BANNER */}
      <div className="relative h-64 overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10 sm:h-80 lg:h-[26rem]">
        <img
          src={item.heroImage}
          alt={item.fotoAlt}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-12">
          <Badge className="border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/15">
            {item.kategori}
          </Badge>
          <h1 className="mt-4 max-w-3xl font-bold tracking-tight text-white text-balance text-3xl sm:text-4xl lg:text-5xl">
            {item.judulLengkap}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
            {item.tagline}
          </p>
        </div>
      </div>

      {/* TENTANG + VISI & MISI */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
        <div>
          <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
            <span className="h-6 w-1 rounded-full bg-primary" />
            Tentang {item.nama}
          </h2>
          <div className="mt-5 space-y-4">
            {item.deskripsi.map((paragraph, index) => (
              <p key={index} className="text-justify text-[15px] leading-7 text-foreground/90">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-secondary p-5 shadow-sm ring-1 ring-foreground/10 sm:p-6">
            <div className="flex items-center gap-6 border-b border-border">
              {[
                { key: "visi", label: "Visi" },
                { key: "misi", label: "Misi" },
              ].map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTab(tab.key)}
                    className={cnTab(
                      isActive,
                      "flex cursor-pointer items-center gap-1.5 pb-3 text-sm font-semibold transition-colors",
                    )}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 min-h-44">
              {activeTab === "visi" ? (
                <div
                  key="visi"
                  className="animate-in fade-in-0 slide-in-from-bottom-2 [animation-duration:300ms]"
                >
                  <p className="text-[15px] leading-7 text-foreground/90">{item.visi}</p>
                </div>
              ) : (
                <ol
                  key="misi"
                  className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 [animation-duration:300ms]"
                >
                  {item.misi.map((mission, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-6 text-foreground/90">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      {mission}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* GALERI KEGIATAN */}
      <div className="mt-14">
        <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
          <span className="h-6 w-1 rounded-full bg-primary" />
          Galeri Kegiatan {item.nama}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Klik pada foto untuk melihat tampilan lebih besar.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {item.galeri.map((src, index) => (
            <button
              key={src}
              type="button"
              aria-label={`Buka foto galeri ${index + 1}`}
              onClick={() => setLightboxIndex(index)}
              className="group cursor-pointer overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-all duration-200 hover:ring-2 hover:ring-primary/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <img
                src={src}
                alt={`Galeri kegiatan ${item.nama} ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-muted/50 p-6 ring-1 ring-foreground/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
            <Compass className="size-5 text-primary" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              Tertarik bergabung dengan {item.nama}?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hubungi kami untuk informasi pendaftaran dan jadwal kegiatan.
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link to="/kontak" />}>
          Hubungi Sekolah
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && item.galeri[lightboxIndex] && (
        <Lightbox
          images={item.galeri}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateGallery}
        />
      )}
    </section>
  );
}

function EkstrakurikulerDetailPage() {
  const { slug } = useParams();
  const item = getEkstrakurikulerBySlug(slug);

  usePageMeta(
    item ? item.judulLengkap : "Ekstrakurikuler",
    item ? item.tagline : "Ekstrakurikuler SMK Negeri 2 Yogyakarta.",
  );

  if (!item) {
    return (
      <section className="flex min-h-96 w-full flex-col items-center justify-center gap-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Ekstrakurikuler tidak ditemukan</h1>
        <Button variant="outline" render={<Link to="/ekstrakurikuler" />}>
          Kembali ke Ekstrakurikuler
        </Button>
      </section>
    );
  }

  return <EkstrakurikulerDetailView item={item} />;
}

export default EkstrakurikulerDetailPage;
export { EkstrakurikulerDetailView };

function cnTab(isActive, base) {
  return `${base} ${
    isActive
      ? "border-b-2 border-primary text-primary"
      : "border-b-2 border-transparent text-muted-foreground hover:text-foreground"
  }`;
}