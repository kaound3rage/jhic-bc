import { fotoGaleri } from "@/data/galeri";

function GallerySection() {
  const loopingPhotos = [...fotoGaleri, ...fotoGaleri];

  return (
    <section
      className="relative left-1/2 h-82.5 w-screen -translate-x-1/2 overflow-hidden bg-muted pt-12"
      aria-labelledby="gallery-heading"
    >
      <div className="px-4 text-center">
        <p className="text-sm font-normal text-muted-foreground">
          Yuk, mengenal lebih dalam tentang Skaduta
        </p>

        <h2
          id="gallery-heading"
          className="mt-1 text-2xl font-bold sm:text-3xl"
        >
          Galeri foto kegiatan SMK Negeri 2 Yogyakarta
        </h2>
      </div>

      <div className="absolute bottom-0 left-0 h-40 w-full overflow-hidden">
        <div className="flex h-full w-max animate-marquee animation-duration-[120s] will-change-transform motion-reduce:animate-none">
          {loopingPhotos.map((photo, index) => {
            const isDuplicate = index >= fotoGaleri.length;

            return (
              <div
                key={`${photo.id}-${index}`}
                className="h-full shrink-0 px-0.5"
                aria-hidden={isDuplicate || undefined}
              >
                <img
                  src={photo.imageUrl}
                  alt={isDuplicate ? "" : photo.caption}
                  className="h-full w-full object-cover aspect-4/3"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;