import { SearchX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EkstrakurikulerCard from "./ekstrakurikuler-card";

function EkstrakurikulerList({ items }) {
  if (!items.length) {
    return (
      <Card className="py-0">
        <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
          <SearchX className="size-8" />
          <p className="text-sm">Ekstrakurikuler yang kamu cari belum ditemukan.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <EkstrakurikulerCard key={item.id} item={item} />)}
    </div>
  );
}

export default EkstrakurikulerList;
