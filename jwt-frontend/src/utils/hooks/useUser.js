import { useState } from "react";
import {
  refreshToken,
  isTokenExpired,
  fetchProtectedResource,
} from "../../AuthService";

const useUser = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
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

  return { accessToken, protectedData, username, handleProtectedRequest };
};

export default useUser;
