import React, { useEffect } from "react";

import Login from "./components/Login";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import AddChit from "./components/AddChit";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="Auth w-full h-screen bg-zinc-900">
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Login />} />
        {localStorage.getItem("token") && (
          <>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/add" element={<AddChit />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
