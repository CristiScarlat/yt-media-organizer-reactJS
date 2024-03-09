import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home";
import History from "./pages/history";
import Modal from "./components/modal/modal";
import FavoritesPage from "./pages/favorites";
import PrivateRoute from "./components/privateRoute/privateRoute";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
          <Route path="/favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
        <Modal />
    </Router>
  );
}

export default App;
