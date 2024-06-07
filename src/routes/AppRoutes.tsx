import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  const user = null;

  return (
    <>
      {user && <PrivateRoutes />}
      <PublicRoutes />
    </>
  );
};

export default AppRoutes;
