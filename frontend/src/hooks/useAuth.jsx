import { useContext, useState, createContext } from "react";
import { toast } from "react-toastify";
import * as userService from "../services/userServices";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(userService.getUser());
  const login = async (email, password) => {
    try {
      const user = await userService.Login(email, password);
      setUser(user);
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const register = async (data) => {
    try {
      const user = await userService.register(data);
      setUser(user);
      toast.success("Registration Successful");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  const updateProfile = async (data) => {
    try {
      const user = await userService.updateProfile(data);
      setUser(user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const logout = () => {
    userService.Logout();
    setUser(null);
    toast.success("Logout Successful");
  };
  const changePassword = async (passwords) => {
    await userService.changePassword(passwords);
    logout();
    toast.success("Password updated successfully");
  };
  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
