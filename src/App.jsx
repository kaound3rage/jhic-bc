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
import { Route, Routes } from "react-router-dom";

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
          <Route path="/profil/sambutan-kepala-sekolah" element={<PrincipalMessagePage />} />
          <Route
            path="/konsentrasi-keahlian"
            element={<KonsentrasiKeahlianPage />}
          />
          <Route
            path="/konsentrasi-keahlian/:slug"
            element={<MajorDetailPage />}
          />
          <Route path="/spmb" element={<SpmbPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
