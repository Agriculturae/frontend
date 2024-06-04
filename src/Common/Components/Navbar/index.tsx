import { Link } from "react-router-dom";

interface Props {
  navList: NavList[];
  className?: string;
}

const Navbar = ({ navList, className }: Props) => {
  return (
    <div className={`flex items-center space-x-5 ${className} hidden lg:block`}>
      {navList.map((navItem, index) => {
        return (
          <Link
            key={index}
            to={navItem.path}
            className="text-light bg-transparent hover:bg-light hover:text-primary px-8 py-2 rounded-md text-lg font-semibold transition-colors duration-300 ease-in-out"
          >
            {navItem.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
