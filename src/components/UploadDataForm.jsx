import { useEffect, useState, useMemo } from "react";
import { Plus, MinusCircle, PlusCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import env from "../secrets.js";
import QuillEditor from "./QuillEditor.jsx";

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
  const [dynamicFields, setDynamicFields] = useState([{ heading_1: '', description_1: '' }]);

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

  const handleChange = (name, value) => {
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // You can perform your data upload logic here
    
    try {
      formData["numerologyNumber"] = Number(formData["numerologyNumber"]);
      
      dynamicFields.forEach(fields => Object.assign(formData, fields))
      
      console.log("Form Data:", formData);

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

  const handleFieldChange = (index, name, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][name] = value;
    setDynamicFields(updatedFields);
  };

  const handleAddField = (op) => {
    if(dynamicFields.length >= 5 && op === 1) {
      alert("You can only add maximum 5 heading & description")
      return
    }

    if(dynamicFields.length <= 1 && op === -1) return

    setDynamicFields(prevFields => {
      if(op === 1) {
        return [
          ...prevFields,
          { [`heading_${prevFields.length + 1}`]: '', [`description_${prevFields.length + 1}`]: '' },
        ]
      } else if (op === -1) {
        return prevFields.slice(0, prevFields.length - 1)
      }
    })
  };

  return authenticated ? (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 shadow-md rounded-md">
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
              onChange={(e) => handleChange("name", e.target.value)}
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
              onChange={(e) => handleChange("numerologyNumber", e.target.value)}
            />
          </div>

          {dynamicFields.map((field, index) => (
            <div key={index + 1} className="mb-4">
              <label htmlFor={`heading_${index + 1}`} className="block text-gray-700 font-bold mb-2">
                Heading {index + 1}
              </label>
              <QuillEditor
                value={field[`heading_${index + 1}`]}
                onChange={content => handleFieldChange(index, `heading_${index+1}`, content)}
              />
              <label htmlFor={`description_${index + 1}`} className="block text-gray-700 font-bold mb-2 mt-4">
                Description {index + 1}
              </label>
              <QuillEditor
                value={field[`description_${index + 1}`]}
                onChange={content => handleFieldChange(index, `description_${index+1}`, content)}
              />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleAddField(1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2  flex flex-row items-center"
            >
              <PlusCircle size={20}/>
            </button>
            <button
              type="button"
              onClick={() => handleAddField(-1)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  flex flex-row items-center"
            >
              <MinusCircle size={20}/>
            </button>
          </div>

          <div className="mb-4">
            <label
              htmlFor="suggestion"
              className="block text-gray-700 font-bold mb-2"
            >
              Suggestion
            </label>
            <QuillEditor value={formData.suggestion} onChange={(content) => handleChange("suggestion", content)} />
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
      </div>
    </div>
  ) : (
    ""
  );
}

export default UploadDataForm;
