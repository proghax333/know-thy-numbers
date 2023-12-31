import { useEffect, useState, useMemo } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import env from "../secrets.js";

const { VITE_BACKEND_HOST } = env;

function UploadDataForm() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(true);
  const [formData, setFormData] = useState({
    name: "Destiny",
    numerologyNumber: "",
    what_is_heading: "",
    what_is_description: "",
    heading: "",
    description: "",
    add_description: "",
    suggestion: "",
  });

  // useEffect(() => {
  //   async function checkAuthentication() {
  //     try {
  //       const url = `${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}${VITE_BASE_URL}authenticate`
  //       let response = await axios({
  //         method: "post",
  //         url,
  //         withCredentials: true
  //       })

  //       console.log("Authorized User")
  //       console.log(response)

  //       setAuthenticated(true)
  //     } catch (err) {
  //       alert("Access denied")
  //       navigate("/login")
  //     }
  //   }

  //   checkAuthentication().catch(e => console.log(e))
  // })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // You can perform your data upload logic here
    console.log("Form Data:", formData);

    try {
      formData["numerologyNumber"] = Number(formData["numerologyNumber"]);
      // Send a request to the backend to update the item
      const url = `${VITE_BACKEND_HOST}/openapi/prediction/create`;
      let response = await axios({
        method: "post",
        url,
        data: formData,
        headers: { "Content-Type": "application/json" },
        // withCredentials: true
      });

      alert("Item uploaded successfully");
      // Perform any additional logic needed after update
      // ...
    } catch (error) {
      console.error("Error updating item:", error);
    }

    setFormData({
      name: "",
      numerologyNumber: "",
      what_is_heading: "",
      what_is_description: "",
      heading: "",
      description: "",
      add_description: "",
      suggestion: "",
    });
  };

  return authenticated ? (
    <div className="min-h-screen bg-gray-100 p-8">
    <div className="bg-white p-8 shadow-md rounded-md">
      {/* <div className="ms-12 me-12 my-4"> */}
        <h2 className="text-2xl font-bold mb-4 text-center">Add Data</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <select
              id="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
              // defaultValue={"Destiny"}
            >
              {Object.values({
                DESTINY: "Destiny",
                SOUL: "Soul",
                PERSONALITY: "Personality",
                INTENSIFICATION: "Intensification",
                KARAMA: "Karama",
                SUBCONSCIOUS: "Subconscious",
                POINTOFSECURITY: "Point Of Security",
                BIRTHDAY: "Birth Day",
                LIFEPATH: "Life Path",
                PERSONALYEAR: "Personal Year",
                PERSONALMONTH: "Personal Month",
                PERSONALDAY: "Personal Day",
                CORENUMBERCOMBO: "Core Number Combo",
              }).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="numerologyNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              Numerology Number
            </label>
            <input
              type="number"
              id="numerologyNumber"
              name="numerologyNumber"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.numerologyNumber}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="what_is_heading"
              className="block text-gray-700 font-bold mb-2"
            >
              What is Heading
            </label>
            <input
              type="text"
              id="what_is_heading"
              name="what_is_heading"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.what_is_heading}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="what_is_description"
              className="block text-gray-700 font-bold mb-2"
            >
              What is Description
            </label>
            <textarea
              id="what_is_description"
              name="what_is_description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.what_is_description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="what_is_description"
              className="block text-gray-700 font-bold mb-2"
            >
              Heading
            </label>
            <textarea
              id="heading"
              name="heading"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.heading}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="add_description"
              className="block text-gray-700 font-bold mb-2"
            >
              Add Description
            </label>
            <textarea
              id="add_description"
              name="add_description"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.add_description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="suggestion"
              className="block text-gray-700 font-bold mb-2"
            >
              Suggestion
            </label>
            <textarea
              id="suggestion"
              name="suggestion"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.suggestion}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row items-center"
              
            >
              <Plus size={20}/>
              {/* <span className="mx-2">Add</span> */}
            </button>
          </div>
        </form>
      {/* </div> */}
    </div>
    </div>
  ) : (
    ""
  );
}

export default UploadDataForm;
