// import ReactDOM from 'react-dom/client'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import UploadDataForm from './components/UploadDataForm';
// import DataListing from './components/DataListing';
// import Table from "./components/Table"
// import SidebarLayout from "./components/SidebarLayout"
// import App from './App.jsx'
// import './index.css'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<App />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />

//       <Route path="/home" element={<SidebarLayout />} >
//         <Route path="table" element={<Table />} />
//         <Route path="upload_data" element={<UploadDataForm />} />
//         {/* <Route path="listing" element={<DataListing />} /> */}
//       </Route>
//     </>
//   )
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router}></RouterProvider>
// )

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadDataForm from './components/UploadDataForm';
// import DataListing from './components/DataListing';
import Table from "./components/Table";
import SidebarLayout from "./components/SidebarLayout";
import HomePage from './components/HomePage'; // New HomePage component
import App from './App.jsx';
import './index.css';
import { FilterProvider } from './contexts/FilterContext';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<FilterProvider><App /></FilterProvider>} >
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<SidebarLayout />} >
          <Route path="table" element={<Table />} />
          <Route path="upload_data" element={<UploadDataForm />} />
          {/* <Route path="listing" element={<DataListing />} /> Uncomment if needed */}
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
);
