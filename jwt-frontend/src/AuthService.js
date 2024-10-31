import axios from "axios";

const API_URL = "https://jwt-authentication-backend-hdeb.onrender.com";

export const signUp = async (username, password) => {
  return axios.post(`${API_URL}/signup`, { username, password });
};

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

// Checks if the token is expired
export const isTokenExpired = (token) => {
  console.log(token);
  console.log("isTokenExpired");
  if (!token) return true;
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= exp * 1000;
};

// Request a new access token using refresh token
export const refreshToken = async (token) => {
  const response = await axios.post(`${API_URL}/token`, { token });
  return response.data.accessToken;
};

// Fetch protected resource
export const fetchProtectedResource = async (accessToken) => {
  return axios.get(`${API_URL}/protected`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
