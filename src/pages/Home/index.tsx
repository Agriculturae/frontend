import { toAbsoluteUrl } from "../../helpers";
import PromoteCard from "./components/PromoteCard";
import styles from "./Home.module.css";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import MarketIcon from "/media/icons/market.svg";
import WasteIcon from "/media/icons/waste.svg";
import ProduceIcon from "/media/icons/produce.svg";
import FarmerIcon from "/media/icons/farmer.svg";
import { Accordion, AccordionTab } from "primereact/accordion";

const Home = () => {
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="">
        {/* Landing */}
        <div className="relative flex flex-col items-center justify-between w-full h-[calc(100vh-200px)] overflow-x-hidden">
          <video
            src={toAbsoluteUrl("/media/videos/landing-video.mp4")}
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 -z-20 w-full h-full object-cover blur-sm"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-10" />
          <div className="flex flex-col items-center justify-between w-full h-full z-10">
            {/* Header */}
            <div className="flex items-center justify-between w-full px-10 md:px-24 py-6 md:py-12 z-10">
              <div>&nbsp;</div>
              <div className="flex items-center space-x-24">
                {/* Navbar */}
                <ul className="hidden md:flex items-center space-x-12 list-none">
                  <li className={styles["nav-item"]}>
                    <a
                      href="#about-us"
                      className="relative text-white font-medium text-xl font-montserrat"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll("about-us");
                      }}
                    >
                      About Us
                    </a>
                  </li>
                  <li className={styles["nav-item"]}>
                    <a
                      href="#affiliate"
                      className="relative text-white font-medium text-xl font-montserrat"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll("affiliate");
                      }}
                    >
                      Affiliate
                    </a>
                  </li>
                  <li className={styles["nav-item"]}>
                    <a
                      href="#faq"
                      className="relative text-white font-medium text-xl font-montserrat"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll("faq");
                      }}
                    >
                      FAQ
                    </a>
                  </li>
                  <li className={styles["nav-item"]}>
                    <a
                      href="#contact-us"
                      className="relative text-white font-medium text-xl font-montserrat"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll("footer");
                      }}
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>

                {/* Get Started Button */}
                <button className="flex items-center justify-center space-x-4 px-8 bg-gradient-to-b from-primary-light to-primary rounded-[20px] h-[60px] shadow-lg shadow-primary hover:scale-105  transition-all duration-300 z-20">
                  <p className="text-white font-semibold">Coming Soon</p>
                  <FaChevronRight className="text-white" />
                </button>
              </div>
            </div>
            <h1 className="text-5xl text-white font-semibold font-montserrat p-5 md:p-0 text-center ">
              Connecting Farms to Future Markets
            </h1>
            <div className="p-4 animate-bounce">
              <FaChevronDown className="text-5xl text-white" />
            </div>
          </div>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-[200px]">
            <h2 className="text-secondary text-4xl font-bold font-montserrat text-center">
              Discover the future of farm-to-business
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center w-full space-y-6 md:space-y-0 space-x-0 md:space-x-12">
            <PromoteCard
              icon={MarketIcon}
              title="Direct Market Access"
              description="Agriculturae eliminates intermediaries, allowing farmers to sell directly to supermarkets and restaurants, ensuring they receive fair market value for their produce."
            />
            <PromoteCard
              icon={WasteIcon}
              title="Reduced Waste and Increased Profitability"
              description="By connecting directly with buyers, farmers can better manage supply and demand, reducing the likelihood of unsold produce and minimizing waste."
            />
            <PromoteCard
              icon={ProduceIcon}
              title="Fresh and Local Produce"
              description="Buyers have direct access to fresh, locally-sourced produce, which can enhance the quality of their offerings and appeal to consumers who prioritize local and sustainable food sources."
            />
            <PromoteCard
              icon={FarmerIcon}
              title="Support for Farmers"
              description="Agriculturae is committed to empowering smaller farms that often struggle to compete with larger agricultural businesses, providing them with the tools and connections needed to thrive."
            />
          </div>

          {/* About Us */}
          <div
            className="grid grid-cols-2 gap-2 mt-8 max-w-screen-lg p-5 md-p-0"
            id="about-us"
          >
            <div className="h-[500px] col-span-2 md:col-span-1"></div>
            <div className="col-span-2 md:col-span-1 flex flex-col space-y-5 items-center md:items-start justify-center h-full">
              <h3 className="text-3xl text-primary font-bold">About Us</h3>
              <p className="text-dark text-lg font-semibold">
                Agriculturae revolutionizes the agricultural supply chain by
                directly connecting farmers with supermarkets and restaurants
                through our platform. Based in Vancouver, Canada, we are
                dedicated to addressing the inefficiencies in the traditional
                decentralized trading system that small and medium-sized farmers
                face.
              </p>
            </div>
          </div>

          {/* Affiliate */}
          <div
            className="flex flex-col space-y-12 items-center justify-center w-full my-12 max-w-screen-lg"
            id="affiliate"
          >
            <h3 className="text-3xl text-secondary font-bold">Affiliates</h3>
            <div className="flex items-center flex-wrap justify-center md:justify-between w-full">
              <img
                src={toAbsoluteUrl("/media/images/companies/longhouse.png")}
                alt="Affiliate 1"
                className="w-32 object-contain"
              />
              <img
                src={toAbsoluteUrl("/media/images/companies/hopi.png")}
                alt="Affiliate 2"
                className="w-32 object-contain"
              />
              <img
                src={toAbsoluteUrl(
                  "/media/images/companies/minor-preneurs.png"
                )}
                alt="Affiliate 3"
                className="w-36 object-contain"
              />

              <img
                src={toAbsoluteUrl("/media/images/companies/stargate.png")}
                alt="Affiliate 4"
                className="w-36 object-contain"
              />
              <img
                src={toAbsoluteUrl("/media/images/companies/faradai.png")}
                alt="Affiliate 5"
                className="w-32 object-contain"
              />
            </div>
          </div>

          {/* FAQ */}
          <div
            className="flex flex-col space-y-5 items-center justify-center w-full my-12 max-w-screen-lg p-5 md:p-0"
            id="faq"
          >
            <h3 className="text-3xl text-secondary font-bold">FAQ</h3>
            <Accordion multiple activeIndex={[0]} className="w-full">
              <AccordionTab header="How does Agriculturae work?">
                <p className="m-2 font-semibold">
                  Agriculturae connects farmers directly with supermarkets and
                  restaurants, streamlining the agricultural supply chain. The
                  platform facilitates efficient transactions, optimal pricing,
                  and improved logistics through a user-friendly interface.
                </p>
              </AccordionTab>
              <AccordionTab header="Can I request specific times and products to ship?">
                <div className="flex flex-col items-center justify-center font-semibold">
                  <p className="m-5">
                    Yes, you can request specific times and products on
                    Agriculturae. Our platform is designed to offer maximum
                    flexibility and convenience for both farmers and buyers.
                    Here’s how it works:
                  </p>
                  <ul className="ml-10 list-decimal">
                    <li>
                      Listing Your Products:
                      <ul className="list-disc">
                        <li>
                          Product Details: Provide detailed information about
                          each product you list, including quality, quantity,
                          and available delivery dates.
                        </li>
                        <li>
                          Availability: Update your availability calendar to
                          reflect when products are ready for delivery, ensuring
                          buyers have accurate information.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Receiving Orders:
                      <ul className="list-disc">
                        <li>
                          Order Notifications: Get notified instantly when a
                          buyer places an order, including all customization
                          details.
                        </li>
                        <li>
                          Delivery Scheduling: Coordinate with buyers to confirm
                          delivery times that work for both parties, ensuring
                          smooth logistics.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </AccordionTab>
              <AccordionTab header="Where are you located?">
                <p className="m-5 font-semibold">
                  Our headquarters is situated in the city of Vancouver, British
                  Columbia. 123 Farmland Ave Vancouver, BC, Canada
                </p>
              </AccordionTab>
              <AccordionTab header="Is Agriculturae free?">
                <p className="m-5 font-semibold">
                  To help farmers and buyers get acquainted with our platform
                  and experience its benefits, Agriculturae offers the first
                  year of service completely free of charge. This includes full
                  access to all features, such as listing produce, browsing
                  products, placing orders, and utilizing optimization tools.
                  <br />
                  After the initial free year, Agriculturae will implement a
                  flexible pricing model to ensure continued affordability and
                  value for all users.
                </p>
              </AccordionTab>
            </Accordion>
          </div>

          {/* Footer */}
          <div
            className="flex flex-col w-full bg-primary-light min-h-[700px] font-montserrat p-24"
            id="footer"
          >
            <div className="h-[300px]"></div>
            <div className="grid grid-cols-9 gap-5 max-w-screen-2xl mx-auto text-white">
              <div className="col-span-9 md:col-span-2 flex flex-col items-start justify-start space-y-5 h-full">
                <h5 className="text-3xl text-white font-bold">
                  Contact Information
                </h5>
                <p>123 Farmland Ave, Vancouver, BC, Canada</p>
                <a href="mailto:info@agriculturae.com">
                  <p>
                    <span className="underline">
                      <u>
                        <strong>Email:</strong>
                      </u>
                    </span>{" "}
                    info@agriculturae.com
                  </p>
                </a>
                <a href="tel:+11234567890">
                  <p>
                    <span className="underline">
                      <u>
                        <strong>Phone:</strong>
                      </u>
                    </span>{" "}
                    +1 123-456-7890
                  </p>
                </a>
              </div>

              <div className="col-span-9 md:col-span-2 flex flex-col items-start justify-start space-y-5 h-full">
                <h5 className="text-3xl text-white font-bold">
                  Social Media Links
                </h5>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Linkedin</a>
                <a href="#">Instagram</a>
              </div>

              <div className="col-span-9 md:col-span-2 flex flex-col items-start justify-start space-y-5 h-full">
                <h5 className="text-3xl text-white font-bold">Legal</h5>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>

              <div className="col-span-9 md:col-span-3 flex flex-col items-end justify-start space-y-5 h-full">
                <p>
                  Sign up today to learn more about how Agriculturae can help
                  your business grow and thrive in the competitive agricultural
                  market.
                </p>
                <button className="flex items-center justify-center space-x-4 px-8 bg-gradient-to-b from-primary-light to-primary rounded-[20px] h-[60px] shadow-lg border border-primary shadow-primary hover:scale-105  transition-all duration-300 z-20">
                  <p className="text-white font-semibold">Coming Soon !</p>
                  <FaChevronRight className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
