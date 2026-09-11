import densoLogo from "../assets/industry/denso_logo.webp";
import indonesiaIndicatorLogo from "../assets/industry/indonesia_indicator.webp";
import komatsuLogo from "../assets/industry/komatsu.png";
import samsungLogo from "../assets/industry/samsung.png";
import CodingLogo from "../assets/industry/cc.png";
import GamaLogo from "../assets/industry/gama.png";
import { Badge } from "./ui/badge";

const industryLogos = [
  { name: "Denso", src: densoLogo },
  { name: "Indonesia Indicator", src: indonesiaIndicatorLogo },
  { name: "Komatsu", src: komatsuLogo },
  { name: "Samsung", src: samsungLogo },
  { name: "Coding Collective", src: CodingLogo },
  { name: "Gamatechno", src: GamaLogo },
];

// Ulangi daftar logo beberapa kali agar satu set track selalu lebih lebar
// dari viewport, sehingga animasi marquee berjalan mulus tanpa ruang kosong.
const marqueeItems = Array.from({ length: 3 }, () => industryLogos).flat();

function LogoCard({ logo }) {
  return (
    <div className="group/card flex h-20 w-40 shrink-0 items-center justify-center rounded-xl p-3 transition-all duration-300 hover:-translate-y-1.5 sm:h-24 sm:w-52">
      <img
        src={logo.src}
        alt={logo.name}
        loading="lazy"
        className="h-full w-full object-contain opacity-60 grayscale transition-all duration-300 group-hover/card:grayscale-0"
      />
    </div>
  );
}

function IndustrySlider() {
  return (
    <>
      <section className="w-full bg-linear-to-b from-background py-18">
        <div className="mx-auto flex max-w-295 flex-col items-center gap-3 px-4 text-center">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary-foreground text-primary"
          >
            Mitra Industri
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Dipercaya oleh{" "}
            <span className="text-primary">Industri Terkemuka</span>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Melalui kemitraan dengan perusahaan industri, siswa kami mendapatkan
            pengalaman nyata dan bekal kompetensi untuk siap bersaing di dunia
            kerja.
          </p>
        </div>

        <div className="group/marquee relative mt-10 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee group-hover/marquee:paused">
            {[0, 1].map((half) => (
              <div
                key={half}
                aria-hidden={half === 1 || undefined}
                className="flex items-center gap-4 pr-4 sm:gap-6 sm:pr-6"
              >
                {marqueeItems.map((logo, index) => (
                  <LogoCard key={`${logo.name}-${index}`} logo={logo} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default IndustrySlider;
