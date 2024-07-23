import useIsMobile from "../../../hooks/useIsMobile";
import { toAbsoluteUrl } from "../../../helpers";
import { HiOutlineLogout } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { Button } from "primereact/button";
import SidebarItem from "./SidebarItem";
import { PiFarmFill } from "react-icons/pi";
import { IoBusiness } from "react-icons/io5";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { GiFruitBowl } from "react-icons/gi";

interface Props {
  setLogoutConfirm: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setLogoutConfirm }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <div className="!w-[265px] !min-w-[265px] h-screen">
          <div className="flex flex-col items-center justify-between px-2 pb-4 h-full">
            <div className="flex flex-col items-center justify-start w-full space-y-5">
              <div className="flex items-center justify-center h-[70px]">
                <img
                  src={toAbsoluteUrl("/media/images/logos/logo-text.png")}
                  className="object-contain h-[70px]"
                />
              </div>
              <div className="flex flex-col items-center justify-center w-full space-y-2">
                {user?.type === "Farmer" && (
                  <>
                    <SidebarItem
                      title="My Farm"
                      icon={<PiFarmFill />}
                      to={`/farm/${user.farmId}`}
                    />
                    <SidebarItem
                      title="Listings"
                      icon={<GiFruitBowl />}
                      to={`/farm/${user.farmId}`}
                      expandable
                      subItems={[
                        {
                          label: "Create a Listing",
                          path: "/product/new-listing",
                        },
                      ]}
                    />
                  </>
                )}
                {user?.type === "Buyer" && (
                  <SidebarItem
                    title="My Business"
                    icon={<IoBusiness />}
                    to={`/business/${user.businessId}`}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <Button
                label="Logout"
                icon={<HiOutlineLogout className="text-2xl" />}
                severity="danger"
                className="flex items-center justify-center w-full bg-transparent border-none hover:bg-red-100 text-red-600 rounded-lg"
                onClick={() => setLogoutConfirm(true)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
