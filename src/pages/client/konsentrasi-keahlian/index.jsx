import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { jurusan } from "@/data/data-jurusan";
import MajorCard from "@/components/major-component/major-card";

function KonsentrasiKeahlianPage() {
  usePageMeta(
    "Konsentrasi Keahlian",
    "Jelajahi 10 konsentrasi keahlian di SMK Negeri 2 Yogyakarta (SKADUTA).",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        <Breadcrumb />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Konsentrasi Keahlian
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Jelajahi 10 konsentrasi keahlian di SKADUTA. Setiap program disiapkan
          dengan kemitraan industri dan pembelajaran berbasis projek.
        </p>
      </div>

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
          Konsultasi ke Sekolah
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default KonsentrasiKeahlianPage;
