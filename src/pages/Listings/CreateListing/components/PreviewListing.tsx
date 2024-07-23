import { Dispatch, SetStateAction, useState } from "react";
import { Divider } from "primereact/divider";
import { toAbsoluteUrl } from "../../../../helpers";
import moment from "moment";
import { MdOutlineCheckCircle } from "react-icons/md";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

import FarmIcon from "/media/icons/farm.svg";
import LocationIcon from "/media/icons/location.svg";
import { MdOutlineEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Checkbox } from "primereact/checkbox";

interface PreviewListingProps {
  loading: boolean;
  listingProduct: CreateListingModel;
  handleCreateListing: () => void;
  setListingProduct: Dispatch<SetStateAction<CreateListingModel | null>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
}

const PreviewListing = ({
  loading,
  listingProduct,
  handleCreateListing,
  setListingProduct,
  setActiveStep,
}: PreviewListingProps) => {
  const [termsOfService, setTermsOfService] = useState<boolean>(
    listingProduct.termsAndConditions
  );
  const [qualityControl, setQualityControl] = useState<boolean>(
    listingProduct.qualityControl
  );

  const farm = useSelector((state: RootState) => state.farm.farm);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:gap-x-20 gap-y-8 max-w-screen-lg">
      <div className="flex items-center col-span-1 md:col-span-2 ml-4">
        <h2 className="text-2xl font-bold text-primary">
          {listingProduct.title}
        </h2>
      </div>
      <div className="flex flex-col space-y-4">
        <img
          src={toAbsoluteUrl("/media/images/defaults/default-product.jpeg")}
          alt="product"
          className="w-full rounded-lg"
        />
        <div className="flex flex-col space-y-2">
          <p className="ml-4 text-xs text-dark">Description</p>
          <div
            className="bg-gray-100 p-4 rounded-lg"
            style={{ minHeight: "150px" }}
            dangerouslySetInnerHTML={{ __html: listingProduct.description }}
          />
        </div>
        <div className="flex flex-col space-y-8 pt-8">
          <div className="flex flex-col space-y-2">
            <span className="flex space-x-2 items-center">
              <img src={FarmIcon} alt="farm" className="w-6" />
              <span className="text-dark">{farm?.name}</span>
            </span>
            <span className="flex space-x-2 items-center">
              <img src={LocationIcon} alt="farm" className="w-6" />
              <span className="text-dark">
                {farm?.city} {farm?.address}, {farm?.country} {farm?.province} -{" "}
                {farm?.zip}
              </span>
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <span className="flex space-x-2 items-center">
              <MdOutlineEmail className="text-2xl text-primary" />
              <a href={`mailto:${farm?.email}`} className="text-dark">
                {farm?.email}
              </a>
            </span>
            <span className="flex space-x-2 items-center">
              <BsTelephone className="text-xl text-primary" />
              <a href={`tel:${farm?.phone}`} className="text-dark">
                +1 {farm?.phone}
              </a>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="relative flex">
          <span className="absolute -top-1 left-2 text-dark text-lg">$</span>
          <span className="text-black ml-5 text-5xl font-bold">
            {listingProduct.price} <span className="text-lg">/ Lbs</span>
          </span>
        </div>
        <div className="flex flex-col items-center text-dark">
          <Divider />
          <div className="grid grid-cols-2 px-4 w-2/3 gap-10">
            <span className="text-end">Product:</span>
            <span className="text-center">{listingProduct.product?.name}</span>
          </div>
          <Divider />
          <div className="grid grid-cols-2 px-4 w-2/3 gap-10">
            <span className="text-end">Product Type:</span>
            <span className="text-center">
              {listingProduct.productType?.name}
            </span>
          </div>
          <Divider />
          <div className="grid grid-cols-2 px-4 w-2/3 gap-10">
            <span className="text-end">Production Date:</span>
            <span className="text-center">
              {moment(listingProduct.productionDate).format("MMM DD, YYYY")}
            </span>
          </div>
          <Divider />
        </div>
        <div className="flex flex-col space-y-2">
          {listingProduct.packaging && (
            <span className="flex items-center space-x-5">
              <MdOutlineCheckCircle className="text-2xl text-primary" />
              <span className="text-dark">Packaged by the seller.</span>
            </span>
          )}
          {listingProduct.deliveryOption && (
            <span className="flex items-center space-x-5">
              <MdOutlineCheckCircle className="text-2xl text-primary" />
              <span className="text-dark">Delivered by the seller.</span>
            </span>
          )}
          <span className="flex items-center space-x-5">
            <MdOutlineCheckCircle className="text-2xl text-primary" />
            <span className="text-dark">Organic</span>
          </span>
        </div>
        <Divider />

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 w-full">
            <label className="flex items-center space-x-3 text-dark text-sm">
              <span className="font-semibold text-xl">Lbs</span>
              &nbsp; ( {listingProduct.quantity} Lbs Available )
            </label>
            <span className="grid grid-cols-2 gap-5">
              <span>
                <InputNumber
                  value={0}
                  inputClassName="w-full text-center"
                  onChange={(e) => console.log(e)}
                  max={listingProduct.quantity}
                  showButtons
                  disabled
                  buttonLayout="horizontal"
                />
              </span>
              <InputNumber
                value={0}
                inputClassName="text-center bg-gray-100"
                mode="currency"
                currencyDisplay="symbol"
                currency="CAD"
                locale="en-CA"
                suffix=" Total Price"
                onChange={(e) => console.log(e)}
                max={listingProduct.quantity}
                disabled
              />
            </span>
          </div>
          <Button
            label="Buy Now !"
            severity="success"
            disabled
            className="w-full p-button-primary"
            onClick={() => console.log("Add to Cart")}
          />
        </div>
      </div>
      <Divider className="col-span-2" />
      <div className="col-span-2 flex flex-col flex-wrap space-y-4">
        <span className="flex flex-col space-y-4 text-dark">
          <div className="flex align-items-center">
            <Checkbox
              inputId="termsOfService"
              name="termsOfService"
              onChange={(e) => {
                if (e.target.checked) {
                  setListingProduct({
                    ...listingProduct,
                    termsAndConditions: true,
                  });
                  setTermsOfService(true);
                } else {
                  setListingProduct({
                    ...listingProduct,
                    termsAndConditions: false,
                  });
                  setTermsOfService(false);
                }
              }}
              checked={termsOfService}
            />
            <label htmlFor="termsOfService" className="ml-2">
              I confirm the information above is correct and I have read the
              terms and conditions.
            </label>
          </div>
          <div className="flex align-items-center">
            <Checkbox
              inputId="qualityControl"
              name="qualityControl"
              onChange={(e) => {
                if (e.target.checked) {
                  setListingProduct({
                    ...listingProduct,
                    qualityControl: true,
                  });
                  setQualityControl(true);
                } else {
                  setListingProduct({
                    ...listingProduct,
                    qualityControl: false,
                  });
                  setQualityControl(false);
                }
              }}
              checked={qualityControl}
            />
            <label htmlFor="qualityControl" className="ml-2">
              I confirm that I will handle packaging and/or shipping as agreed,
              ensure the availability and quality of the produce.
            </label>
          </div>
          <div className="text-center text-sm">
            By confirming and creating a listing, you acknowledge that you have
            reviewed the accuracy of the produce listings provided by the farmer
            and agree to comply with any legal requirements or regulations
            related to the sale of these products.
          </div>
        </span>
        <div className="flex items-center gap-10">
          <Button
            label="Back"
            icon={<FaArrowLeft />}
            iconPos="left"
            className="bg-transparent text-dark w-full border-dark"
            onClick={() => {
              setActiveStep(1);
            }}
            disabled={loading}
            loading={loading}
          />
          <Button
            label="Create Listing"
            icon={<FaArrowRight />}
            severity="success"
            className="bg-primary text-white w-full"
            onClick={() => {
              handleCreateListing();
            }}
            disabled={!termsOfService || !qualityControl || loading}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewListing;
