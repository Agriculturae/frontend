import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Header from "../Common/Components/Header";

const PublicRoutes = () => {
  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
};

export default PublicRoutes;
