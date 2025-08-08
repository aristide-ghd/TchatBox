import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./components/accueil"
import LoginRegister from "./components/loginRegister";
import Chat from "./components/chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Accueil/>} />
        <Route path="/loginRegister" element={< LoginRegister />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
