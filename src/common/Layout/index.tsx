import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import { logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import useIsMobile from "../../hooks/useIsMobile";

import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

import { HiOutlineLogout } from "react-icons/hi";
import { IoWarningOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { clearBusiness } from "../../redux/slices/businessSlice";
import { clearFarm } from "../../redux/slices/farmSlice";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const isMobile = useIsMobile();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ConfirmDialog
        visible={logoutConfirm}
        onHide={() => setLogoutConfirm(false)}
        message="Are you sure you want to logout?"
        header="Logging Out"
        icon={<HiOutlineLogout className="text-3xl" />}
        draggable={false}
        footer={
          <div className="flex justify-center space-x-5">
            <Button
              label="Yes"
              severity="danger"
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                dispatch(logout());
                dispatch(clearBusiness());
                dispatch(clearFarm());
                setLogoutConfirm(false);
              }}
            />
            <Button
              label="No"
              severity="danger"
              className="bg-transparent text-red-500 px-4 py-2 rounded-lg"
              onClick={() => setLogoutConfirm(false)}
            />
          </div>
        }
        reject={() => setLogoutConfirm(false)}
        acceptClassName="bg-red-500 outline-none border-none"
        rejectClassName="text-red-500 bg-transparent border-none outline-none focus:border-none focus:outline-none"
      />

      {user?.type === "Farmer" && location.pathname !== "/farm/add" && (
        <Dialog
          header={
            <div className="flex items-center justify-center">
              <p>You don't have any registered Farm!</p>
            </div>
          }
          visible={user?.farmId === null}
          closable={false}
          style={{ width: "50vw" }}
          onHide={() => {}}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          draggable={false}
          footer={
            <div className="flex justify-center space-x-5">
              <Button
                icon={<HiOutlineLogout className="text-2xl" />}
                label="Logout"
                severity="danger"
                className="flex items-center justify-center bg-transparent border-none hover:bg-red-100 text-red-600 rounded-lg"
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearBusiness());
                  dispatch(clearFarm());
                }}
              />
              <Button
                icon={<IoMdAdd className="text-2xl" />}
                label="Add Farm"
                className="bg-primary text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  navigate("/farm/add");
                }}
              />
            </div>
          }
        >
          <div className="flex items-center justify-center space-x-5 text-dark">
            <IoWarningOutline className="text-5xl" />
            <p className="font-[500] text-lg">Please add your farm first.</p>
          </div>
        </Dialog>
      )}

      {user?.type === "Buyer" && location.pathname !== "/business/add" && (
        <Dialog
          header={
            <div className="flex items-center justify-center">
              <p>You don't have any registered Business!</p>
            </div>
          }
          visible={user?.businessId === null}
          closable={false}
          style={{ width: "50vw" }}
          onHide={() => {}}
          breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          draggable={false}
          footer={
            <div className="flex justify-center space-x-5">
              <Button
                icon={<HiOutlineLogout className="text-2xl" />}
                label="Logout"
                severity="danger"
                className="flex items-center justify-center bg-transparent border-none hover:bg-red-100 text-red-600 rounded-lg min-w-32"
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearBusiness());
                  dispatch(clearFarm());
                }}
              />
              <Button
                icon={<IoMdAdd className="text-2xl" />}
                label="Add Business"
                className="bg-primary text-white px-4 py-2 rounded-lg min-w-24"
                onClick={() => {
                  navigate("/business/add");
                }}
              />
            </div>
          }
        >
          <div className="flex items-center justify-center space-x-5 text-dark">
            <IoWarningOutline className="text-5xl" />
            <p className="font-[500] text-lg">
              Please add your business first.
            </p>
          </div>
        </Dialog>
      )}

      <div className="flex h-screen w-screen overflow-hidden bg-light box-border">
        <Sidebar setLogoutConfirm={setLogoutConfirm} />
        <div
          className={`w-full h-full ${
            isMobile ? "p-2" : "!max-w-[calc(100vw-265px)]"
          }`}
        >
          <Header />
          <div className="w-full pb-4">
            <div className="rounded-xl w-full h-full overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-78px)] !max-w-[calc(100vw-8px)] md:!max-w-[calc(100vw-81px)] p-2 md:p-0 md:pr-4">
              <div className="shadow rounded-xl  bg-white p-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
