import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home";
import History from "./pages/history";
import Modal from "./components/modal/modal";


function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
        <Modal />
    </Router>
  );
}

export default App;
