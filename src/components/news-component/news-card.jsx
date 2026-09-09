import { Link } from "react-router-dom";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badgeStyles = [
  "border-primary/30 bg-primary/10 text-primary",
  "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
  "border-amber-500/30 bg-amber-500/10 text-amber-700",
  "border-violet-500/30 bg-violet-500/10 text-violet-700",
  "border-rose-500/30 bg-rose-500/10 text-rose-700",
];

const getBadgeStyle = (type) => {
  const index = Array.from(type).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );

  return badgeStyles[index % badgeStyles.length];
};

function NewsCard({ item }) {
  const newsUrl = `/berita/${item.slug}`;

  const shareNews = async () => {
    const shareData = { title: item.title, text: item.description, url: newsUrl };

    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard?.writeText(`${window.location.origin}${newsUrl}`);
  };

  return (
    <Card className="mx-auto flex h-full w-full max-w-sm flex-col pt-0">
      <Link to={newsUrl} className="overflow-hidden" aria-label={`Baca ${item.title}`}>
        <img
          src={item.image}
          alt={item.title}
          className="aspect-video w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>

      <CardHeader className="flex-1">
        <Badge variant="outline" className={`w-fit ${getBadgeStyle(item.type)}`}>
          #{item.type}
        </Badge>
        <CardTitle className="line-clamp-2">
          <Link to={newsUrl} className="transition-colors hover:text-primary">
            {item.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">{item.description}</CardDescription>
        <p className="mt-4 text-xs text-muted-foreground">
          {item.date} · {item.author}
        </p>
      </CardHeader>

      <CardFooter>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.tags?.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground">#{tag}</span>
            ))}
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary" onClick={shareNews}>
            Bagikan <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default NewsCard;
