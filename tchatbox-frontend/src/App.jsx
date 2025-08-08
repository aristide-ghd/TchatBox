import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/loginRegister";
import Chat from "./components/chat";
import Accueil from "./components/accueil"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/accueil" element={<Accueil/>} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
