import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setHeader } from "../../../redux/slices/headerSlice";
import { Steps } from "primereact/steps";

import ProductIcon from "/media/icons/product.svg";
import { TbTruckDelivery } from "react-icons/tb";
import { MenuItem } from "primereact/menuitem";
import { TbZoomCheck } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import CreateForm from "./components/CreateForm";
import { useLocation, useNavigate } from "react-router-dom";
import PreviewListing from "./components/PreviewListing";
import api from "../../../api";
import { Toast } from "primereact/toast";
import ConfirmIcon from "/media/icons/confirm.svg";
import { Button } from "primereact/button";

const CreateListing = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [listingProduct, setListingProduct] =
    useState<CreateListingModel | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useRef<Toast>(null);

  const handleCreateListing = () => {
    setLoading(true);
    api
      .post("/listings/create", listingProduct)
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === "success") {
          setActiveIndex(3);
          navigate(`?step=3`, { replace: false });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    dispatch(setHeader("Create Listing"));
  }, []);

  useEffect(() => {
    // Sayfa yenilendiğinde step 0 dan başla
    setActiveIndex(0);
    // URL'den activeIndex'i kaldır
    navigate(`?step=0`, { replace: true });
  }, []);

  useEffect(() => {
    // Sayfa yüklendiğinde, URL'den activeIndex değerini al
    const queryParams = new URLSearchParams(location.search);
    const index = queryParams.get("step");
    if (index) {
      setActiveIndex(Number(index));
    }
  }, [location]);

  const handleStepChange = (index: number) => {
    setActiveIndex(index);
    // URL'ye activeIndex ekle
    navigate(`?step=${index}`, { replace: false });
  };

  const itemRenderer = (item: MenuItem, itemIndex: number) => {
    const isActiveItem = activeIndex === itemIndex;
    const backgroundColor = isActiveItem ? "#ebfaeb" : "white";
    const textColor = isActiveItem ? "black" : "gray";

    return (
      <span
        className="flex items-center justify-center rounded-full border border-primary h-[3rem] w-[3rem] z-10 cursor-pointer"
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
          marginTop: "-25px",
        }}
        onClick={() => setActiveIndex(itemIndex)}
      >
        {item.icon}
      </span>
    );
  };

  const items = [
    {
      icon: <img src={ProductIcon} className="w-6 text-primary" />,
      template: (item: MenuItem) => itemRenderer(item, 0),
      title: "Product Information",
    },
    {
      icon: <TbTruckDelivery className="text-2xl text-primary" />,
      template: (item: MenuItem) => itemRenderer(item, 1),
      title: "Price and Logistics",
    },
    {
      icon: <TbZoomCheck className="text-2xl text-primary" />,
      template: (item: MenuItem) => itemRenderer(item, 2),
      title: "Preview Listing",
    },
    {
      icon: <FaCheck className="text-xl text-primary" />,
      template: (item: MenuItem) => itemRenderer(item, 3),
      title: "Success",
    },
  ];

  return (
    <>
      <Toast ref={toast} />
      <div className="flex flex-col items-center space-y-10 my-10">
        <Steps
          model={items}
          activeIndex={activeIndex}
          readOnly={true}
          className="m-2 pt-4 w-full max-w-screen-lg"
        />
        <h2 className="text-2xl font-bold text-primary">
          {items[activeIndex].title}
        </h2>
        {activeIndex === 0 || activeIndex === 1 ? (
          <CreateForm
            listingProduct={listingProduct}
            activeStep={activeIndex}
            setActiveStep={handleStepChange}
            setListingProduct={setListingProduct}
          />
        ) : listingProduct && activeIndex === 2 ? (
          <>
            <PreviewListing
              loading={loading}
              listingProduct={listingProduct}
              setListingProduct={setListingProduct}
              setActiveStep={setActiveIndex}
              handleCreateListing={handleCreateListing}
            />
          </>
        ) : activeIndex === 3 ? (
          <>
            <div className="flex flex-col items-center space-y-12 w-full max-w-screen-md">
              <img
                src={ConfirmIcon}
                alt="Confirm Icon"
                className="w-[100px] h-[100px]"
              />
              <p className="text-xl text-dark font-light text-center">
                <span className="font-semibold">Congratulations!</span> You have
                successfully created your listing.
              </p>
              <Button
                className="bg-primary w-52"
                severity="success"
                onClick={() => {
                  navigate("/dashboard");
                }}
                label="Go to My Listings"
              />
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default CreateListing;
