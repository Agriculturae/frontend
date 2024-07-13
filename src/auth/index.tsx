import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Layout from "./Layout";
import Verification from "./Pages/Verification";
import ForgotPassword from "./Pages/ForgotPassword";

const Auth = () => {
  return (
    <Layout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="verify-email/:verificationCode"
          element={<Verification />}
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Layout>
  );
};

export default Auth;
