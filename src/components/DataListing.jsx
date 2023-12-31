import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import env from "../secrets.js";
import { useNavigate } from "react-router-dom";

const { VITE_BACKEND_HOST } = env;

const DataListing = () => {
  const navigate = useNavigate();

  const [dataList, setDataList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [goToPage, setGoToPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // Fetch data from the backend using Axios
    const fetchData = async () => {
      try {
        const url = `${VITE_BACKEND_HOST}/openapi/prediction/findall`;
        let response = await axios({
          method: "post",
          url,
          data: { currentPage, pageSize },
          headers: { "Content-Type": "application/json" },
          // withCredentials: true
        });

        console.log(response.data);

        setDataList(response.data.data); // Assuming the response is an array of data
        setTotal(response.data.totalPage);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().then();
  }, [currentPage]);

  const handleView = (item) => {
    setSelectedItem(item);
    setIsUpdating(false);
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setIsUpdating(true);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setIsUpdating(false);
    navigate("/listing");
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleGoToUpload = () => {
    navigate("/upload_data");
  };

  const handleGoToPage = () => {
    setCurrentPage(() =>
      Math.max(1, Math.min(goToPage, Math.ceil(total / pageSize)))
    );
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {selectedItem ? (
        isUpdating ? (
          <UpdateForm selectedItem={selectedItem} handleBack={handleBack} />
        ) : (
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">View Data</h2>
            {Object.entries(selectedItem).map(([key, value]) => (
              <div key={key} className="mb-4">
                <strong className="mr-2">{key}:</strong>
                <span>{value}</span>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Back
              </button>
            </div>
          </div>
        )
      ) : (
        <div>
          <div className="flex justify-between mb-4">
            <button
              type="button"
              onClick={handleGoToUpload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Go to Upload
            </button>
            <button
              type="button"
              // onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">Data Listing</h2>
          {dataList.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow-md rounded-md mb-4 flex items-center justify-between"
            >
              <div>
                {/* <strong className="mr-2">ID:</strong> */}
                <span>
                  {item.id}&gt; {item.name}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleView(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate(item)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handlePrevPage}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex items-center">
              <label className="mr-2">Go to Page:</label>
              <input
                type="number"
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                className="border p-2 text-center"
                min="1"
                max={Math.ceil(total / pageSize)}
              />
              <button
                type="button"
                onClick={handleGoToPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
              >
                Go
              </button>
            </div>
            <button
              type="button"
              onClick={handleNextPage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={currentPage * pageSize >= total}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataListing;
