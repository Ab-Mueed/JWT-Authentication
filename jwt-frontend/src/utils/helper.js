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
    alert("Login Failed");
  }
};

export const handleSignUp = async (username, password) => {
  try {
    await signUp(username, password);
    alert("User Registered Successfully!");
  } catch (error) {
    alert("Registration Failure ☹️");
  }
};
