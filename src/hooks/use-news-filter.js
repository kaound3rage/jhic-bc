import { useMemo, useState } from "react";

const ALL_FILTER = "Semua";

const createFilterOptions = (items, field) => {
  const counts = new Map();

  items.forEach((item) => {
    const values = field === "tags" ? item.tags || [] : [item[field]];

    values.filter(Boolean).forEach((value) => {
      counts.set(value, (counts.get(value) || 0) + 1);
    });
  });

  return Array.from(counts, ([label, count]) => ({ label, count }));
};

function useNewsFilter(newsItems, pageSize = 6) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL_FILTER);
  const [tag, setTag] = useState(ALL_FILTER);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const categories = useMemo(
    () => createFilterOptions(newsItems, "type"),
    [newsItems],
  );
  const tags = useMemo(() => createFilterOptions(newsItems, "tags"), [newsItems]);

  const filteredNews = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");

    return newsItems.filter((item) => {
      const matchesCategory = category === ALL_FILTER || item.type === category;
      const matchesTag = tag === ALL_FILTER || item.tags?.includes(tag);
      const matchesSearch =
        !query ||
        `${item.title} ${item.description}`
          .toLocaleLowerCase("id-ID")
          .includes(query);

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [category, newsItems, search, tag]);

  const resetVisibleNews = () => {
    setVisibleCount(pageSize);
  };

  const updateSearch = (value) => {
    setSearch(value);
    resetVisibleNews();
  };

  const updateCategory = (value) => {
    setCategory(value);
    resetVisibleNews();
  };

  const updateTag = (value) => {
    setTag(value);
    resetVisibleNews();
  };

  return {
    allFilter: ALL_FILTER,
    search,
    setSearch: updateSearch,
    category,
    setCategory: updateCategory,
    tag,
    setTag: updateTag,
    categories,
    tags,
    filteredNews,
    visibleNews: filteredNews.slice(0, visibleCount),
    hasMore: visibleCount < filteredNews.length,
    loadMore: () => setVisibleCount((count) => count + pageSize),
    clearFilters: () => {
      setSearch("");
      setCategory(ALL_FILTER);
      setTag(ALL_FILTER);
      resetVisibleNews();
    },
  };
}

export default useNewsFilter;
