import { useState, useEffect } from "react";
import {
  refreshToken,
  isTokenExpired,
  fetchProtectedResource,
} from "../AuthService";
import axios from "axios";

const UserPage = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  console.log(accessToken);
  const [protectedData, setProtectedData] = useState(null);
  const username = localStorage.getItem("username");

  const handleProtectedRequest = async () => {
    console.log("Handle Protected Request");
    let token = accessToken;

    if (isTokenExpired(token)) {
      const refreshTokenValue = localStorage.getItem("refreshToken");
      try {
        token = await refreshToken(refreshTokenValue);
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
      } catch (error) {
        alert("Failed to refresh token. Please log in again.");
        return;
      }
    }

    try {
      const response = await fetchProtectedResource(token);
      setProtectedData(response.data);
    } catch (error) {
      alert("Failed to access protected resource.");
    }
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#1c1c22] to-gray-900 text-white">
      <div className="bg-[#1c1c22] text-gray-300  p-8 sm:p-10 md:p-12 rounded-xl shadow-xl border border-gray-700 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl text-center my-2">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-[#00ff99]">
          Welcome, {username}
        </h1>

        <p className="mb-4 text-gray-400 text-left">
          <span className="text-lg text-green-400">1. </span>Click on "Access
          Protected Resource" to retrieve protected data using your access
          token.
        </p>
        <p className="mb-4 text-gray-400 text-left ">
          <span className="text-lg text-green-400">2. </span>Wait for 2 minutes,
          then click on 'Access Protected Resource' again to see the access
          token change, along with the iat (issued at) and exp (expiration)
          fields in the Protected Data.
        </p>
        <p className="mb-4 text-gray-400 text-left">
          <span className="text-lg text-green-400">3. </span>If you click on the
          "Access Protected Resource" button before the 2 minutes are up, you
          will notice that nothing happens, as the token has not yet changed.
        </p>

        <button
          onClick={handleProtectedRequest}
          className="w-full rounded-lg bg-[#00ff99] px-4 py-2 text-[#1c1c22] font-semibold shadow hover:bg-[#00e187]  transition-colors mb-4"
        >
          Access Protected Resource
        </button>
        {protectedData && (
          <div className="flex flex-col gap-2">
            <p className="text-gray-300 bg-[#1c1c22] p-3 rounded-lg border border-gray-700 w-full text-center break-words overflow-auto">
              <span className="text-[#00ff99] text-lg italic">
                Protected Data
              </span>
              :{" "}
              {
                <div>
                  <p>Message: {protectedData.message}</p>
                  <p>Issued At: {protectedData.user.iat}</p>
                  <p>Expiry: {protectedData.user.exp}</p>
                </div>
              }
            </p>
            <p className="text-gray-300 bg-[#1c1c22] p-3 rounded-lg border border-gray-700 w-full text-center break-words overflow-auto">
              <span className="text-[#00ff99] text-lg italic">
                Access Token
              </span>
              : {accessToken}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
