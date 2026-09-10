import { useEffect, useMemo, useState } from "react";
import { GraduationCap, Users } from "lucide-react";
import Breadcrumb from "@/components/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { alumni, kategoriAlumni } from "@/data/alumni";
import { usePageMeta } from "@/hooks/use-page-meta";

const kategoriStyle = {
  Bekerja: "border-status-success/30 bg-status-success/10 text-status-success",
  Kuliah: "border-primary/30 bg-primary/10 text-primary",
  Wirausaha: "border-status-process/30 bg-status-process/10 text-status-process",
};

function AlumniPage() {
  const [kategori, setKategori] = useState("Semua");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterTarget, setFilterTarget] = useState(null);

  usePageMeta(
    "Alumni",
    "Jejak dan cerita inspiratif alumni SMK Negeri 2 Yogyakarta.",
  );

  const filteredAlumni = useMemo(
    () =>
      alumni.filter(
        (item) => kategori === "Semua" || item.kategori === kategori,
      ),
    [kategori],
  );

  useEffect(() => {
    if (!isFiltering || !filterTarget) return undefined;

    const timer = setTimeout(() => {
      setKategori(filterTarget);
      setFilterTarget(null);
      setIsFiltering(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [isFiltering, filterTarget]);

  const requestFilter = (nextKategori) => {
    if (nextKategori === kategori) return;
    setFilterTarget(nextKategori);
    setIsFiltering(true);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <Breadcrumb />
      <div className="mt-5 max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Komunitas SKADUTA
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Daftar Alumni SKADUTA
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          Cerita inspiratif alumni yang terus bertumbuh bersama bekal dari
          SKADUTA.
        </p>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
        {kategoriAlumni.map((item) => (
          <Button
            key={item}
            type="button"
            onClick={() => requestFilter(item)}
            variant={kategori === item ? "default" : "secondary"}
            className={`h-auto shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              kategori === item
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
            }`}
          >
            {item}
          </Button>
        ))}
      </div>

      <div
        className={`mt-8 transition-all duration-200 ease-out ${
          isFiltering
            ? "pointer-events-none translate-y-1 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredAlumni.map((item) => (
              <Card
                key={item.slug}
                className="h-full py-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col items-center p-5 text-center">
                  <Avatar className="size-24 border-4 border-background shadow-sm ring-1 ring-border">
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                      {item.name
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-base font-semibold">{item.name}</h2>
                  <p className="mt-1 min-h-10 text-sm leading-5 text-muted-foreground">
                    {item.role}
                  </p>
                  <Badge
                    variant="outline"
                    className={`mt-4 ${kategoriStyle[item.kategori]}`}
                  >
                    {item.kategori}
                  </Badge>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    <Badge variant="secondary">Lulus {item.tahunLulus}</Badge>
                    <Badge variant="outline" className="max-w-full truncate">
                      {item.jurusan}
                    </Badge>
                  </div>
                  <p className="mt-4 line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed py-0">
            <CardContent className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
              <Users className="mb-3 size-8 text-muted-foreground" />
              <h2 className="font-semibold">Belum ada data alumni</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Belum ada data alumni untuk kategori ini.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-14 flex items-start gap-3 rounded-2xl bg-muted/60 p-5 sm:p-6">
        <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" />
        <p className="text-sm leading-6 text-muted-foreground">
          Jejak alumni menjadi inspirasi bagi generasi SKADUTA untuk terus
          belajar, berkarya, dan memberi dampak.
        </p>
      </div>
    </div>
  );
}

export default AlumniPage;
