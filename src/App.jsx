import Layout from "./components/layout";
import Home from "./pages/client/home";
import ScheduleRoom from "./pages/client/schedule-room";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jadwal-ruangan" element={<ScheduleRoom />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
