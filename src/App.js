import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import Starred from "./pages/Starred";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Character from "./pages/Character";
import { useState } from "react";

function App() {
  const [starred, SetStarred] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Characters starred={starred} SetStarred={SetStarred} />}
        />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="/favoris"
          element={<Starred starred={starred} SetStarred={SetStarred} />}
        />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
