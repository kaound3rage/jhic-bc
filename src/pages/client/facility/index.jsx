import { useState } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";
import FasilitasCta from "@/components/fasilitas-component/fasilitas-cta";
import FasilitasHero from "@/components/fasilitas-component/fasilitas-hero";
import FasilitasList from "@/components/fasilitas-component/fasilitas-list";
import FasilitasSearch from "@/components/fasilitas-component/fasilitas-search";
import { fasilitasList } from "@/components/fasilitas-component/data-fasilitas";

function FasilitasPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredFasilitas = fasilitasList.filter((fasilitas) => {
    const matchesQuery =
      !normalizedQuery ||
      fasilitas.nama.toLowerCase().includes(normalizedQuery) ||
      fasilitas.lokasi.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      activeCategory === "Semua" ||
      fasilitas.kategori.toLowerCase().startsWith(activeCategory.toLowerCase());

    return matchesQuery && matchesCategory;
  });

  usePageMeta(
    "Fasilitas Sekolah",
    "Jelajahi sarana dan prasarana pendukung pembelajaran di SMK Negeri 2 Yogyakarta.",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <FasilitasHero />
      <FasilitasSearch
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <FasilitasList fasilitas={filteredFasilitas} />
      <div className="mt-10 sm:mt-12">
        <FasilitasCta />
      </div>
    </section>
  );
}

export default FasilitasPage;
