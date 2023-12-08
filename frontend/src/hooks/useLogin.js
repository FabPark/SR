import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (email, password) => {
    console.log("Login function called with email:", email);
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    console.log("API Request:", response);

    const json = await response.json();
    console.log("API Response:", json);

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));
      console.log("User data stored in local storage:", json);

      const responseWithUsername = await fetch(
        "http://localhost:4000/api/user/users",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${json.token}` },
        }
      );
      const usernameData = await responseWithUsername.json();

      // Add  username to user object
      const userWithUsername = { ...json, username: usernameData.username };

      dispatch({ type: "LOGIN", payload: json });
      console.log("User data dispatched to auth context:", json);

      navigate("/");

      setIsLoading(false);
    } else {
      console.log("Login failed. Error status:", response.status);
      setIsLoading(false);
      setError("Login failed. Please check your credentials.");
    }
  };

  return { login, isLoading, error, showPassword, togglePasswordVisibility };
};
