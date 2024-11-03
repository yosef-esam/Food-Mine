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
export const updateProfile = async (updateuser) => {
  const { data } = await axios.put("/api/users/updateProfile", updateuser);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
export const changePassword = async (passwords) => {
  const { data } = await axios.put("/api/users/changePassword", passwords);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
