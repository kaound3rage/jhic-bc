import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import FasilitasCard from "../fasilitas-component/fasilitas-card";
import { fasilitasList } from "../fasilitas-component/data-fasilitas";

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
        {fasilitasList.slice(0, 3).map((item) => (
          <FasilitasCard key={item.id} fasilitas={item} />
        ))}
      </div>
    </section>
  );
}

export default FacilitySection;
