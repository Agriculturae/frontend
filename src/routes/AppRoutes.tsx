import { BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AppRoutes = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <BrowserRouter>
      {accessToken && <PrivateRoutes />}
      <PublicRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
