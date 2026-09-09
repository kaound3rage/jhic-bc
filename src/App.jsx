import Layout from "./components/layout";
import Home from "./pages/client/home";
import ScheduleRoom from "./pages/client/schedule-room";
import FacilityReport from "./pages/client/facility-report";
import Sigap from "./pages/client/sigap";
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
        </Routes>
      </Layout>
    </>
  );
}

export default App;
