import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 shadow-md">
        <h1 className="text-xl font-bold">Know Thy Numbers</h1>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => { /* Implement logout logic */ }}
        >
          Logout
        </button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
          <button
            className="aspect-square w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={() => navigate('/home/table')}
          >
            Table
          </button>
          <button
            className="aspect-square w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
            onClick={() => navigate('/home/upload_data')}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
