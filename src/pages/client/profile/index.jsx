import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  GraduationCap,
  Medal,
  Quote,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Breadcrumb from "@/components/breadcrumb";
import ProfileTabs from "@/components/profile-tabs";
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
];

// PLACEHOLDER: lengkapi dengan arsip penghargaan resmi sebelum dipublikasikan.
const achievements = [
  { name: "Medali kompetisi keahlian teknik", category: "Lomba Kejuruan", level: "Nasional", year: "2025", description: "Kompetensi teknis siswa pada ajang keterampilan tingkat nasional." },
  { name: "Juara LKS Provinsi DIY", category: "Lomba Kejuruan", level: "Provinsi", year: "2025", description: "Delegasi SKADUTA meraih hasil terbaik pada bidang keahlian." },
  { name: "Medali Emas FIKSI", category: "Akademik", level: "Nasional", year: "2024", description: "Karya inovasi siswa tampil sebagai solusi kreatif berbasis teknologi." },
  { name: "Speak Up Competition", category: "Akademik", level: "Provinsi", year: "2025", description: "Siswa mengembangkan kemampuan komunikasi dan presentasi publik." },
  { name: "Mitsubishi Technical Skill Contest", category: "Lomba Kejuruan", level: "Nasional", year: "2025", description: "Empat medali diraih dalam kompetisi keterampilan teknis otomotif." },
  { name: "Aksi Adiwiyata Sekolah", category: "Non-Akademik", level: "Kota", year: "2025", description: "Kolaborasi warga sekolah untuk lingkungan belajar yang berkelanjutan." },
];

const achievementFilters = ["Semua", "Akademik", "Non-Akademik", "Lomba Kejuruan"];

// PLACEHOLDER: ganti inisial dan profil dengan alumni yang telah memberi izin publikasi.
const alumni = [
  { initials: "AR", name: "Aulia Rahma", year: "2019", major: "Multimedia", job: "Digital Marketing Specialist", quote: "SKADUTA mengajarkan saya untuk bekerja disiplin, kolaboratif, dan berani mengubah ide menjadi karya." },
  { initials: "AI", name: "Abdul Ikhlash", year: "2018", major: "Rekayasa Perangkat Lunak", job: "Director, PT Coding Collective", quote: "Pengalaman projek bersama industri menjadi fondasi penting untuk terus belajar dan membangun solusi." },
  { initials: "DN", name: "Dimas Nugraha", year: "2020", major: "Teknik Kendaraan Ringan", job: "Wirausaha Bengkel Motor", quote: "Bekal praktik dan budaya kerja di sekolah membuat saya lebih siap membuka peluang sendiri." },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>}
    </div>
  );
}

function SchoolProfilePage() {
  const [activeTab, setActiveTab] = useState("visi");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [activeAlumni, setActiveAlumni] = useState(0);

  usePageMeta("Profil Sekolah", "Profil, sejarah, visi misi, prestasi, dan jejak alumni SMK Negeri 2 Yogyakarta.");

  const filteredAchievements = activeFilter === "Semua"
    ? achievements
    : achievements.filter((item) => item.category === activeFilter);
  const currentAlumni = alumni[activeAlumni];

  const changeAlumni = (next) => {
    setActiveAlumni((next + alumni.length) % alumni.length);
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-10">
      <Breadcrumb />

      <section className="relative mt-6 min-h-[25rem] overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-foreground/10 sm:min-h-[31rem]">
        <img src="/sekolah.webp" alt="Gedung SMK Negeri 2 Yogyakarta" className="absolute inset-0 size-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/45 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
          <Badge className="border-white/25 bg-white/15 text-white backdrop-blur-sm hover:bg-white/15">The Industrial Culture School</Badge>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">Profil SMK Negeri 2 Yogyakarta</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">Menghasilkan Tamatan Berkarakter, Unggul &amp; Berdaya Saing Global.</p>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <SectionHeading eyebrow="01 / Perjalanan" title="Sejarah Kami" description="Dari pendidikan kejuruan hingga menjadi sekolah dengan budaya industri yang terus bertumbuh." />
        <div className="relative mt-10 ml-3 border-l border-border pl-8 sm:ml-5 sm:pl-12">
          <div className="space-y-10 sm:space-y-12">
            {milestones.map((milestone) => (
              <article key={milestone.year} className="relative max-w-3xl">
                <span className="absolute -left-[2.3rem] top-1.5 size-3 rounded-full bg-primary ring-4 ring-background sm:-left-[3.05rem]" />
                <p className="font-mono text-xs font-semibold text-primary">{milestone.year}</p>
                <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{milestone.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 grid gap-8 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading eyebrow="02 / Arah Pendidikan" title="Visi & Misi" description="Arah bersama untuk membentuk lulusan yang siap belajar, berkarya, dan berkontribusi." />
          <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" /><span>Pembelajaran berbasis kompetensi dan projek nyata.</span></div>
            <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" /><span>Budaya kerja industri yang berkarakter dan adaptif.</span></div>
            <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" /><span>Lingkungan belajar aman, inklusif, dan berkelanjutan.</span></div>
          </div>
        </div>
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} visi={vision} misi={missions} />
      </section>

      <section className="mt-16 sm:mt-20">
        <SectionHeading eyebrow="03 / Rekam Jejak" title="Prestasi & Pencapaian" description="Ruang apresiasi untuk karya, kompetensi, dan kontribusi warga SKADUTA." />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[{ value: "50+", label: "Penghargaan" }, { value: "15+", label: "Juara Nasional" }, { value: "10", label: "Konsentrasi Keahlian" }, { value: "60+", label: "Mitra Industri" }].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-primary p-4 text-primary-foreground sm:p-5"><div className="text-2xl font-bold sm:text-3xl">{stat.value}</div><div className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">{stat.label}</div></div>
          ))}
        </div>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {achievementFilters.map((filter) => <Button key={filter} type="button" onClick={() => setActiveFilter(filter)} variant={activeFilter === filter ? "default" : "secondary"} className={`h-auto shrink-0 rounded-full px-4 py-2 text-sm ${activeFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{filter}</Button>)}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.name} className="h-full py-0 transition-shadow hover:shadow-md"><CardContent className="flex h-full flex-col p-5"><div className="flex items-start justify-between gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary"><Trophy className="size-5" /></span><Badge variant="outline">{achievement.year}</Badge></div><h3 className="mt-5 font-semibold leading-6">{achievement.name}</h3><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{achievement.description}</p><div className="mt-5 flex items-center justify-between border-t pt-4 text-xs"><span className="text-muted-foreground">{achievement.category}</span><span className="font-medium text-primary">{achievement.level}</span></div></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <SectionHeading eyebrow="04 / Setelah Lulus" title="Jejak Alumni" description="Cerita inspiratif alumni yang terus bertumbuh dengan bekal dari SKADUTA." />
        <Card className="relative mt-8 overflow-hidden border-primary/30 py-0">
          <div className="flex min-h-[22rem] flex-col md:flex-row">
            <div className="flex w-full shrink-0 items-center justify-center bg-primary/10 p-8 md:w-2/5"><Avatar className="size-36 border-8 border-background shadow-lg"><AvatarFallback className="bg-primary text-4xl font-bold text-primary-foreground">{currentAlumni.initials}</AvatarFallback></Avatar></div>
            <div className="flex flex-1 flex-col justify-between gap-8 p-6 pb-16 sm:p-8 sm:pb-16"><div><Quote className="size-9 text-primary" /><p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">{currentAlumni.quote}</p></div><div><p className="font-semibold">{currentAlumni.name}</p><p className="mt-1 text-sm text-muted-foreground">Lulus {currentAlumni.year} · {currentAlumni.major}</p><div className="mt-2 flex items-center gap-2 text-sm font-medium text-primary"><BriefcaseBusiness className="size-4" />{currentAlumni.job}</div></div></div>
          </div>
          <div className="absolute bottom-5 right-5 flex gap-1"><Button variant="outline" size="icon-sm" aria-label="Alumni sebelumnya" onClick={() => changeAlumni(activeAlumni - 1)}><ArrowLeft /></Button><Button variant="outline" size="icon-sm" aria-label="Alumni berikutnya" onClick={() => changeAlumni(activeAlumni + 1)}><ArrowRight /></Button></div>
          <div className="absolute bottom-7 left-6 flex items-center gap-2 sm:left-[42%]">{alumni.map((item, index) => <button key={item.name} type="button" aria-label={`Tampilkan cerita ${item.name}`} aria-current={activeAlumni === index} onClick={() => setActiveAlumni(index)} className={`size-2 rounded-full transition-all ${activeAlumni === index ? "w-6 bg-primary" : "bg-border"}`} />)}</div>
        </Card>
      </section>

      <section className="mt-16 flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:mt-20 sm:p-8 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Tertarik bergabung dengan kami?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-primary-foreground/80">Mulai perjalananmu di sekolah vokasi yang dekat dengan dunia industri.</p></div><Button size="lg" variant="outline" render={<Link to="/spmb" />} className="w-fit border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Daftar Sekarang (SPMB)<ArrowRight /></Button></section>

      <div className="sr-only"><Building2 /><GraduationCap /><Award /><Medal /></div>
    </div>
  );
}

export default SchoolProfilePage;