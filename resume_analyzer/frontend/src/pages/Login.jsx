import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import Navbar from "../components/common/Navbar";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    const res = await loginUser({ email, password });

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/analyzer"); 
    } else {
      throw new Error(res.message || "Login failed");
    }
  };

  return (
    <>
        <Navbar/>
        <div style={{ padding: "2rem", maxWidth: "550px", margin: "auto" }}>
            <LoginForm onLogin={handleLogin} />
        </div>
    </>
  );
};

export default Login;
