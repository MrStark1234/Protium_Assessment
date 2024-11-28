import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddChit = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    desc: "",
    fileSize: "",
    close: true,
    tag: {
      isOpen: false,
      tagTitle: "",
      tagColor: "green",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the API call to save the data
      const response = await axios.post(
        "https://protium-assessment.onrender.com/posts/create",
        formValues,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log("Task added successfully:", response.data);

      setFormValues({
        desc: "",
        fileSize: "",
        close: true,
        tag: {
          isOpen: false,
          tagTitle: "",
          tagColor: "green",
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error adding chit:", error.message);
    }
  };

  const { desc, fileSize, close, tag } = formValues; // Destructure desc from formValues for easier use

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="chitDescription" className="text-orange-500">
            Description
          </label>
          <textarea
            value={desc}
            name="desc"
            onChange={handleChange}
            className="form-control"
            id="chitDescription"
            placeholder="Your Chit here.."
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="chitFileSize" className="text-orange-500">
            Tag
          </label>
          <input
            type="text"
            value={fileSize}
            name="fileSize"
            onChange={handleChange}
            className="form-control"
            id="chitFileSize"
            placeholder="Tag your work"
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="chitClose" className="text-orange-500">
            Do you define day of complition?
          </label>
          <input
            type="checkbox"
            checked={tag.isOpen}
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                tag: {
                  ...prevValues.tag,
                  isOpen: e.target.checked,
                },
              }))
            }
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="chitTagTitle" className="text-orange-500">
            Expected Day of Completion
          </label>
          <input
            type="text"
            value={tag.tagTitle}
            name="tagTitle"
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                tag: { ...tag, tagTitle: e.target.value },
              }))
            }
            className="form-control"
            id="chitTagTitle"
            placeholder="Mention Day"
          />
        </div>
        <div className="form-group mt-4">
          <label htmlFor="chitTagColor" className="text-orange-500">
            Priority Color
          </label>
          <select
            value={tag.tagColor}
            name="tagColor"
            onChange={(e) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                tag: { ...tag, tagColor: e.target.value },
              }))
            }
            className="form-control"
            id="chitTagColor"
          >
            <option value="red">Red</option>
            <option value="green">Green</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddChit;
