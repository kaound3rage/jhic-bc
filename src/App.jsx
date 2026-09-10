import Layout from "./components/layout";
import Home from "./pages/client/home";
import ScheduleRoom from "./pages/client/schedule-room";
import FacilityReport from "./pages/client/facility-report";
import Sigap from "./pages/client/sigap";
import BeritaPage from "./pages/client/news";
import NewsDetailPage from "./pages/client/news/detail";
import ContactPage from "./pages/client/contact";
import PrincipalMessagePage from "./pages/client/principal-message";
import KonsentrasiKeahlianPage from "./pages/client/konsentrasi-keahlian";
import MajorDetailPage from "./pages/client/konsentrasi-keahlian/detail";
import SpmbPage from "./pages/client/spmb";
import EkstrakurikulerPage from "./pages/client/ekstrakurikuler";
import EkstrakurikulerDetailPage from "./pages/client/ekstrakurikuler/detail";
import GaleriPage from "./pages/client/galeri";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/not-found";
import { usePageMeta } from "./hooks/use-page-meta";
import { jurusan } from "./data/data-jurusan";
import { getNewsBySlug } from "./data/news";
import { getEkstrakurikulerBySlug } from "./data/ekstrakurikuler";

const pageTitles = {
  "/": "Beranda",
  "/sigap": "SIGAP",
  "/jadwal-ruangan": "Jadwal Ruangan",
  "/sigap/lapor-fasilitas": "Lapor Fasilitas",
  "/berita": "Berita",
  "/kontak": "Kontak",
  "/profil/sambutan-kepala-sekolah": "Sambutan Kepala Sekolah",
  "/konsentrasi-keahlian": "Konsentrasi Keahlian",
  "/spmb": "SPMB",
  "/ekstrakurikuler": "Ekstrakurikuler",
  "/galeri": "Galeri",
};

function RouteMeta() {
  const { pathname } = useLocation();
  const slug = pathname.split("/").filter(Boolean).at(-1);
  let title = pageTitles[pathname];

  if (!title && pathname.startsWith("/konsentrasi-keahlian/")) {
    title = jurusan.find((item) => item.slug === slug)?.nama;
  }

  if (!title && pathname.startsWith("/berita/")) {
    title = getNewsBySlug(slug)?.title;
  }

  if (!title && pathname.startsWith("/ekstrakurikuler/")) {
    title = getEkstrakurikulerBySlug(slug)?.nama;
  }

  usePageMeta(title ?? "Halaman Tidak Ditemukan");
  return null;
}

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sigap" element={<Sigap />} />
          <Route path="/jadwal-ruangan" element={<ScheduleRoom />} />
          <Route path="/sigap/lapor-fasilitas" element={<FacilityReport />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route
            path="/profil/sambutan-kepala-sekolah"
            element={<PrincipalMessagePage />}
          />
          <Route
            path="/konsentrasi-keahlian"
            element={<KonsentrasiKeahlianPage />}
          />
          <Route
            path="/konsentrasi-keahlian/:slug"
            element={<MajorDetailPage />}
          />
          <Route path="/spmb" element={<SpmbPage />} />
          <Route path="/ekstrakurikuler" element={<EkstrakurikulerPage />} />
          <Route
            path="/ekstrakurikuler/:slug"
            element={<EkstrakurikulerDetailPage />}
          />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <RouteMeta />
      </Layout>
    </>
  );
}

export default App;
