import { Route, Routes, useNavigate } from "react-router-dom";
import AddFarm from "./AddFarm";
import FarmDetail from "./FarmDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

const Farm = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type === "Farmer") {
      if (user?.farmId) {
        navigate(`/farm/${user.farmId}`);
      } else {
        navigate("/farm/add");
      }
    }
  }, []);

  useEffect(() => {
    if (user?.type === "Buyer") {
      navigate(`/business/${user.businessId}`);
    }
  }, []);

  return (
    <Routes>
      <Route path="/add" element={<AddFarm />} />
      <Route path="/:id" element={<FarmDetail />} />
    </Routes>
  );
};

export default Farm;
