import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ekstrakurikulerData } from "@/data/ekstrakurikuler";

function EkstrakurikulerPage() {
  usePageMeta(
    "Ekstrakurikuler",
    "Jelajahi 12 ekstrakurikuler dan organisasi siswa di SMK Negeri 2 Yogyakarta (SKADUTA).",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        <Breadcrumb />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ekstrakurikuler
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Jelajahi 12 ekstrakurikuler dan organisasi siswa di SKADUTA. Setiap
          kegiatan dibina untuk mengembangkan potensi, karakter, dan prestasi
          siswa.
        </p>
      </div>

      <div className="space-y-12">
        {ekstrakurikulerData.map((category) => (
          <section key={category.kategori}>
            <div className="flex items-center gap-3">
              <span className="h-6 w-1 rounded-full bg-primary" />
              <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                {category.kategori}
              </h2>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <Link
                  key={item.slug}
                  to={`/ekstrakurikuler/${item.slug}`}
                  className="group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  <Card className="h-full overflow-hidden pt-0 transition duration-300 group-hover:border-primary/50 group-hover:shadow-md">
                    <img
                      src={item.fotoUrl}
                      alt={item.fotoAlt ?? item.nama}
                      loading="lazy"
                      decoding="async"
                      className="aspect-video w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <CardHeader>
                      <CardTitle className="text-base">{item.nama}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.deskripsi[0]}
                      </CardDescription>
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
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-muted/50 p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
            <Compass className="size-5 text-primary" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              Bingung memilih ekstrakurikuler?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hubungi tim sekolah untuk informasi jadwal, pembina, dan cara
              bergabung.
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link to="/kontak" />}>
          Kontak Sekolah
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default EkstrakurikulerPage;