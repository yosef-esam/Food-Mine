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
  const logout = () => {
    userService.Logout();
    setUser(null);
    toast.success("Logout Successful");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
