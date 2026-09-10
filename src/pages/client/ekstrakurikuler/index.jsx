import { useState } from "react";
import EkstrakurikulerCta from "@/components/ekstrakurikuler-component/ekstrakurikuler-cta";
import EkstrakurikulerHero from "@/components/ekstrakurikuler-component/ekstrakurikuler-hero";
import EkstrakurikulerList from "@/components/ekstrakurikuler-component/ekstrakurikuler-list";
import EkstrakurikulerSearch from "@/components/ekstrakurikuler-component/ekstrakurikuler-search";
import { ekstrakurikulerList } from "@/components/ekstrakurikuler-component/data-ekstrakurikuler";

function EkstrakurikulerPage() {
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = ekstrakurikulerList.filter((item) =>
    item.nama.toLowerCase().includes(normalizedSearch),
  );

  return (
    <section className="w-full space-y-6 px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <EkstrakurikulerHero />
      <EkstrakurikulerSearch value={search} onChange={setSearch} />
      <EkstrakurikulerList items={filteredItems} />
      <EkstrakurikulerCta />
    </section>
  );
}

export default EkstrakurikulerPage;
