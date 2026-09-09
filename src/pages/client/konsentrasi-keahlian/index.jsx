import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { fetchMajors } from "@/data/majors-service";

function KonsentrasiKeahlianPage() {
  const [majors, setMajors] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      const { majors: list } = await fetchMajors();
      if (active) setMajors(list);
    }
    load();
    return () => {
      active = false;
    };
  }, []);

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

      {!majors ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {majors.map((major) => (
            <Link
              key={major.slug}
              to={`/konsentrasi-keahlian/${major.slug}`}
              className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Card className="h-full overflow-hidden pt-0 transition duration-300 group-hover:border-primary/50 group-hover:shadow-md">
                <img
                  src={major.fotoUrl}
                  alt={major.nama}
                  loading="lazy"
                  className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <CardHeader>
                  <CardTitle className="text-base">{major.nama}</CardTitle>
                  <CardDescription>{major.deskripsiSingkat}</CardDescription>
                </CardHeader>
                <CardContent className="pt-1">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Lihat detail
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

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