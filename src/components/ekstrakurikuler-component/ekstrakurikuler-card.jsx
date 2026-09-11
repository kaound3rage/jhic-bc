import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ImageOff, Trophy, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const categoryStyles = {
  "Olahraga & Petualangan": "border-green-200 bg-green-50 text-green-700",
  "Seni & Musik": "border-purple-200 bg-purple-50 text-purple-700",
  "Akademik & Sains": "border-blue-200 bg-blue-50 text-blue-700",
  "Teknologi & Media": "border-cyan-200 bg-cyan-50 text-cyan-700",
  Olahraga: "border-orange-200 bg-orange-50 text-orange-700",
  "Organisasi & Kepemimpinan": "border-yellow-200 bg-yellow-50 text-yellow-700",
  "Kesehatan & Sosial": "border-red-200 bg-red-50 text-red-700",
  "Media & Jurnalistik": "border-indigo-200 bg-indigo-50 text-indigo-700",
  "Seni & Kreativitas": "border-pink-200 bg-pink-50 text-pink-700",
  "Seni & Budaya": "border-violet-200 bg-violet-50 text-violet-700",
};

function EkstrakurikulerCard({ item, hasDetail }) {
  const [imageFailed, setImageFailed] = useState(false);

  const description = Array.isArray(item.deskripsi)
    ? item.deskripsi[0]
    : item.deskripsi;

  const image = item.gambar ?? item.fotoUrl;

  return (
    <Card className="h-full gap-0 py-0">
      <div className="relative aspect-video overflow-hidden bg-muted/60">
        {imageFailed ? (
          <div
            className="flex h-full items-center justify-center text-muted-foreground"
            role="img"
            aria-label={`Placeholder foto ${item.nama}`}
          >
            <div className="flex flex-col items-center gap-2 text-xs">
              <ImageOff className="size-6" />
              Foto kegiatan belum tersedia
            </div>
          </div>
        ) : (
          <img
            src={image}
            alt={`Kegiatan ${item.nama}`}
            className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}

        {item.prestasi && (
          <Badge className="absolute right-3 bottom-3 bg-background/95 text-foreground hover:bg-background">
            <Trophy className="text-amber-500" />
            {item.prestasi}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-4">
        <Badge
          variant="outline"
          className={`mb-3 w-fit ${
            categoryStyles[item.kategori] ??
            "border-border bg-muted text-foreground"
          }`}
        >
          {item.kategori}
        </Badge>

        <h2 className="text-base font-semibold">{item.nama}</h2>

        <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {description}
        </p>

        <Separator className="my-3" />

        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-3.5 shrink-0" />
            <span>{item.jadwal}</span>
          </div>

          <div className="flex items-center gap-2">
            <User className="size-3.5 shrink-0" />
            <span>{item.pembina}</span>
          </div>

          {item.instagram && (
            <div className="flex items-center gap-2">
              <img
                src="https://cdn.simpleicons.org/instagram"
                alt=""
                className="size-3.5 opacity-60 grayscale"
              />
              <span>{item.instagram}</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          {hasDetail ? (
            <Button
              variant="outline"
              size="sm"
              render={<Link to={`/ekstrakurikuler/${item.slug}`} />}
            >
              Lihat Detail
            </Button>
          ) : (
            <Button variant="outline" size="sm" type="button" disabled>
              Detail Segera
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default EkstrakurikulerCard;
