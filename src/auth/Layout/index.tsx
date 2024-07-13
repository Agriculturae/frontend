import { toAbsoluteUrl } from "../../helpers";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-primary p-8 md:p-10">
      <div className="hidden md:flex items-center justify-center w-1/2 h-full bg-primary-light rounded-l-lg text-primary text-5xl font-bold">
        <img
          src={toAbsoluteUrl("/media/images/logos/logo-text.png")}
          alt="Logo"
          className="w-2/3"
        />
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 h-full bg-white rounded-lg md:rounded-none md:rounded-r-lg">
        <div className="max-w-[400px] w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
