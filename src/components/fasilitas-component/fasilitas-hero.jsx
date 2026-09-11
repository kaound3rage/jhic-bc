// import { Building2 } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: "32+", label: "Fasilitas Aktif" },
  { value: "6", label: "Gedung Utama" },
  { value: "100%", label: "Standar Mutu" },
];

function FasilitasHero() {
  return (
    <header className="flex flex-col gap-8 mb-9 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {/* <Badge variant="secondary" className="gap-1.5 uppercase tracking-wide">
          <Building2 className="size-3.5" />
          Sarana & Prasarana
        </Badge> */}
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Fasilitas Sekolah
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Jelajahi berbagai sarana dan prasarana modern untuk mendukung
          pembelajaran, riset, kreativitas, dan olahraga di SMK Negeri 2
          Yogyakarta.
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
  );
}

export default FasilitasHero;
