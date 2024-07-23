import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type === "Farmer" && user.farmId) {
      navigate(`/farm/${user.farmId}`);
    } else if (user?.type === "Buyer" && user.businessId) {
      navigate(`/business/${user.businessId}`);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white z-10">
      &nbsp;
    </div>
  );
};

export default Dashboard;
