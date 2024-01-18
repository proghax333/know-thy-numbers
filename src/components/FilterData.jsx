import React, { useState } from "react";
import { X, Filter } from "lucide-react"

const FilterData= ({ filterText, filterOption, onFilter, onClear }) => {

  const options = [
    {
      "key": "id",
      "value": "ID"
    },
    {
      "key": "name",
      "value": "Name"
    },
    {
      "key": "numerologyNumber",
      "value": "Numerology Number"
    },
    {
      "key": "what_is_heading",
      "value": "What is Heading"
    },
    {
      "key": "what_is_description",
      "value": "What is Description"
    },
    {
      "key": "heading",
      "value": "Heading"
    },
    {
      "key": "description",
      "value": "Description"
    },
    {
      "key": "add_description",
      "value": "Add Description"
    },
    {
      "key": "suggestion",
      "value": "Suggestion"
    }
  ];
  
  const [inputText, setInputText] = useState(filterText)
  const [selectedOption, setSelectedOption] = useState(filterOption)

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleOptionSelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };

  const handleClear = (e) => {
    e.preventDefault()
    setInputText("");
    setSelectedOption("");
    onClear()
  };

  const handleFilter = (e) => {
    e.preventDefault()
    if(inputText && selectedOption) {
      onFilter(inputText, selectedOption)
    }
  };

  return (
    <div className="flex flex-row me-4 my-2">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type here..."
      />

      <select
        value={selectedOption}
        onChange={handleOptionSelect}
        className="p-1 hover:bg-gray-100"
      >
        <option value="">
          Select an Option
        </option>
        {options.map(({key, value}) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>

      <Filter className="ms-2 cursor-pointer hover:bg-green-500 p-2" onClick={handleFilter} size={40}/>
      <X className="ms-2 cursor-pointer hover:bg-red-500 p-2" onClick={handleClear} size={40}/>
    </div>
  );
};

export default FilterData;
