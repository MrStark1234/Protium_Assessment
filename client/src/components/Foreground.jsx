import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";

const Foreground = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null); // kisi bhi tag ka reference dene ke liye
  const [selectedColor, setSelectedColor] = useState(""); // For color filtering

  const handleFilterChange = (e) => {
    setSelectedColor(e.target.value); // Update selected filter color
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/posts/getAllPosts",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddChitClick = () => {
    // Navigate to the AddChit component
    navigate("/add");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  const handleRearrange = () => {
    // Rearrange or reset your data here
    window.location.reload();
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed z-[3] top-0 left-0 w-full h-screen flex flex-wrap gap-10 p-10"
      >
        <h1
          id="title"
          className="absolute top-1/2 left-1/2 -translate-x-[50%] text-sky-950 text-[9vw] leading-none tracking-tighter font-semibold"
        >
          TASKS
        </h1>

        {/* Buttons Wrapper */}
        <div className="absolute top-2 right-2 flex flex-wrap gap-4 sm:gap-3 items-center justify-end">
          {/* Add Task Button */}
          <button
            id="add-btn"
            className="bg-sky-800 text-white rounded text-xs w-[65px] h-[30px] sm:w-[60px] sm:h-[28px] md:w-[65px] md:h-[30px]"
            onClick={handleAddChitClick}
          >
            Add Task
          </button>

          {/* Rearrange Cards Button */}
          <button
            className="bg-sky-800 text-white rounded text-xs w-[65px] h-[30px] sm:w-[60px] sm:h-[28px] md:w-[65px] md:h-[30px]"
            onClick={handleRearrange}
          >
            Rearrange
          </button>

          {/* Filter Dropdown */}
          <select
            name="filter"
            value={selectedColor}
            onChange={handleFilterChange}
            className="bg-sky-800 text-white rounded text-xs w-[70px] h-[30px] sm:w-[65px] sm:h-[28px] md:w-[70px] md:h-[30px]"
          >
            <option value="">All</option>
            <option value="red" style={{ color: "red" }}>
              Incomplete
            </option>
            <option value="greenyellow" style={{ color: "greenyellow" }}>
              Complete
            </option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          {/* Signout Button */}
          <button
            id="lout-btn"
            className="bg-red-600 text-zinc-900 rounded text-xs w-[65px] h-[30px] sm:w-[60px] sm:h-[28px] md:w-[65px] md:h-[30px]"
            onClick={handleLogout}
          >
            Signout
          </button>
        </div>

        {/* Cards */}
        {post.map((item, index) => (
          <Card
            key={index}
            data={item}
            reference={ref}
            post={post}
            setpost={setPost}
            selectedColor={selectedColor}
          />
        ))}
      </div>

      {/* // iss div ko maine ref de diya hai, ab jaha bhi main ref bolunga waha ye
      div target hoga */}
    </>
  );
};

export default Foreground;
