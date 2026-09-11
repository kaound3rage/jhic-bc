import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProfileTabs from "@/components/profile-tabs";
import AlumniSection from "@/components/home-component/alumni-section";
import NewsCard from "@/components/news-component/news-card";
import { newsItems } from "@/data/news";
import { usePageMeta } from "@/hooks/use-page-meta";

// PLACEHOLDER: validasi kembali tahun dan uraian sejarah bersama tim sekolah.
const milestones = [
  {
    year: "1965",
    title: "Sekolah kejuruan berdiri",
    description:
      "SMK Negeri 2 Yogyakarta memulai perjalanan pendidikan vokasi untuk menyiapkan tenaga terampil bagi pembangunan dan dunia kerja.",
  },
  {
    year: "1990-an",
    title: "Penguatan program keahlian",
    description:
      "Kurikulum dan fasilitas praktik berkembang mengikuti kebutuhan industri serta perkembangan teknologi di Yogyakarta.",
  },
  {
    year: "2010-an",
    title: "Kemitraan industri diperluas",
    description:
      "Pembelajaran berbasis proyek dan kerja sama dengan dunia usaha dan dunia industri menjadi bagian penting pengalaman belajar siswa.",
  },
  {
    year: "2020",
    title: "Transformasi pembelajaran digital",
    description:
      "Sekolah memperkuat pemanfaatan TIK, pembelajaran hybrid, dan budaya literasi digital untuk menjaga kualitas layanan pendidikan.",
  },
  {
    year: "2024",
    title: "The Industrial Culture School",
    description:
      "Budaya kerja industri dipertegas melalui Teaching Factory, projek kolaboratif, dan penguatan kompetensi yang relevan dengan masa depan.",
  },
];

const vision =
  "Menghasilkan tamatan yang berkarakter, unggul, berwawasan lingkungan, dan berdaya saing global.";

const missions = [
  "Mengembangkan kurikulum pembelajaran berbasis Teaching Factory (TEFA).",
  "Mengembangkan budaya literasi numerik, digital, finansial, sains, dan bahasa.",
  "Mengembangkan kompetensi peserta didik sesuai dengan bakat dan minat.",
  "Menyelenggarakan pembelajaran dan manajemen sekolah berbasis TIK.",
  "Meningkatkan fasilitas dan lingkungan belajar yang aman, nyaman, ramah lingkungan, ramah anak, dan responsif gender.",
  "Melaksanakan penataan lingkungan sekolah dan pengelolaan limbah 3R (Reuse, Reduce, Recycle) di setiap unit kerja.",
  "Menerapkan Perilaku Ramah Lingkungan Hidup (PRLH) warga sekolah menuju sekolah adiwiyata tingkat nasional.",
  "Mendampingi peserta didik dalam pembiasaan beribadah untuk meningkatkan ketaqwaan kepada Tuhan Yang Maha Esa.",
  "Menerapkan pendidikan berbasis Budaya Yogyakarta dan Profil Pelajar Pancasila.",
  "Meningkatkan kualitas dan kuantitas pendidik dan tenaga kependidikan yang memenuhi kualifikasi profesional, sertifikasi kompetensi, kreatif, inovatif, berkarakter, dan berbudaya kerja industri.",
  "Membangun kemitraan (Link and Match) dengan lembaga yang relevan dalam dan luar negeri.",
  "Menyelenggarakan sertifikasi kompetensi dan bahasa asing bagi peserta didik.",
  "Menyelenggarakan program pertukaran pelajar dan guru tingkat ASEAN.",
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function SchoolProfilePage() {
  const [activeTab, setActiveTab] = useState("visi");

  usePageMeta(
    "Profil Sekolah",
    "Profil, sejarah, visi misi, prestasi, dan jejak alumni SMK Negeri 2 Yogyakarta.",
  );

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-10">
      <section className="relative mt-6 min-h-100 overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10 sm:min-h-[31rem]">
        <img
          src="/sekolah_2.png"
          alt="Gedung SMK Negeri 2 Yogyakarta"
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <Badge className="border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/15">
            The Industrial Culture School
          </Badge>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Profil SMK Negeri 2 Yogyakarta
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
            Menghasilkan Tamatan Berkarakter, Unggul &amp; Berdaya Saing Global.
          </p>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <SectionHeading
          eyebrow="01 / Perjalanan"
          title="Sejarah Kami"
          description="Dari pendidikan kejuruan hingga menjadi sekolah dengan budaya industri yang terus bertumbuh."
        />
        <div className="relative mt-10 ml-3 border-l border-border pl-8 sm:ml-5 sm:pl-12">
          <div className="space-y-10 sm:space-y-12">
            {milestones.map((milestone) => (
              <article key={milestone.year} className="relative max-w-3xl">
                <span className="absolute left-[-2.3rem] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background sm:left-[-3.05rem]" />
                <p className="font-mono text-xs font-semibold text-primary">
                  {milestone.year}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {milestone.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="02 / Arah Pendidikan"
            title="Visi & Misi"
            description="Arah bersama untuk membentuk lulusan yang siap belajar, berkarya, dan berkontribusi."
          />
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Pembelajaran berbasis kompetensi dan projek nyata.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Budaya kerja industri yang berkarakter dan adaptif.</span>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
              <span>Lingkungan belajar aman, inklusif, dan berkelanjutan.</span>
            </div>
          </div>
        </div>
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          visi={vision}
          misi={missions}
          contentClassName="h-72"
        />
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            eyebrow="03 / Rekam Jejak"
            title="Prestasi & Pencapaian"
            description="Ruang apresiasi untuk karya, kompetensi, dan kontribusi warga SKADUTA."
          />
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Link to="/berita">Lihat Semua Prestasi</Link>
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { value: "50+", label: "Penghargaan" },
            { value: "15+", label: "Juara Nasional" },
            { value: "10", label: "Konsentrasi Keahlian" },
            { value: "60+", label: "Mitra Industri" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-primary p-4 text-primary-foreground sm:p-5"
            >
              <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems
            .filter((item) => item.type === "Prestasi")
            .map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            eyebrow="04 / Setelah Lulus"
            title="Jejak Alumni"
            description="Cerita inspiratif alumni yang terus bertumbuh dengan bekal dari SKADUTA."
          />
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Link to="/alumni">Lihat Semua Alumni</Link>
          </Button>
        </div>
        <div className="mt-8">
          <AlumniSection />
        </div>
      </section>

      <section className="mt-16 flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:mt-20 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Tertarik bergabung dengan kami?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-primary-foreground/80">
            Mulai perjalananmu di sekolah vokasi yang dekat dengan dunia
            industri.
          </p>
        </div>
        <Button
          size="lg"
          variant="outline"
          render={<Link to="/spmb" />}
          className="w-fit border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          Daftar Sekarang (SPMB)
          <ArrowRight />
        </Button>
      </section>
    </div>
  );
}

export default SchoolProfilePage;
