import { useEffect } from "react";

const SITE_NAME = "SMK Negeri 2 Yogyakarta";
const DEFAULT_DESCRIPTION =
  "SMK Negeri 2 Yogyakarta — informasi sekolah, konsentrasi keahlian, dan layanan publikasi.";

export function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
