import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePageMeta } from "@/hooks/use-page-meta";
import { ekstrakurikulerList } from "@/components/ekstrakurikuler-component/data-ekstrakurikuler";
import { ekstrakurikulerData } from "@/data/ekstrakurikuler";
import EkstrakurikulerCard from "@/components/ekstrakurikuler-component/ekstrakurikuler-card";
import { Card, CardContent } from "@/components/ui/card";

function EkstrakurikulerPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const allEkstrakurikuler = ekstrakurikulerList;

  const categories = [
    "Semua",
    ...new Set(allEkstrakurikuler.map((item) => item.kategori)),
  ];

  const keyword = search.trim().toLowerCase();

  const filteredEkstrakurikuler = allEkstrakurikuler.filter((item) => {
    const description = Array.isArray(item.deskripsi)
      ? item.deskripsi.join(" ")
      : item.deskripsi;

    const matchesSearch =
      !keyword ||
      item.nama.toLowerCase().includes(keyword) ||
      description.toLowerCase().includes(keyword) ||
      item.kategori.toLowerCase().includes(keyword);

    const matchesCategory =
      selectedCategory === "Semua" || item.kategori === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("Semua");
  };

  const stats = [
    {
      value: `${allEkstrakurikuler.length}+`,
      label: "Ekstrakurikuler",
    },
    {
      value: categories.length - 1,
      label: "Kategori Kegiatan",
    },
    {
      value: allEkstrakurikuler.length,
      label: "Kegiatan Aktif",
    },
  ];

  usePageMeta(
    "Ekstrakurikuler",
    "Jelajahi 12 ekstrakurikuler dan organisasi siswa di SMK Negeri 2 Yogyakarta (SKADUTA).",
  );

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <header className="mb-9 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Ekstrakurikuler
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Jelajahi berbagai kegiatan ekstrakurikuler dan organisasi siswa di
            SMK Negeri 2 Yogyakarta untuk mengembangkan potensi, karakter, dan
            prestasi siswa.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-96">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-muted/50 py-3 shadow-none">
              <CardContent className="px-3 text-center sm:px-4">
                <p className="text-xl font-semibold text-primary sm:text-2xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[0.65rem] text-muted-foreground sm:text-xs">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </header>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari ekstrakurikuler..."
            className="h-10 pl-9"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-10! w-full sm:w-56">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "Semua" ? "Semua Kategori" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEkstrakurikuler.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEkstrakurikuler.map((item) => (
            <EkstrakurikulerCard
              key={item.id}
              item={item}
              hasDetail={ekstrakurikulerData.some((category) =>
                category.items.some(
                  (detailItem) => detailItem.slug === item.slug,
                ),
              )}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
          <h2 className="font-semibold">Tidak ada ekstrakurikuler ditemukan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Coba gunakan kata kunci lain atau ubah kategori filter.
          </p>
          <Button variant="outline" className="mt-4" onClick={resetFilters}>
            Reset Filter
          </Button>
        </div>
      )}

      <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl bg-muted/50 p-6 ring-1 ring-border sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
            <Compass className="size-5 text-primary" />
          </span>
          <div>
            <p className="font-semibold text-foreground">
              Bingung memilih ekstrakurikuler?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hubungi tim sekolah untuk informasi jadwal, pembina, dan cara
              bergabung.
            </p>
          </div>
        </div>
        <Button variant="outline" render={<Link to="/kontak" />}>
          Kontak Sekolah
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

export default EkstrakurikulerPage;
