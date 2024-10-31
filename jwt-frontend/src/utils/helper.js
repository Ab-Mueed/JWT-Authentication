import { login } from "../AuthService";
import { signUp } from "../AuthService";

export const handleLogin = async (username, password, navigate) => {
  try {
    const response = await login(username, password);
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    localStorage.setItem("username", username);
    alert("Login Successful");
    navigate("/user");
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const handleSignUp = async (username, password) => {
  try {
    const response = await signUp(username, password);
    console.log(response);
    alert("User Registered Successfully!");
  } catch (error) {
    alert(error.response.data.message);
  }
};
