import { Route, Routes, useNavigate } from "react-router-dom";
import AddBusiness from "./AddBusiness";
import BusinessDetail from "./BusinessDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

const Business = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type === "Buyer") {
      if (user?.businessId) {
        navigate(`/business/${user.businessId}`);
      } else {
        navigate("/business/add");
      }
    }
  }, []);

  useEffect(() => {
    if (user?.type === "Farmer") {
      navigate(`/farm/${user.farmId}`);
    }
  }, []);

  return (
    <Routes>
      <Route path="/add" element={<AddBusiness />} />
      <Route path="/:id" element={<BusinessDetail />} />
    </Routes>
  );
};

export default Business;
