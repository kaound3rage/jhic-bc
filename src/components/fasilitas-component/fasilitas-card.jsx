import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function FasilitasCard({ fasilitas }) {
  return (
    <Card className="h-full gap-0 py-0 shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={fasilitas.gambar}
          alt={fasilitas.nama}
          className="size-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/90 text-[0.65rem] shadow-sm backdrop-blur"
        >
          {fasilitas.kategori}
        </Badge>
      </div>
      <CardContent className="flex min-h-28 flex-col justify-between gap-4 p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-snug">
          {fasilitas.nama}
        </h2>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-primary" />
          <span>{fasilitas.lokasi}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default FasilitasCard;
