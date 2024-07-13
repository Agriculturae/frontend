import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const Dashboard = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);
  return (
    <div className="space-x-2">
      <h1>Dashboard</h1>
      <h2>Access Token: {accessToken}</h2>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        className="p-button-outlined p-button-danger"
        onClick={() => {
          localStorage.removeItem("accessToken");
          dispatch(logout());
          navigate("/auth/login");
        }}
      />
    </div>
  );
};

export default Dashboard;
