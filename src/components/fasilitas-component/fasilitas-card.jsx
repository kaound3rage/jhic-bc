import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FasilitasCard({ fasilitas }) {
  const categoryColors = {
    "Akademik & Riset":
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
    Olahraga:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",
    "Seni & Pertunjukan":
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
    "Teknologi & Multimedia":
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",
    Kesehatan:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
    "Layanan Siswa":
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  };

  return (
    <Card className="flex h-full flex-col justify-between gap-0 py-0">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={fasilitas.gambar}
          alt={fasilitas.nama}
          className="size-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />

        <Badge
          variant="outline"
          className={`absolute top-3 left-3 text-[0.65rem] shadow-sm backdrop-blur ${
            categoryColors[fasilitas.kategori] ||
            "border-border bg-background/90 text-foreground"
          }`}
        >
          {fasilitas.kategori}
        </Badge>
      </div>

      <CardHeader className="flex min-h-28 flex-col justify-between gap-4 p-4">
        <CardTitle className="line-clamp-2 text-base font-semibold leading-snug">
          {fasilitas.nama}
        </CardTitle>

        <CardDescription>{fasilitas.deskripsi}</CardDescription>
      </CardHeader>

      <CardContent className="p-5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span>{fasilitas.lokasi}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default FasilitasCard;
