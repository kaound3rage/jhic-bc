import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import NewsCard from "@/components/news-component/news-card";
import { newsItems } from "@/data/news";

function NewsSection() {
  return (
    <section className="flex flex-col gap-6 py-18">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Berita Terkini</h1>
          <p className="text-sm text-muted-foreground">
            Tetap terhubung dengan berbagai informasi dan prestasi terkini dari sekolah kami.
          </p>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary" asChild>
          <Link to="/berita">Lihat Semua</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newsItems.slice(0, 3).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
