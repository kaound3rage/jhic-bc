import { Link, useParams } from "react-router-dom";
import { CalendarDays, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/breadcrumb";
import { getNewsBySlug } from "@/data/news";

function NewsDetailPage() {
  const { slug } = useParams();
  const news = getNewsBySlug(slug);

  if (!news) {
    return (
      <section className="flex min-h-96 w-full flex-col items-center justify-center gap-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Berita tidak ditemukan</h1>
        <Button asChild variant="outline"><Link to="/berita">Kembali ke berita</Link></Button>
      </section>
    );
  }

  return (
    <article className="mx-auto w-full max-w-3xl py-10 md:py-14">
      <Breadcrumb
        items={[
          { label: "Berita", href: "/berita" },
          { label: news.title },
        ]}
      />
      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">#{news.type}</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{news.title}</h1>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{news.date}</span>
        <span className="flex items-center gap-1.5"><UserRound className="size-4" />{news.author}</span>
      </div>
      <img src={news.image} alt={news.title} className="mt-7 aspect-video w-full rounded-xl object-cover" />
      <p className="mt-7 text-base leading-8 text-muted-foreground">{news.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {news.tags?.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
      </div>
    </article>
  );
}

export default NewsDetailPage;
