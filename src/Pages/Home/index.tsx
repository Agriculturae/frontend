import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { VscDebugStart } from "react-icons/vsc";
import { toAbsoluteUrl } from "../../helpers";
import PageTopFloat from "../../Common/Components/PageTopFloat";
import Slider from "./Components/Slider";

const Home = () => {
  return (
    <div>
      <PageTopFloat />

      {/* Home Page Section */}
      <div
        className="w-screen"
        style={{
          height: "100vh",
          background: `url(${toAbsoluteUrl(
            "/media/images/public/customer1.jpg"
          )})`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-80 p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-screen-lg bg-white bg-opacity-10 px-10 py-5 rounded-lg">
            <span className="flex flex-col items-start justify-center space-y-10 font-exo">
              <h1 className="text-4xl font-semibold text-center text-white">
                Welcome to the Home Page
              </h1>
              <p className="text-lg text-start text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur molestias laborum modi. Quod itaque laboriosam
                recusandae unde et dignissimos praesentium nostrum accusantium
                natus corporis deleniti odit nam, eius assumenda asperiores.
              </p>
              <Button
                label="Get Started"
                icon={<VscDebugStart className="mr-2" />}
                className="bg-white hover:bg-light text-primary transition-bg duration-300 p-3 rounded-full"
              />
            </span>
            <Image
              src={toAbsoluteUrl("/media/images/logo-transparent-sq-nobg.png")}
              alt="home"
              className="rounded-lg scale-125 drop-shadow-sm shadow-white md:block hidden"
            />
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-24 bg-light">
        <div className="flex flex-col items-center justify-center w-screen space-y-12">
          <h1 className="text-5xl font-bold text-primary font-exo">
            WHO WE ARE ?
          </h1>
          <p className="font-exo text-xl text-primary font-semibold max-w-screen-md px-5 text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
            tempora non aut, consequuntur omnis, modi necessitatibus molestiae
            reprehenderit nemo ullam quibusdam incidunt quae dolorum voluptatem
            perspiciatis magni laboriosam dolores! Minus.
          </p>
        </div>
      </div>

      {/* Our Customers */}
      <div className="py-24 bg-primary">
        <div className="flex flex-col items-center justify-center w-screen space-y-12">
          <h1 className="text-5xl font-bold text-white font-exo">ASSOCIATES</h1>
          <Slider />
        </div>
      </div>

      {/* Vision and Mission */}
      <div
        style={{
          background: `url(${toAbsoluteUrl(
            "/media/images/public/home-landing.jpg"
          )})`,
          backgroundSize: "cover",
          objectFit: "cover",
          backgroundPosition: "fixed",
        }}
      >
        <div className="flex flex-col items-center justify-center w-screen space-y-12 py-24 bg-black bg-opacity-70">
          <h1 className="text-5xl font-bold text-light font-exo">
            VISION AND MISSION
          </h1>
          <p className="font-exo text-xl text-light font-semibold max-w-screen-md px-5 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            incidunt, voluptatem, quod, voluptate doloremque doloribus
            perspiciatis quas aspernatur nemo atque quidem. Quisquam, quod
            voluptas. Quisquam, quod voluptas.
          </p>
        </div>
      </div>      
    </div>
  );
};

export default Home;
