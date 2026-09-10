import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { getEkstrakurikulerBySlug } from "@/data/ekstrakurikuler";
import { Lightbox, PhotoGrid } from "@/components/photo-gallery";
import { cn } from "cn";

function EkstrakurikulerDetailView({ item }) {
  const [activeTab, setActiveTab] = useState("visi");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const galleryPhotos = item.galeri.map((src, index) => ({
    id: `${item.slug}-galeri-${index}`,
    src,
    alt: `Galeri kegiatan ${item.nama} ${index + 1}`,
  }));

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
    setLightboxIndex(
      next < 0 ? galleryPhotos.length - 1 : next % galleryPhotos.length,
    );
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
            { label: item.nama },
          ]}
        />
      </div>

      {/* HERO BANNER */}
      <div className="relative h-64 overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10 sm:h-80 lg:h-104">
        <img
          src={item.heroImage}
          alt={item.fotoAlt}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-black/10" />
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
              <p key={index} className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
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
                    className={cn(
                      "flex cursor-pointer items-center gap-1.5 pb-3 text-sm font-semibold transition-colors border-b-2",
                      isActive
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground",
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
                  className="animate-in fade-in-0 slide-in-from-bottom-2 animation-duration-[300ms]"
                >
                  <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">{item.visi}</p>
                </div>
              ) : (
                <ol
                  key="misi"
                  className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 animation-duration-[300ms]"
                >
                  {item.misi.map((mission, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-6 text-muted-foreground">
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
        <div className="mt-6">
          <PhotoGrid
            photos={galleryPhotos}
            onOpen={(index) => setLightboxIndex(index)}
            gridClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-muted/50 p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:p-8">
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
      {lightboxIndex !== null && galleryPhotos[lightboxIndex] && (
        <Lightbox
          photos={galleryPhotos}
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