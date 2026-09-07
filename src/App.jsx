import Header from "./components/header";
import Home from "./pages/client/home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Header>
    </>
  );
}

export default App;
