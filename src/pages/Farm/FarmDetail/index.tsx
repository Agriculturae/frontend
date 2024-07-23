import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { setHeader } from "../../../redux/slices/headerSlice";
import { toAbsoluteUrl } from "../../../helpers";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import Map from "../../../common/components/Map";
import { TabPanel, TabView } from "primereact/tabview";
import "./FarmDetail.css";
import ProductCard from "./components/ProductCard";
import api from "../../../api";

const FarmDetail = () => {
  const farm = useSelector((state: RootState) => state.farm.farm);
  const user = useSelector((state: RootState) => state.auth.user);

  const [listings, setlistings] = useState<
    {
      name: string;
      quantity: number;
      price: number;
    }[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHeader("Farm Detail | " + farm?.name));
  }, []);

  useEffect(() => {
    api
      .get("/listings", {
        params: {
          farmId: farm?.id,
        },
      })
      .then((res) => {
        setlistings(res.data.listings);
      });
  }, []);

  return (
    <>
      {user?.farmId === null && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-white">
          &nbsp;
        </div>
      )}
      <div className="grid grid-cols-2 gap-24 p-4 md:p-12">
        <div className="flex col-span-2 md:col-span-1 flex-col justify-between items-center gap-4">
          <img
            src={toAbsoluteUrl("/media/images/defaults/default-farm.png")}
            alt={farm?.name}
            className="w-64 h-64 object-cover rounded-full"
          />
          <div className="flex flex-col items-start space-y-2">
            <span className="flex items-center space-x-4 font-semibold text-xl text-dark">
              {farm?.name}
            </span>
            <span className="flex flex-col space-y-1">
              <span className="flex items-center space-x-2">
                <IoLocationSharp className="text-2xl text-primary" />
                <span>
                  {farm?.address}, {farm?.city}
                </span>
              </span>
              <span className="ml-8">
                {farm?.zip}, {farm?.province}
              </span>
              <span className="ml-8">{farm?.country}</span>
            </span>
            <span className="flex items-center space-x-2">
              <MdOutlineEmail className="text-2xl text-primary" />
              <a
                href={`mailto:${farm?.email}`}
                className="text-dark hover:underline"
              >
                {farm?.email}
              </a>
            </span>
            <span className="flex items-center space-x-2">
              <MdOutlineLocalPhone className="text-2xl text-primary" />
              <a
                href={`tel:${farm?.phone}`}
                className="text-dark hover:underline"
              >
                {farm?.phone}
              </a>
            </span>
          </div>
        </div>
        <span className="col-span-2 md:col-span-1">
          <Map
            initialCenter={{
              lat: farm?.lat || 0,
              lng: farm?.lng || 0,
            }}
            initialPosition={{
              lat: farm?.lat || 0,
              lng: farm?.lng || 0,
            }}
          />
        </span>
        <span className="flex flex-col col-span-2 bg-primary rounded-2xl text-white px-4 pt-6 pb-4">
          <h2 className="font-montserrat text-4xl">Overview</h2>
          <TabView className="w-full rounded-[20px] bg-white mt-4">
            <TabPanel header="My Products">
              <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
                {listings.map((listing, index) => (
                  <ProductCard key={index} {...listing} />
                ))}
              </div>
            </TabPanel>
            <TabPanel header="My Orders">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
            <TabPanel header="My Earnings">
              <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
          </TabView>
        </span>
      </div>
    </>
  );
};

export default FarmDetail;
