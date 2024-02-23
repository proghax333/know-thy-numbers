import React, { useState } from 'react';
import { ArrowLeftFromLine, Save, PlusCircle, MinusCircle } from "lucide-react";
import axios from 'axios';
import env from "../secrets.js"
import QuillEditor from "./QuillEditor.jsx";

const { VITE_BACKEND_HOST } = env

const UpdateForm = ({ selectedItem, handleBack }) => {
  const [updatedItem, setUpdatedItem] = useState(selectedItem);
  const [dynamicFields, setDynamicFields] = useState(() => {
    let totalFields = 0;
    const fields = [];

    for(let i = 1; i <= 5; ++i) {
      const heading = selectedItem[`heading_${i}`];
      const description = selectedItem[`description_${i}`];

      fields.push({
        [`heading_${i}`]: heading,
        [`description_${i}`]: description,
      });

      if(heading || description) {
        totalFields = i;
      }
    }

    console.log(fields);

    return fields.slice(0, totalFields);
  });

  const handleChange = (name, value) => {
    setUpdatedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      updatedItem["numerologyNumber"] = Number(updatedItem["numerologyNumber"])

      console.log(dynamicFields)

      dynamicFields.forEach(fields => Object.assign(updatedItem, fields))
      console.log(updatedItem)

      // Send a request to the backend to update the item
      await axios.put(`${VITE_BACKEND_HOST}/openapi/prediction/${updatedItem.id}`, updatedItem);

      alert('Item updated successfully');
      setUpdatedItem(updatedItem)
      
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  console.log("Typeof numer: ", typeof updatedItem["numerologyNumber"]);

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

  return (
    <div className="bg-white p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Data</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <select
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={updatedItem.name}
            onChange={handleChange}
          >
            {Object.values({
              DESTINY: 'Destiny',
              SOUL: 'Soul',
              PERSONALITY: 'Personality',
              INTENSIFICATION: 'Intensification',
              KARAMA: 'Karama',
              SUBCONSCIOUS: 'Subconscious',
              POINTOFSECURITY: 'Point Of Security',
              BIRTHDAY: 'Birth Day',
              LIFEPATH: 'Life Path',
              PERSONALYEAR: 'Personal Year',
              PERSONALMONTH: 'Personal Month',
              PERSONALDAY: 'Personal Day',
              CORENUMBERCOMBO: 'Core Number Combo',
          }).map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="numerologyNumber" className="block text-gray-700 font-bold mb-2">
            Numerology Number
          </label>
          <input
            type="number"
            id="numerologyNumber"
            name="numerologyNumber"
            className="w-full p-2 border border-gray-300 rounded"
            value={updatedItem.numerologyNumber}
            onChange={handleChange}
          />
        </div>

        {dynamicFields.map((field, index) => {
          console.log("Field: ", field);
          return (
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
          )
        })}
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
          <QuillEditor value={updatedItem.heading_suggestion} onChange={(content) => handleChange("heading_suggestion", content)} />
        </div>

        <div className="mb-4">
          <label htmlFor="description_suggestion" className="block text-gray-700 font-bold mb-2">
          Description Suggestion
          </label>
          <QuillEditor value={updatedItem.description_suggestion} onChange={(content) => handleChange("description_suggestion", content)} />
        </div>

        <div className='flex flex-row'>
          <button
            type="button"
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2  flex flex-row items-center"
          >
            <ArrowLeftFromLine size={20}/>
            {/* <span className="mx-2">Go Back</span> */}
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  flex flex-row items-center"
          >
            <Save size={20}/>
            {/* <span className="mx-2">Save Changes</span> */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
