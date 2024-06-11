import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../auth";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
};

export default PublicRoutes;
