import { usePageMeta } from "@/hooks/use-page-meta";
import Breadcrumb from "@/components/breadcrumb";
import EkstrakurikulerShowcase from "@/components/ekstrakurikuler-showcase";

function EkstrakurikulerPage() {
  usePageMeta(
    "Ekstrakurikuler",
    "Jelajahi ekstrakurikuler dan organisasi siswa di SMK Negeri 2 Yogyakarta (SKADUTA).",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        <Breadcrumb />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ekstrakurikuler
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Lebih dari 14 ekstrakurikuler dan organisasi untuk mewadahi potensi
          dan minat siswa. Arahkan kursor (atau ketuk) pada daftar di bawah
          untuk melihat detail setiap kegiatan.
        </p>
      </div>

      <EkstrakurikulerShowcase />
    </section>
  );
}

export default EkstrakurikulerPage;