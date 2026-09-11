import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";
import { jurusan } from "@/data/data-jurusan";
import MajorCard from "@/components/major-component/major-card";
const stats = [
  { value: "10", label: "Konsentrasi Aktif" },
  { value: "2.200+", label: "Siswa Aktif" },
  { value: "50+", label: "Guru Keahlian" },
];
function KonsentrasiKeahlianPage() {
  usePageMeta(
    "Konsentrasi Keahlian",
    "Jelajahi 10 konsentrasi keahlian di SMK Negeri 2 Yogyakarta (SKADUTA).",
  );
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <header className="mb-9 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Konsentrasi Keahlian
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Jelajahi 10 konsentrasi keahlian di SKADUTA. Setiap program
            disiapkan dengan kemitraan industri dan pembelajaran berbasis
            projek.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-96">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-muted/50 py-3 shadow-none">
              <CardContent className="px-3 text-center sm:px-4">
                <p className="text-xl font-semibold text-primary sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.65rem] text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jurusan.map((major) => (
          <MajorCard key={major.slug} major={major} />
        ))}
      </div>
      <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl bg-muted/50 p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
            <Compass className="size-5 text-primary" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              Bingung memilih program?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tim sekolah siap membantu memilih konsentrasi yang sesuai minat
              dan bakatmu.
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link to="/kontak" />}>
          Konsultasi ke Sekolah <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
export default KonsentrasiKeahlianPage;
