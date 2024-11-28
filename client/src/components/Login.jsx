import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        username,
        password,
      });

      const token = response.data.token;

      // Save the token in local storage
      localStorage.setItem("token", token);

      alert("Login successful!");

      // Redirect to the Home component
      if (token) {
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed!", error.response.data.message);
      alert("Login failed!");
    }
  };

  return (
    <>
      <div className="bg-zinc-600 p-5 flex rounded-2xl shadow-lg max-w-3xl ">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <p className="text-sm mt-6 text-white">
            If you have an account, please login
          </p>

          <div className="mt-6">
            <label className="block text-white">Username</label>
            <input
              type="text"
              value={username}
              placeholder="Enter your Username"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
              autoFocus
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              minLength="6"
              className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-2 mt-6"
          >
            Log In
          </button>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-100" />
            <p className="text-center text-sm text-white">OR</p>
            <hr className="border-gray-100" />
          </div>

          <div className="text-sm flex justify-between items-center mt-3">
            <p className="text-white">If you don't have an account...</p>
            <button
              className="py-2 px-3 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  "
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>

        <div className="w-1/2 md:block hidden ">
          <img
            src="https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGNvZGluZyUyMGltYWdlfGVufDB8fDB8fHww"
            className="rounded-2xl"
            alt="page img"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
