import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SaidBar from "./components/SaidBar";
import Header from "./components/Header";
import Addproduct from "./Pages/Addproduct";
import Products from "./Pages/Products";
import Login from "./Pages/Login";
import { useState, useEffect } from "react";

function App() {
  const [User, setUser] = useState("");
  return (
    <BrowserRouter>
      <div className="flex justify-start gap-5">
        {User ? <SaidBar setUser={setUser} /> : null}
        <div className=" w-full pr-[10px]">
          {User ? <Header User={User} /> : null}
          <Routes>
            <Route path="/" element={<Login setUser={setUser} User={User} />} />
            <Route path="/all" element={<Products />} />
            <Route path="/add" element={<Addproduct />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
