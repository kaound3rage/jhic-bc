import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { fasilitas } from "./data-facility";
import { ArrowRight } from "lucide-react";

function FacilitySection() {
  return (
    <section className="flex flex-col gap-6 py-18">
      <div className="flex items-end justify-between">
        <span className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Fasilitas</h1>

          <p className="text-sm text-muted-foreground">
            Laboratorium lengkap, ruang praktik standar industri, dan lingkungan
            belajar yang nyaman.
          </p>
        </span>

        <Button
          variant="ghost"
          className="text-primary hover:text-primary"
          asChild
        >
          <Link to="/fasilitas">Lihat Semua</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {fasilitas.slice(0, 3).map((item) => (
          <Card
            key={item.nama}
            className="mx-auto w-full max-w-sm overflow-hidden pt-0"
          >
            <img
              src={item.image}
              alt={item.nama}
              className="aspect-video w-full object-cover"
            />

            <CardHeader>
              <Badge className="w-fit border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
                Tersedia
              </Badge>

              <CardTitle>{item.nama}</CardTitle>
              <CardDescription>{item.deskripsi}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="group text-primary hover:text-primary"
              >
                <Link to="/">Lihat Detail</Link>
                <ArrowRight className="transition-transform duration-200 group-hover:scale-125 " />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FacilitySection;
