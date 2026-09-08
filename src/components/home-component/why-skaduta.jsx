import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowRight, Medal } from "lucide-react";

const stats = [
  { value: "2.8k+", label: "Siswa Aktif" },
  { value: "10", label: "Program Keahlian" },
  { value: "50+", label: "Mitra Industri" },
  { value: "95%", label: "Lulusan Kerja" },
  { value: "14", label: "Ekstrakurikuler" },
  { value: "25", label: "Lab & Bengkel" },
  { value: "128", label: "Tenaga Pendidikan" },
];

function WhySkaduta() {
  return (
    <>
      <section className="py-18 flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Kenapa SKADUTA?</h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-6">
            <p className="max-w-lg text-justify">
              Skaduta menghadirkan pendidikan kejuruan unggulan dengan kurikulum
              berbasis industri, fasilitas modern, serta penyaluran kerja
              terpercaya. Tak hanya keahlian teknis, kami juga mewadahi potensi,
              minat, dan kepemimpinan siswa melalui beragam organisasi serta
              kegiatan ekstrakurikuler untuk mencetak lulusan yang berkarakter
              dan siap bersaing.
            </p>
            <span className="flex items-center gap-2">
              <Button className={"px-4 py-5"}>
                <Link to={"/berita"}>Prestasi</Link>
                <Medal />
              </Button>
              <Button className={"px-4 py-5"} variant="outline">
                <Link to={"/berita"}>Fasilitas</Link>
                <ArrowRight />
              </Button>
            </span>
          </div>
          <Card className="w-150 h-50 p-5">
            <div className="grid grid-cols-4 gap-7 w-full h-full">
              {stats.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <h2 className="text-2xl font-bold text-black">
                    {item.value}
                  </h2>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

export default WhySkaduta;
