import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

const newsItems = [
  {
    id: 1,
    date: "08 September 2026",
    author: "Admin",
    type: "Prestasi",
    title: "SKADUTA Raih Juara LKS Tingkat Provinsi",
    description:
      "Siswa SMK Negeri 2 Yogyakarta kembali menorehkan prestasi membanggakan dalam ajang Lomba Kompetensi Siswa tingkat provinsi.",
    image: "/pjs.png",
    slug: "skaduta-raih-juara-lks-tingkat-provinsi",
  },
  {
    id: 2,
    date: "03 September 2026",
    author: "Admin",
    type: "Kegiatan",
    title: "Kolaborasi Pembelajaran Bersama Mitra Industri",
    description:
      "Program pembelajaran bersama mitra industri memberikan pengalaman kerja nyata bagi siswa sesuai bidang keahlian.",
    image: "/sekolah.webp",
    slug: "kolaborasi-pembelajaran-bersama-mitra-industri",
  },
  {
    id: 3,
    date: "27 Agustus 2026",
    author: "Admin",
    type: "Pengumuman",
    title: "Informasi Pendaftaran Peserta Didik Baru",
    description:
      "Simak informasi terbaru mengenai jadwal, persyaratan, dan tahapan penerimaan peserta didik baru di SKADUTA.",
    image: "/sija.png",
    slug: "informasi-pendaftaran-peserta-didik-baru",
  },
];

function NewsSection() {
  const getBadgeStyle = (type) => {
    switch (type) {
      case "Prestasi":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-600";

      case "Kegiatan":
        return "border-blue-500/30 bg-blue-500/10 text-blue-600";

      case "Pengumuman":
        return "border-red-500/30 bg-red-500/10 text-red-600";

      default:
        return "border-primary/20 bg-primary/10 text-primary";
    }
  };

  return (
    <section className="flex flex-col gap-6 py-18">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Berita Terkini</h1>

          <p className="text-sm text-muted-foreground">
            Tetap terhubung dengan berbagai informasi dan prestasi terkini
            dari sekolah kami.
          </p>
        </div>

        <Button
          variant="ghost"
          className="text-primary hover:text-primary"
          asChild
        >
          <Link to="/berita">Lihat Semua</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <Card
            key={item.id}
            className="mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0"
          >
            <Link to={`/berita/${item.slug}`}>
              <img
                src={item.image}
                alt={item.title}
                className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <CardHeader className="flex-1">
              <Badge
                variant="outline"
                className={`w-fit ${getBadgeStyle(item.type)}`}
              >
                #{item.type}
              </Badge>

              <CardTitle className="line-clamp-2">
                <Link
                  to={`/berita/${item.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              </CardTitle>

              <CardDescription className="line-clamp-3">
                {item.description}
              </CardDescription>

              <p className="mt-4 text-xs text-muted-foreground">
                {item.date} · {item.author}
              </p>
            </CardHeader>

            <CardFooter>
              <div className="flex w-full items-center justify-end">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary"
                >
                  Bagikan
                  <Share2 />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;