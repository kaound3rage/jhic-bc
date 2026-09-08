import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { konsentrasiKeahlian } from "./data-major";
import { ArrowRight } from "lucide-react";

function MajorSection() {
  return (
    <section className="py-18 flex flex-col gap-6">
      <div className="flex items-end justify-between">
        <span className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Konsentrasi Keahlian</h1>
          <p className="text-sm text-muted-foreground">
            Pilih kompetensi sesuai minat dan potensi. Semua program disiapkan
            dengan kemitraan industri dan pembelajaran berbasis projek.
          </p>
        </span>

        <Button
          variant="ghost"
          className="text-primary hover:text-primary"
          asChild
        >
          <Link to="/konsentrasi-keahlian">Lihat Semua</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {konsentrasiKeahlian.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.nama}
              className="aspect-video w-full object-cover"
            />

            <CardHeader>
              <CardTitle>{item.nama}</CardTitle>
              <CardDescription>{item.deskripsi}</CardDescription>
            </CardHeader>

            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <p className="text-muted-foreground">
                  Daya Tampung:{" "}
                  <span className="font-bold text-foreground">
                    {item.dayaTampung}
                  </span>
                </p>
                <Button
                  variant="ghost"
                  className="group text-primary hover:text-primary"
                >
                  <Link to="/">Lihat Detail</Link>
                  <ArrowRight className="transition-transform duration-200 group-hover:scale-125 " />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default MajorSection;
