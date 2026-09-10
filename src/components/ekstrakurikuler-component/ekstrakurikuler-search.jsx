import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function EkstrakurikulerSearch({ value, onChange }) {
  return (
    <div className="rounded-xl border bg-card p-3 shadow-sm sm:p-4">
      <Label htmlFor="ekstrakurikuler-search" className="sr-only">
        Cari ekstrakurikuler
      </Label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="ekstrakurikuler-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Cari ekstrakurikuler berdasarkan nama atau kata kunci..."
          className="h-10 pl-9"
        />
      </div>
    </div>
  );
}

export default EkstrakurikulerSearch;
