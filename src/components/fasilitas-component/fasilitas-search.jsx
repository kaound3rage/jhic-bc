import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FasilitasFilterTabs from "./fasilitas-filter-tabs";

function FasilitasSearch({ query, onQueryChange, activeCategory, onCategoryChange }) {
  return (
    <section className="flex flex-col mb-5 gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xl">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari fasilitas berdasarkan nama atau lokasi..."
          aria-label="Cari fasilitas berdasarkan nama atau lokasi"
          className="h-10 rounded-full bg-background pl-9"
        />
      </div>
      <FasilitasFilterTabs
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
    </section>
  );
}

export default FasilitasSearch;
