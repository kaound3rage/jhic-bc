import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function MajorCard({ major }) {
  const image = major.image ?? major.fotoUrl;
  const description = major.deskripsi ?? major.deskripsiSingkat;
  const capacity = major.dayaTampung ?? major.statistik?.jumlahSiswa;

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden">
      {/* <img
        src={image}
        alt={major.nama}
        className="aspect-video w-full object-cover"
      /> */}
      <Link
        to={`/konsentrasi-keahlian/${major.slug}`}
        className="overflow-hidden"
        aria-label={`Baca ${major.nama}`}
      >
        <img
          src={image}
          alt={major.nama}
          className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <CardHeader>
        <CardTitle>{major.nama}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <div className="flex items-center justify-between w-full">
          <p className="text-muted-foreground">
            Daya Tampung:{" "}
            <span className="font-bold text-foreground">{capacity}</span>
          </p>
          <Button
            variant="ghost"
            className="group text-primary hover:text-primary"
          >
            <Link to={`/konsentrasi-keahlian/${major.slug}`}>Lihat Detail</Link>
            <ArrowRight className="transition-transform duration-200 group-hover:scale-125 " />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MajorCard;
