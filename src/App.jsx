// import { Link } from 'react-router-dom';

// function App() {
//   return (
//     <>
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold mb-6">Know Thy Numbers</h1>
//           <div className="mb-6">
//             <Link
//               to="/login"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//         {/* <Outlet /> */}
//       </div>
//     </>
//   );
// }

// export default App;

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Outlet /> {/* This will render the child routes */}
    </div>
  );
}

export default App;
