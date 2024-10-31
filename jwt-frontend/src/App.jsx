import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#1c1c22] to-gray-900 text-white">
    <div className="bg-[#1c1c22] text-gray-300 p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#00ff99]">
        JWT Authentication Demo
      </h1>
      <p className="text-gray-400 mb-4">
        For Registering User, use{" "}
        <Link to="/signup">
          <span className="text-[#00ff99] font-semibold hover:text-[#00e187]">"/signup"</span>
        </Link>{" "}
        Route
      </p>
      <p className="text-gray-400">
        For Login, use{" "}
        <Link to="/login">
          <span className="text-[#00ff99] font-semibold hover:text-[#00e187]">"/login"</span>
        </Link>{" "}
        Route
      </p>
    </div>
  </div>
  
  );
};

export default App;
