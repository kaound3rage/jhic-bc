import { Link, useParams } from "react-router-dom";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";
import { jurusan, schoolStats } from "@/data/data-jurusan";

function statCardsOf(statistik) {
  return [
    { label: "Kelas", value: statistik?.kelas ?? "–" },
    { label: "Masa Belajar", value: statistik?.masaBelajar ?? "–" },
    { label: "Mata Pelajaran", value: statistik?.mataPelajaran ?? "–" },
    { label: "Jumlah Siswa", value: statistik?.jumlahSiswa ?? "–" },
    { label: "Jumlah Guru", value: statistik?.jumlahGuru ?? "–" },
  ];
}

function schoolStatItems(stats) {
  return [
    { label: "Akreditasi", value: stats?.akreditasi ?? "–" },
    { label: "Berdiri Sejak", value: stats?.berdiriSejak ?? "–" },
    { label: "Kerjasama Industri", value: stats?.kerjasamaIndustri ?? "–" },
  ];
}

function MajorDetailView({ major, stats }) {
  const statCards = statCardsOf(major.statistik);
  const schoolItems = schoolStatItems(stats);

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: "Konsentrasi Keahlian", href: "/konsentrasi-keahlian" },
            { label: major.nama },
          ]}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-2xl border border-border bg-muted">
          <img
            src={major.fotoUrl}
            alt={major.fotoAlt ?? `Praktik jurusan ${major.nama} di SKADUTA`}
            className="aspect-square w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <Badge
            variant="outline"
            className="rounded-md border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
          >
            Profil Konsentrasi Keahlian
          </Badge>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            {major.nama}
          </h1>

          <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {major.infoSingkat.map((item) => (
              <div key={item.label} className="border-b border-border pb-3">
                <dt className="text-xs font-normal text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
            {major.deskripsi}
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">
          Sekilas {major.nama}
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {statCards.map((item) => (
            <Card key={item.label} className="py-5 text-center">
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-foreground sm:text-3xl">
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  {item.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="py-5">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="size-4 text-primary" />
              Kompetensi Keahlian
            </CardTitle>
            <CardDescription>
              Bidang keahlian yang akan dikuasai
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <ul className="space-y-3">
              {major.kompetensiKeahlian.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader className="border-b pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="size-4 text-primary" />
              Peluang Karier
            </CardTitle>
            <CardDescription>
              Berbagai profesi yang dapat diisi oleh lulusan di bidang industri
              dan penelitian
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <ul className="space-y-3">
              {major.peluangKarier.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 grid gap-6 rounded-2xl bg-primary px-6 py-8 text-center text-primary-foreground sm:grid-cols-3 sm:py-10">
        {schoolItems.map((item) => (
          <div key={item.label}>
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="mt-1 text-sm text-primary-foreground/80">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-foreground">
          Sarana &amp; Prasarana
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fasilitas pendukung kegiatan praktik {major.nama} di SKADUTA.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {major.saranaPrasarana.map((facility) => (
            <Card key={facility.nama} className="py-5">
              <CardHeader className="border-b pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Building2 className="size-4 text-primary" />
                  {facility.nama}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {facility.detail.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Ingin tanya lebih lanjut soal {major.nama}?
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Tim sekolah siap membantu informasi jalur belajar, peluang karier,
            dan proses pendaftaran.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            render={<Link to="/kontak" />}
            className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Kontak Sekolah
          </Button>
          <Button
            size="lg"
            render={<Link to="/spmb" />}
            className="bg-background text-foreground hover:bg-background/90"
          >
            SPMB
          </Button>
        </div>
      </div>
    </section>
  );
}

export function MajorDetailSkeleton({ nama }) {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8">
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div>
          <Skeleton className="h-6 w-56" />
          <Skeleton className="mt-4 h-10 w-3/4" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="mt-6 h-24 w-full rounded-lg" />
        </div>
      </div>

      <div className="mt-10">
        <Skeleton className="h-6 w-48" />
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>

      <Skeleton className="mt-10 h-32 w-full rounded-2xl" />

      <div className="mt-10">
        <Skeleton className="h-6 w-48" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-36 w-full rounded-xl" />
          ))}
        </div>
      </div>

      <Skeleton className="mt-10 h-40 w-full rounded-2xl" />
      <span className="sr-only">{nama ? `Memuat ${nama}...` : "Memuat..."}</span>
    </section>
  );
}

function MajorDetailPage() {
  const { slug } = useParams();
  const major = jurusan.find((item) => item.slug === slug);

  usePageMeta(
    major ? `${major.nama} — Konsentrasi Keahlian` : "Konsentrasi Keahlian",
    major?.deskripsiSingkat,
  );

  if (!major) {
    return (
      <section className="flex min-h-96 w-full flex-col items-center justify-center gap-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Konsentrasi keahlian tidak ditemukan</h1>
        <p className="text-sm text-muted-foreground">
          Pastikan alamat halaman sudah benar atau jelajahi jurusan lain.
        </p>
        <Button variant="outline" render={<Link to="/konsentrasi-keahlian" />}>
          Lihat semua konsentrasi keahlian
        </Button>
      </section>
    );
  }

  return <MajorDetailView major={major} stats={schoolStats} />;
}

export default MajorDetailPage;
export { MajorDetailView };