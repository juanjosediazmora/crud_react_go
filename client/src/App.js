import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Agregar from "./users/Agregar";
import Ver from "./users/Ver";

function App()
{
  return(
    <Router>
      <Routes>
        <Route index element={<Agregar />} />
        <Route path="/usuario/:id" element={<Ver />} />
      </Routes>
    </Router>
  );
}
export default App;