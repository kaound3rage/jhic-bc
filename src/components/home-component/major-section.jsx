import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { konsentrasiKeahlian } from "./data-major";
import MajorCard from "../major-component/major-card";

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
          <MajorCard key={item.slug} major={item} />
        ))}
      </div>
    </section>
  );
}

export default MajorSection;
