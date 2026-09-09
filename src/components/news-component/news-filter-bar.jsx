import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function FilterGroup({ title, options, selected, onSelect, allFilter }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{title}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={selected === allFilter ? "default" : "outline"}
          onClick={() => onSelect(allFilter)}
        >
          Semua ({options.reduce((total, option) => total + option.count, 0)})
        </Button>
        {options.map((option) => (
          <Button
            key={option.label}
            type="button"
            size="sm"
            variant={selected === option.label ? "default" : "outline"}
            onClick={() => onSelect(option.label)}
          >
            {option.label} ({option.count})
          </Button>
        ))}
      </div>
    </div>
  );
}

function NewsFilterBar({
  allFilter,
  categories,
  tags,
  category,
  tag,
  search,
  setCategory,
  setTag,
  setSearch,
  clearFilters,
}) {
  const isFiltered = search || category !== allFilter || tag !== allFilter;

  return (
    <aside className="h-fit rounded-xl border bg-card p-4 lg:sticky lg:top-28">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-semibold">
          <SlidersHorizontal className="size-4 text-primary" /> Filter berita
        </div>
        {isFiltered && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            <X /> Reset
          </Button>
        )}
      </div>

      <label className="relative mb-5 block">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari judul atau isi berita..."
          className="h-10 pl-9"
          aria-label="Cari berita"
        />
      </label>

      <div className="flex flex-col gap-5">
        <FilterGroup title="Kategori" options={categories} selected={category} onSelect={setCategory} allFilter={allFilter} />
        {tags.length > 0 && (
          <FilterGroup title="Tag" options={tags} selected={tag} onSelect={setTag} allFilter={allFilter} />
        )}
      </div>
    </aside>
  );
}

export default NewsFilterBar;
