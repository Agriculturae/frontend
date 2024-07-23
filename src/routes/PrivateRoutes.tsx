import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../common/Layout";
import Home from "../pages/Home";
import Farm from "../pages/Farm";
import Business from "../pages/Business";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CreateListing from "../pages/Listings/CreateListing";

const PrivateRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user?.type === "Farmer" ? (
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/farm/*" element={<Farm />} />
                <Route
                  path={"/product/new-listing"}
                  element={<CreateListing />}
                />
                <Route path="*" element={<Navigate to={"/dashboard"} />} />
              </Routes>
            </Layout>
          }
        />
      ) : (
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/business/*" element={<Business />} />
                <Route path="*" element={<Navigate to={"/dashboard"} />} />
              </Routes>
            </Layout>
          }
        />
      )}
    </Routes>
  );
};

export default PrivateRoutes;
