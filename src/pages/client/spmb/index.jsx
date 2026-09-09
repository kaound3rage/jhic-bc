import { Link } from "react-router-dom";
import { ClipboardList, CalendarDays, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/breadcrumb";
import { usePageMeta } from "@/hooks/use-page-meta";

const alur = [
  {
    icon: FileText,
    title: "Daftar & Unggah Berkas",
    deskripsi:
      "Lakukan pendaftaran dan unggah dokumen persyaratan secara daring.",
  },
  {
    icon: CalendarDays,
    title: "Verifikasi & Pengumuman",
    deskripsi:
      "Berkas diverifikasi panitia, hasil diumumkan sesuai jadwal resmi.",
  },
  {
    icon: ClipboardList,
    title: "Daftar Ulang",
    deskripsi:
      "Calon peserta yang diterima melengkapi administrasi pendaftaran ulang.",
  },
];

function SpmbPage() {
  usePageMeta(
    "SPMB",
    "Informasi Seleksi Penerimaan Murid Baru (SPMB) SMK Negeri 2 Yogyakarta.",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        <Breadcrumb />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          SPMB
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Seleksi Penerimaan Murid Baru (SPMB) SMK Negeri 2 Yogyakarta.
          Informasi resmi jadwal, kuota, dan persyaratan dapat dipantau melalui
          pengumuman sekolah.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alur.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-muted/50 p-5 ring-1 ring-border"
          >
            <span className="flex size-11 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
              <item.icon className="size-5 text-primary" />
            </span>
            <h2 className="mt-4 font-semibold text-foreground">{item.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {item.deskripsi}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-primary p-6 text-primary-foreground sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Butuh informasi lebih lanjut?
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Hubungi tim sekolah untuk pertanyaan seputar jalur belajar dan
            proses pendaftaran.
          </p>
        </div>
        <Button
          size="lg"
          render={<Link to="/kontak" />}
          className="bg-background text-foreground hover:bg-background/90"
        >
          Kontak Sekolah
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default SpmbPage;