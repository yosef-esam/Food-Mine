import axios from "axios";

export const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const Login = async (email, password) => {
  const { data } = await axios.post("/api/users/login", { email, password });
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const register = async (registerInfo) => {
  const { data } = await axios.post("/api/users/register", registerInfo);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const Logout = () => {
  localStorage.removeItem("user");
};
