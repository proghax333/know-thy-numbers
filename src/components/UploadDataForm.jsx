import React, { useState, useMemo, useCallback, useRef } from "react";
import { Plus, MinusCircle, PlusCircle } from "lucide-react";
import axios from "axios";
import JoditEditor from "jodit-react";

import env from "../secrets.js";

const { VITE_BACKEND_HOST } = env;

function UploadDataForm2() {
  const [formData, setFormData] = useState({
    "name": "Destiny",
    "numerologyNumber": "",
    "heading_suggestion": "",
    "description_suggestion": ""
  });

  const [dynamicFields, setDynamicFields] = useState([{ heading_1: '', description_1: '' }]);

  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  const editorRefs = useRef(dynamicFields.map(() => ({ headingRef: React.createRef(), descriptionRef: React.createRef() })));

  const handleChange = useCallback((name, value) => {
    console.log(name, value)
    console.log(formDataRef.current)
    formDataRef.current[name] = value
  }, []);


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

  const handleFieldChange = useCallback((index, name, value) => {
    // Directly manipulate the refs without causing a state update
    if(name.startsWith('heading_')) {
      editorRefs.current[index].headingRef.current = value;
    } else if(name.startsWith('description_')) {
      editorRefs.current[index].descriptionRef.current = value;
    }
    console.log("Updated Fields:", editorRefs.current);
  }, []);


  const handleAddField = useCallback((op) => {
    console.log(dynamicFields.length)
    if(op === 1 && dynamicFields.length >= 5) {
      alert("You can add maximum 5 heading and description")
      return
    }

    if(op === -1 && dynamicFields.length <= 1) return

    setDynamicFields(prevFields => {
      const newFields = [...prevFields];
      if(op === 1) {
        newFields.push({ [`heading_${prevFields.length + 1}`]: '', [`description_${prevFields.length + 1}`]: '' });
        // Add new refs for the new dynamic field
        editorRefs.current.push({ headingRef: React.createRef(), descriptionRef: React.createRef() });
      } else if (op === -1 && prevFields.length > 1) {
        newFields.pop();
        // Remove the last ref object
        editorRefs.current.pop();
      }
      return newFields;
    });
  }, [dynamicFields]);

  const handleChange2 = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }
  

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );

  return (
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
              onChange={(e) => handleChange2("name", e.target.value)}
            >
              {Object.values({
                DESTINY: "Destiny",
                SOUL: "Soul",
                PERSONALITY: "Personality",
                INTENSIFICATION: "Intensification",
                KARMA: "Karma",
                SUBCONSCIOUS: "Subconscious",
                POINTOFSECURITY: "Point Of Security",
                BIRTHDAY: "Birth Day",
                LIFEPATH: "Life Path",
                PERSONALYEAR: "Personal Year",
                PERSONALMONTH: "Personal Month",
                PERSONALDAY: "Personal Day",
                CORENUMBERCOMBO: "Core Number Combo",
                PINNACLES: "Pinnacles",
                Challenges: "Challenges"
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
              onChange={(e) => handleChange2("numerologyNumber", e.target.value)}
            />
          </div>

          {dynamicFields.map((field, index) => (
            <div key={index + 1} className="mb-4">
              <label htmlFor={`heading_${index + 1}`} className="block text-gray-700 font-bold mb-2">
                Heading {index + 1}
              </label>
              {/* <QuillEditor
                value={field[`heading_${index + 1}`]}
                onChange={content => handleFieldChange(index, `heading_${index+1}`, content)}
              /> */}
              <JoditEditor
                value={field[`heading_${index + 1}`]}
                config={config}
                tabIndex={1}
                onChange={content => handleFieldChange(index, `heading_${index+1}`, content)}
              />
              <label htmlFor={`description_${index + 1}`} className="block text-gray-700 font-bold mb-2 mt-4">
                Description {index + 1}
              </label>
              {/* <QuillEditor
                value={field[`description_${index + 1}`]}
                onChange={content => handleFieldChange(index, `description_${index+1}`, content)}
              /> */}
              <JoditEditor
                value={field[`description_${index + 1}`]}
                config={config}
                tabIndex={1}
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
          <label htmlFor="heading_suggestion" className="block text-gray-700 font-bold mb-2">
          Heading Suggestion
          </label>
          {/* <QuillEditor value={formData.heading_suggestion} onChange={(content) => handleChange("heading_suggestion", content)} /> */}
          <JoditEditor
            // value={formData.heading_suggestion}
            config={config}
            tabIndex={1}
            onChange={(content) => handleChange2("heading_suggestion", content)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description_suggestion" className="block text-gray-700 font-bold mb-2">
          Description Suggestion
          </label>
          {/* <QuillEditor value={formData.description_suggestion} onChange={(content) => handleChange("description_suggestion", content)} /> */}
          <JoditEditor
            // value={formData.description_suggestion}
            config={config}
            tabIndex={1}
            onChange={(content) => handleChange2("description_suggestion", content)}
          />
        </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex flex-row items-center"
              
            >
              <Plus size={20}/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadDataForm2;
