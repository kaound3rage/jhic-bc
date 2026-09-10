import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsCard from "@/components/news-component/news-card";
import NewsFilterBar from "@/components/news-component/news-filter-bar";
import useNewsFilter from "@/hooks/use-news-filter";
import { newsItems } from "@/data/news";

function BeritaPage() {
  const filters = useNewsFilter(newsItems);

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mb-8 max-w-3xl">
        {/* <p className="mb-2 text-sm font-semibold tracking-wide text-primary uppercase">Pusat informasi</p> */}
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Berita SKADUTA</h1>
        <p className="mt-3 text-muted-foreground">
          Temukan kabar kegiatan, prestasi, pengumuman, dan cerita terbaru dari SMK Negeri 2 Yogyakarta.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <NewsFilterBar {...filters} />
        <div>
          <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
            <Newspaper className="size-4" />
            {filters.filteredNews.length} berita ditemukan
          </div>
          {filters.visibleNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filters.visibleNews.map((item) => <NewsCard key={item.id} item={item} />)}
              </div>
              {filters.hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" onClick={filters.loadMore}>Muat lebih banyak</Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-6 text-center">
              <Newspaper className="mb-3 size-8 text-muted-foreground" />
              <h2 className="font-semibold">Berita tidak ditemukan</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Ubah kata kunci pencarian atau hapus filter untuk melihat berita lainnya.</p>
              <Button variant="outline" className="mt-4" onClick={filters.clearFilters}>Hapus filter</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BeritaPage;
