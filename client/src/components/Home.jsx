import React from "react";
import Background from "./Background";
import Foreground from "./Foreground";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-screen bg-zinc-900">
      <Background />
      <Foreground />
    </div>
  );
};

export default Home;
