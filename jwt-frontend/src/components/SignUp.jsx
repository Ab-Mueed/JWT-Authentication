import { useState } from "react";
import { signUp } from "../AuthService";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(username, password);
      alert("User Registered Successfully!");
    } catch (error) {
      alert("Registration Failure ☹️");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1c1c22] text-white">
      <div className="bg-[#1c1c22] text-gray-300 p-8 flex flex-col gap-2 sm:p-10 md:p-12 rounded-xl shadow-xl border border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#00ff99]">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          <input
            className="block w-full rounded-lg border-0 py-2 px-4 text-gray-900 shadow-md ring-1 ring-inset ring-gray-600 placeholder-gray-500 focus:ring-2 focus:ring-[#00ff99] sm:text-base"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="block w-full rounded-lg border-0 py-2 px-4 text-gray-900 shadow-md ring-1 ring-inset ring-gray-600 placeholder-gray-500 focus:ring-2 focus:ring-[#00ff99] sm:text-base"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-[#00ff99] px-4 py-2 text-[#1c1c22] font-semibold shadow hover:bg-[#00e187] focus:outline-none focus:ring-2 focus:ring-[#00ff99] focus:ring-offset-2 transition-colors"
          >
            Register
          </button>
        </form>
        <p className="md:text-right">
          Already Have an Account?{" "}
          <Link to={"/login"} className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;