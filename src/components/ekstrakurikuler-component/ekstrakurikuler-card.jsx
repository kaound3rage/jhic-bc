import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ImageOff, Trophy, User, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function getInitials(name) {
  return name
    .replace(/^(Coach|Mr\\.|Mrs\\.|Bp\\.|Ibu|Dr\\.|Ir\\.)\\s+/i, "")
    .split(/\\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function EkstrakurikulerCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Card className="h-full gap-0 py-0 transition-shadow hover:shadow-md">
      <div className="relative aspect-video overflow-hidden bg-muted/60">
        <Badge variant="outline" className="absolute left-3 top-3 z-10 bg-background/95">
          {item.kategori}
        </Badge>
        {imageFailed ? (
          <div className="flex h-full items-center justify-center text-muted-foreground" role="img" aria-label={`Placeholder foto ${item.nama}`}>
            <div className="flex flex-col items-center gap-2 text-xs">
              <ImageOff className="size-6" />
              Foto kegiatan belum tersedia
            </div>
          </div>
        ) : (
          <img
            src={item.gambar}
            alt={`Kegiatan ${item.nama}`}
            className="size-full object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
        {item.prestasi && (
          <Badge className="absolute bottom-3 right-3 bg-background/95 text-foreground hover:bg-background">
            <Trophy className="text-amber-500" />
            {item.prestasi}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-4">
        <h2 className="text-base font-semibold">{item.nama}</h2>
        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {item.deskripsi}
        </p>
        <Separator className="my-3" />
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2"><CalendarDays className="size-3.5 shrink-0" />{item.jadwal}</div>
          <div className="flex items-center gap-2"><User className="size-3.5 shrink-0" /><Avatar size="sm"><AvatarFallback>{getInitials(item.pembina)}</AvatarFallback></Avatar><span>{item.pembina}</span></div>
          <div className="flex items-center gap-2"><Users className="size-3.5 shrink-0" />{item.jumlahAnggota} Anggota Aktif</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {item.slug ? (
            <Button variant="outline" size="sm" render={<Link to={`/ekstrakurikuler/${item.slug}`} />}>
              Lihat Detail
            </Button>
          ) : (
            <Button variant="outline" size="sm" type="button" disabled>
              Detail Segera
            </Button>
          )}
          <Button size="sm" type="button" className="bg-slate-900 text-white hover:bg-slate-800">Daftar</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EkstrakurikulerCard;
