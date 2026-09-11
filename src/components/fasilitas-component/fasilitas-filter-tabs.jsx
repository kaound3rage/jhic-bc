import { Button } from "@/components/ui/button";
import { fasilitasKategori } from "./data-fasilitas";

function FasilitasFilterTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Filter kategori fasilitas">
      {fasilitasKategori.map((category) => {
        const isActive = activeCategory === category;

        return (
          <Button
            key={category}
            type="button"
            size="sm"
            variant={isActive ? "default" : "outline"}
            className="rounded-full px-4 h-10"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
}

export default FasilitasFilterTabs;
