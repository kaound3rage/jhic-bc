import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "24", label: "Ekskul Aktif" },
  { value: "4", label: "Kategori Utama" },
  { value: "850+", label: "Siswa Bergabung" },
];

function EkstrakurikulerHero() {
  return (
    <header className="flex flex-col gap-7 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <Badge variant="outline" className="mb-4 border-primary/25 bg-primary/5 text-primary">
          <MapPin />
          PUSAT TALENTA & PRESTASI
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Ekstrakurikuler
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Kembangkan potensi, minat, dan bakatmu bersama ragam kegiatan ekstrakurikuler unggulan di SMK Negeri 2 Yogyakarta.
        </p>
      </div>

      <div className="flex w-full items-center rounded-xl border bg-card p-4 shadow-sm lg:w-auto lg:min-w-95">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-1 items-center justify-center gap-4 px-2 first:pl-0 last:pr-0">
            {index > 0 && <Separator orientation="vertical" className="h-10" />}
            <div className="min-w-0">
              <div className="text-2xl font-semibold tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}

export default EkstrakurikulerHero;
