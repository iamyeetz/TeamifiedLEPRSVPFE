import { useContext, useState } from "react";
import Login from "../components/Login";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { login } = useContext(UserContext)!;
  const navigate = useNavigate();
  const handleLogin = async (username : string) => {
    await login(username);
    navigate("/events");
  }
    return (
      <>
        <Login handleLogin={handleLogin}/>
      </>
    );
  };


export default LoginPage;
