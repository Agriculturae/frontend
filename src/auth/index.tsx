import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./Layout";

const Auth = () => {
  const navigate = useNavigate();

  const token = null;

  useEffect(() => {
    if (token) navigate("/dashboard");
    navigate("/auth/login");
  }, [token]);

  return (
    <Layout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Layout>
  );
};

export default Auth;
