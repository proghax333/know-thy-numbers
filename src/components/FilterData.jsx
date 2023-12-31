import React, { useState } from "react";
import { X, Filter } from "lucide-react"

const FilterData= ({ filterText, filterOption, onFilter, onClear }) => {
  // return (<div className="flex flex-row me-4 my-2">
  //   <input
  //     id="search"
  //     className="p-2 border border-gray-300 rounded"
  //     type="text"
  //     placeholder="Filter table data..."
  //     value={filterText}
  //     onChange={onFilter}
  //   />
  //   <button
  //       type="button"
  //       onClick={onClear}
  //       className="bg-red-200 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  flex flex-row items-center"
  //       >
  //       <X size={20}/>
  //   </button>
  // // </div>)

  // const [inputText, setInputText] = useState('');
  // const [selectedOption, setSelectedOption] = useState(null);

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

      {/* <div className="flex flex-col">
        <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
        </button>

        <div id="dropdownHover" className="z-40 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
        </div>
      </div> */}

    </div>
  );
};

export default FilterData;
