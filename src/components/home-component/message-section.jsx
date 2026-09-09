import { ArrowRight, GraduationCap, Quote } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";

function MessageSection() {
  return (
    <section className="py-18 flex flex-col gap-6 relative">
      <span className="p-3 border rounded-full absolute right-0 translate-x-5 translate-y-6 z-10 bg-background rotate-180">
        <Quote className="size-10 fill-primary text-primary" />
      </span>
      <h1 className="font-bold text-2xl">Sambutan Kepala Sekolah</h1>
      <Card className="p-0 flex flex-row overflow-hidden">
        <div className="flex-1 flex flex-col items-start gap-5 p-6">
          <h1 className="font-bold text-xl">
            Selamat Datang di Website Resmi SMK Negeri 2 Yogyakarta
          </h1>

          <p className="max-w-2xl text-justify text-muted-foreground flex flex-col">
            <span className="text-foreground mb-3">
              Assalamu'alaikum wr.wb.
            </span>
            Puji syukur kepada Alloh SWT, Tuhan Yang Maha Esa yang telah
            memberikan rahmat dan anugerahNya sehingga website SMK Negeri 2
            Yogyakarta ini dapat terbit. Salah satu tujuan dari website ini
            adalah untuk menjawab akan setiap kebutuhan informasi dengan
            memanfaatkan sarana teknologi informasi yang ada. Kami sadar
            sepenuhnya dalam rangka memajukan pendidikan di era berkembangnya
            Teknologi Informasi yang begitu pesat, sangat diperlukan berbagai
            sarana prasarana yang kondusif, kebutuhan berbagai informasi siswa,
            guru, orangtua maupun masyarakat, sehingga kami berusaha mewujudkan
            hal tersebut semaksimal mungkin. Semoga dengan adanya website ini
            dapat membantu dan bermanfaat, terutama informasi yang berhubungan
            dengan pendidikan, ilmu pengetahuan dan informasi seputar SMK Negeri
            2 Yogyakarta.
          </p>
          <Button
            className={
              "px-4 py-5 bg-primary-foreground text-primary hover:bg-primar"
            }
            variant="secondary"
          >
            <Link>Baca Selengkapnya</Link>
            <ArrowRight />
          </Button>
        </div>
        <div className="w-[35%] shrink-0 relative">
          <div className="absolute flex items-center gap-4 p-3 rounded-xl border bg-background z-10 bottom-0 -translate-x-12 -translate-y-6 w-50">
            <GraduationCap className="text-primary" />
            <span>
              <p className="text-muted-foreground text-xs">Kepala Sekolah</p>
              <h1 className="font-semibold">Drs. Moh Rokhis</h1>
            </span>
          </div>
          <img
            src="/moh_rokhis.webp"
            alt="Kepala Sekolah SMK Negeri 2 Yogyakarta"
            className="w-full h-100 object-cover"
          />
        </div>
      </Card>
    </section>
  );
}

export default MessageSection;
