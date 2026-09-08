import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Share2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const alumniStories = [
  {
    name: "Rizky Pratama",
    role: "Software Engineer di PT Indonesia Indicator",
    image: "/pjs.png",
    quote:
      "Belajar di SMK Negeri 2 Yogyakarta memberi saya fondasi teknis dan keberanian untuk terus berkembang. Pengalaman projek bersama industri sangat membantu saat memasuki dunia kerja.",
  },
  {
    name: "Aulia Rahma",
    role: "Digital Marketing Specialist",
    image: "/sekolah.webp",
    quote:
      "Guru dan teman-teman di SKADUTA mengajarkan saya untuk bekerja dengan disiplin, kolaboratif, dan selalu menghasilkan karya yang bisa dipertanggungjawabkan.",
  },
];

/** @type {{ date: string, type: string, title: string, description: string, image: string }[]} */
const newsItems = [
  {
    date: "12 Juni 2026",
    type: "Sekolah",
    title: "SKADUTA Raih Prestasi di Ajang Kompetensi Siswa",
    description:
      "Siswa SMK Negeri 2 Yogyakarta kembali menunjukkan karya terbaiknya dalam kompetisi tingkat nasional.",
    image: "/pjs.png",
  },
  {
    date: "03 Juni 2026",
    type: "Kegiatan",
    title: "Kolaborasi Pembelajaran Bersama Mitra Industri",
    description:
      "Pembelajaran berbasis projek menghadirkan pengalaman kerja nyata bagi peserta didik.",
    image: "/sekolah.webp",
  },
  {
    date: "27 Mei 2026",
    type: "Pengumuman",
    title: "Pendaftaran Peserta Didik Baru Segera Dibuka",
    description:
      "Simak informasi lengkap mengenai jadwal dan tahapan pendaftaran calon peserta didik baru.",
    image: "/sija.png",
  },
];

function AlumniSection({ news = newsItems }) {
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory((current) => (current + 1) % alumniStories.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const story = alumniStories[activeStory];

  function showStory(index) {
    setActiveStory((index + alumniStories.length) % alumniStories.length);
  }

  return (
    <section className="flex w-full flex-col gap-18 py-18">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Jejak Alumni</h1>
          <p className="text-sm text-muted-foreground">
            Cerita inspiratif alumni yang terus bertumbuh bersama bekal dari SKADUTA.
          </p>
        </div>

        <Card className="relative flex flex-col gap-0 overflow-hidden border-primary/30 p-0 md:flex-row">
          <img
            src={story.image}
            alt={`Alumni ${story.name}`}
            className="aspect-[4/3] w-full object-cover md:aspect-auto md:w-[40%]"
          />
          <div className="flex min-h-80 flex-1 flex-col justify-between gap-8 p-6 pb-16 md:p-8 md:pb-16">
            <div className="flex flex-col gap-4">
              <span className="text-4xl leading-none text-primary">&ldquo;</span>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {story.quote}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={story.image} alt={story.name} />
                <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{story.name}</p>
                <p className="text-sm text-muted-foreground">{story.role}</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 md:left-[42%]">
            {alumniStories.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Tampilkan cerita ${item.name}`}
                aria-current={activeStory === index}
                onClick={() => showStory(index)}
                className={`size-2 rounded-full transition-all ${
                  activeStory === index ? "w-6 bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <div className="absolute right-6 bottom-4 flex gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cerita alumni sebelumnya"
              onClick={() => showStory(activeStory - 1)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cerita alumni berikutnya"
              onClick={() => showStory(activeStory + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Berita Terkini</h1>
            <p className="text-sm text-muted-foreground">
              Informasi terbaru seputar kegiatan dan prestasi sekolah.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary" asChild>
            <Link to="/berita">Lihat Semua</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.title} className="overflow-hidden p-0">
              <img src={item.image} alt={item.title} className="aspect-video w-full object-cover" />
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" />
                    {item.date}
                  </span>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter className="justify-between gap-2">
                <Button variant="link" className="h-auto p-0 text-primary" asChild>
                  <Link to="/berita">
                    Selengkapnya
                    <ExternalLink />
                  </Link>
                </Button>
                <Button variant="ghost" className="h-auto gap-1 p-0 text-muted-foreground">
                  <Share2 />
                  Bagikan Artikel
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-muted p-6 md:flex-row md:items-center md:p-8">
        <div>
          <h1 className="text-2xl font-bold">Pendaftaran SPMB</h1>
          <p className="text-sm text-muted-foreground">Portal SPMB</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button className="px-4" asChild>
            <Link to="/spmb">Buka SPMB</Link>
          </Button>
          <Button variant="outline" className="px-4" asChild>
            <Link to="/spmb/tahapan">Tahapan SPMB</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AlumniSection;
