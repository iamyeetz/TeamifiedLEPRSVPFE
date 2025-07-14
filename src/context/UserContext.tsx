import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import {showError} from "../utils/ToastHelper"
const API_URL = "https://localhost:7038/api";

interface UserContextType {
  user: string | null;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  // Setting initial data for user, if localstorage has save a user then it will be saved in the state, 
  // if not set the state to null
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? stored : null;
  });

  const login = async (username: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username: username,
      });
      localStorage.setItem("user", username);
      setUser(response.data);
    } catch (error) {
     showError();
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;
