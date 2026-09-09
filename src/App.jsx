import Layout from "./components/layout";
import Home from "./pages/client/home";
import ScheduleRoom from "./pages/client/schedule-room";
import FacilityReport from "./pages/client/facility-report";
import Sigap from "./pages/client/sigap";
import BeritaPage from "./pages/client/news";
import NewsDetailPage from "./pages/client/news/detail";
import ContactPage from "./pages/client/contact";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sigap" element={<Sigap />} />
          <Route path="/jadwal-ruangan" element={<ScheduleRoom />} />
          <Route path="/lapor-fasilitas" element={<FacilityReport />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/kontak" element={<ContactPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
