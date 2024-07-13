import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../auth";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const PublicRoutes = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <Routes>
      {!accessToken && <Route path="/auth/*" element={<Auth />} />}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default PublicRoutes;
