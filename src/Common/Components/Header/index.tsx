import { Image } from "primereact/image";
import Navbar from "../Navbar";
import { toAbsoluteUrl } from "../../../helpers";
import { Button } from "primereact/button";
import { VscDebugStart } from "react-icons/vsc";

const Header = () => {
  const navList: NavList[] = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  return (
    <div className="fixed flex items-center justify-between w-full backdrop-blur h-24 px-3 lg:px-24 z-50">
      <div className="flex space-x-12 items-center h-full">
        <Image
          src={toAbsoluteUrl("/media/images/logo-transparent-sq-nobg.png")}
          alt="logo"
          width="80"
          height="80"
          className="scale-150"
        />
        <Navbar navList={navList} />
      </div>
      <Button
        label="Get Started"
        icon={<VscDebugStart className="mr-2" />}
        className="bg-white hover:bg-light text-primary transition-bg duration-300 p-3 rounded-full"
      />
    </div>
  );
};

export default Header;
