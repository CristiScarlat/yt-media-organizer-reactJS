import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home";
import History from "./pages/history";
import Modal from "./components/modal/modal";
import FavoritesPage from "./pages/favorites";


function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <Modal />
    </Router>
  );
}

export default App;
