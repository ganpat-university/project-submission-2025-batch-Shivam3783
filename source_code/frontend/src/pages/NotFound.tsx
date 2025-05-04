// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// const NotFound = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.error(
//       "404 Error: User attempted to access non-existent route:",
//       location.pathname
//     );
//   }, [location.pathname]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">404</h1>
//         <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
//         <a href="/" className="text-blue-500 hover:text-blue-700 underline">
//           Return to Home
//         </a>
//       </div>
//     </div>
//   );
// };

// export default NotFound;


import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelpCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Log the navigation to non-existent route for debugging purposes
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md mx-auto text-center ">
        {/* Question mark icon */}
        <div className="relative w-80 h-80 mx-auto mb-8 flex items-center justify-center">
          <HelpCircle className="w-64 h-64 text-[#FF5722] animate-pulse" strokeWidth={1.5} />
        </div>
        
        {/* Error message */}
        <h1 className="text-[#FF5722] text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Sorry, page not found.</h2>
        <p className="text-gray-500 mb-8">Maybe try another page?</p>
        
        {/* Go back button */}
        <button 
          onClick={() => navigate(-1)}
          className="rounded-full border border-gray-200 px-8 py-2.5 text-gray-800 hover:bg-gray-100 transition-colors"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;