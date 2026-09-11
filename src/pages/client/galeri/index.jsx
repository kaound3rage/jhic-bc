import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Lightbox, PhotoGrid } from "@/components/photo-gallery";
import { fotoGaleri, kategoriGaleri, tagGaleri } from "@/data/galeri";

const INITIAL_VISIBLE = 6;
const STEP = 6;

const socialLinks = [
  {
    name: "Instagram",
    handle: "@smkn2yogyakarta",
    icon: "https://cdn.simpleicons.org/instagram",
    href: "https://www.instagram.com/smkn2yogyakarta/",
  },
  {
    name: "YouTube",
    handle: "channel resmi SKADUTA",
    icon: "https://cdn.simpleicons.org/youtube",
    href: "https://www.youtube.com/channel/UC-XjCCMZosDiXzBEKiS6FBA/videos",
  },
];

function GaleriPage() {
  const [kategori, setKategori] = useState("Semua");
  const [tag, setTag] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterTarget, setFilterTarget] = useState(null);
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  usePageMeta(
    "Galeri",
    "Galeri foto kegiatan siswa, olahraga, seni & budaya, dan acara spesial di SMK Negeri 2 Yogyakarta.",
  );

  const filtered = useMemo(
    () =>
      fotoGaleri.filter(
        (foto) =>
          (kategori === "Semua" || foto.kategori === kategori) &&
          (!tag || foto.tag === tag),
      ),
    [kategori, tag],
  );

  // Fade out dulu, lalu ganti hasil filter, lalu fade in kembali.
  useEffect(() => {
    if (!isFiltering || !filterTarget) return;

    const timer = setTimeout(() => {
      setKategori(filterTarget.kategori);
      setTag(filterTarget.tag);
      setVisible(INITIAL_VISIBLE);
      setFilterTarget(null);
      setIsFiltering(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [isFiltering, filterTarget]);

  const requestFilter = (nextKategori, nextTag) => {
    setFilterTarget({ kategori: nextKategori, tag: nextTag });
    setIsFiltering(true);
  };

  const handleKategori = (value) => requestFilter(value, null);

  const handleTag = (value) => {
    const next = value === tag ? null : value;
    requestFilter(kategori, next);
  };

  const visiblePhotos = filtered.slice(0, visible);

  const navigateGallery = (next) => {
    setLightboxIndex(next < 0 ? visiblePhotos.length - 1 : next % visiblePhotos.length);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Galeri
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Dokumentasi kegiatan siswa, prestasi olahraga, pentas seni & budaya,
        serta berbagai acara spesial SMK Negeri 2 Yogyakarta.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {kategoriGaleri.map((item) => {
            const active = kategori === item.value;
            return (
              <Button
                key={item.value}
                type="button"
                onClick={() => handleKategori(item.value)}
                variant={active ? "default" : "secondary"}
                className={`h-auto shrink-0 cursor-pointer px-4 py-2 text-sm font-medium ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                }`}
              >
                {item.label}
              </Button>
            );
          })}
        </div>

        {tagGaleri.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => handleTag(null)}
              variant="outline"
              size="xs"
              className={`h-auto cursor-pointer px-3 py-1.5 text-xs font-medium ${
                tag === null
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              Semua
            </Button>
            {tagGaleri.map((tagItem) => {
              const active = tag === tagItem;
              return (
                <Button
                  key={tagItem}
                  type="button"
                  onClick={() => handleTag(tagItem)}
                  variant="outline"
                  size="xs"
                  className={`h-auto cursor-pointer px-3 py-1.5 text-xs font-medium ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {tagItem}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      <div
        className={`transition-all duration-200 ease-out ${
          isFiltering
            ? "pointer-events-none translate-y-1 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {visiblePhotos.length > 0 ? (
          <PhotoGrid
            photos={visiblePhotos}
            onOpen={(index) => setLightboxIndex(index)}
            gridClassName="mt-6 grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          />
        ) : (
          <Card className="mt-6 border-dashed py-0 text-sm text-muted-foreground">
            <CardContent className="p-8 text-center">
              Tidak ada foto pada kategori ini.
            </CardContent>
          </Card>
        )}

        {visible < filtered.length && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Menampilkan {visible} dari {filtered.length} foto
            </p>
            <Button
              variant="outline"
              onClick={() => setVisible((prev) => prev + STEP)}
              className="cursor-pointer px-6"
            >
              Lihat lebih banyak
            </Button>
          </div>
        )}
      </div>

      <section className="mt-14">
        <div className="rounded-2xl bg-muted/60 p-5 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            Lihat lebih banyak
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Ikuti media sosial resmi SMK Negeri 2 Yogyakarta untuk melihat
            dokumentasi dan informasi kegiatan terbaru.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {socialLinks.map((social) => (
              <Card
                key={social.name}
                className="group py-0 transition-all duration-200 hover:ring-2 hover:ring-primary/60 hover:shadow-md"
              >
                <CardContent className="p-0">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[#BAE6FD] bg-[#F0F9FF]">
                      <img src={social.icon} alt={social.name} className="size-6" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {social.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {social.handle}
                      </span>
                    </span>
                    <ArrowRight className="ml-auto size-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && visiblePhotos[lightboxIndex] && (
        <Lightbox
          photos={visiblePhotos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={navigateGallery}
        />
      )}
    </div>
  );
}

export default GaleriPage;
