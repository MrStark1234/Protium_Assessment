import React, { useEffect, useState } from "react";
import { MdIncompleteCircle } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoCheckmarkDoneCircleSharp, IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import axios from "axios";
import "./style.css";

const Card = ({ data, reference, post, setpost, selectedColor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [editData, setEditData] = useState(data); // State for holding card data
  const [color, setColor] = useState("red"); // Initial color is green
  const handleDeleteClick = async () => {
    try {
      const postId = data._id;
      await axios.delete(`http://localhost:8000/posts/deletePost/${postId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const newPosts = post.filter((e) => e._id !== postId);
      alert("Task Deleted");
      setpost(newPosts);
      localStorage.removeItem(`card-color-${data._id}`); // Remove saved color state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem(`card-color-${data._id}`);
    if (savedColor) {
      setColor(savedColor);
    }
  }, [data._id]);

  const toggleColor = () => {
    const newColor = color === "greenyellow" ? "red" : "greenyellow";
    setColor(newColor);
    localStorage.setItem(`card-color-${data._id}`, newColor); // Save color state
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle change in modal input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle submit to update data
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/posts/updatePost/${editData._id}`,
        editData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Card updated:");

      // Update the state with the new data
      const updatedPosts = post.map((p) =>
        p._id === editData._id ? editData : p
      );
      setpost(updatedPosts);

      // Close the modal
      toggleModal();
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  // Filter cards based on the selectedColor
  if (
    selectedColor &&
    color !== selectedColor &&
    selectedColor &&
    data.tag.tagTitle !== selectedColor
  ) {
    return null; // Skip rendering this card if it doesn't match the filter
  }
  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        whileDrag={{ scale: 1.2 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        id="card"
        className="flex-shrink-0 relative w-64  max-h-80 rounded-[50px] bg-sky-900/90  py-10 px-5 text-orange-500 overflow-hidden"
      >
        <span
          className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-500 float-right cursor-pointer"
          onClick={handleDeleteClick}
        >
          <IoClose size=".6em" color="#000" />
        </span>
        {color === "red" ? (
          <MdIncompleteCircle
            color={color}
            onClick={toggleColor}
            style={{ cursor: "pointer" }}
            size="1em"
          />
        ) : (
          <IoCheckmarkDoneCircleSharp
            color={color}
            onClick={toggleColor}
            style={{ cursor: "pointer" }}
            size="1em"
          />
        )}
        <p
          className="mt-4 text-sm leading-tight text-zinc-300 overflow-y-auto max-h-32"
          style={{
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          {data.desc}
        </p>
        <div className="footer absolute bottom-0  w-full  left-0">
          <motion.div className="flex items-center justify-between mb-2 py-2 px-8">
            <p className="text-xs text-orange-500">{data.fileSize}</p>
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center bg-orange-500 float-right cursor-pointer"
              onClick={toggleModal} // Open the modal on button click
            >
              <GrDocumentUpdate size=".6em" color="#000" />
            </span>
          </motion.div>
          {data.tag.isOpen ? (
            <div
              className={`tag w-full py-3 ${
                data.tag.tagColor === "red" ? "bg-rose-500" : "bg-green-300"
              }`}
            >
              <h2 className="text-sm flex items-center justify-center text-black font-semibold">
                {data.tag.tagTitle}
              </h2>
            </div>
          ) : null}
        </div>
      </motion.div>
      {/* Modal UI */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-bold text-orange-500 mb-4">
              Update Card
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm text-gray-700">
                  Description
                </label>
                <textarea
                  name="desc"
                  value={editData.desc}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm text-gray-700">Tag</label>
                <input
                  type="text"
                  name="fileSize"
                  value={editData.fileSize}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
