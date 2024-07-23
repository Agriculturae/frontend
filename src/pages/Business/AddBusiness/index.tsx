import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

import { setHeader } from "../../../redux/slices/headerSlice";
import { toAbsoluteUrl } from "../../../helpers";
import cities from "../../../constants/cities.json";
import Map from "../../../common/components/Map";
import { RootState } from "../../../redux/store";
import api from "../../../api";
import { updateUser } from "../../../redux/slices/authSlice";

import { IoMdArrowRoundBack } from "react-icons/io";
import { MdAddBusiness } from "react-icons/md";
import { setBusiness } from "../../../redux/slices/businessSlice";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  website: "",
  country: "Canada",
  province: "British Columbia",
  city: "",
  address: "",
  zip: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  website: Yup.string(),
  country: Yup.string().required("Country is required"),
  province: Yup.string().required("Province is required"),
  city: Yup.string()
    .oneOf(cities, "City is not valid") // Burada şehirler listesini kullanıyoruz
    .required("City is required"),
  address: Yup.string().required("Address is required"),
  zip: Yup.string().required("Zip is required"),
});

const AddBusiness = () => {
  const [address, setAddress] = useState<string>("");
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.businessId) {
      navigate(`/business/${user.businessId}`);
    }
  }, [user]);

  useEffect(() => {
    dispatch(setHeader("Add Business"));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const data = {
          ...values,
          lat: position?.lat,
          lng: position?.lng,
        };

        api
          .post("/business/add", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 201) {
              dispatch(updateUser(res.data.user));
              dispatch(setBusiness(res.data.business));
            }
            return res.data;
          })
          .then((data) => {
            navigate("/business/" + data.business.id);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form className="flex items-center justify-center p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-screen-lg">
            <div className="col-span-1 md:col-span-2 text-dark text-lg font-light text-center w-full md:w-3/4 mx-auto mb-4">
              Please provide detailed information about your business. Ensure
              that all fields are filled out accurately. After entering the
              address details, please verify the entered address and location
              using the map. If there is a problem, can you select the correct
              location of your business?
            </div>
            <div className="flex flex-col items-center space-y-8">
              <img
                src={toAbsoluteUrl(
                  "/media/images/defaults/default-business.jpg"
                )}
                className="rounded-full max-w-[200px] aspect-square object-cover"
              />
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="name"
                    name="name"
                    className="w-full"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.name && touched.name ? true : false}
                  />
                  <label htmlFor="name">Business Name</label>
                </FloatLabel>
                {errors.name && touched.name && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.name}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="email"
                    name="email"
                    className="w-full"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.email && touched.email ? true : false}
                  />
                  <label htmlFor="email">Contact Email</label>
                </FloatLabel>
                {errors.email && touched.email && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.email}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputMask
                    id="phone"
                    name="phone"
                    className="w-full"
                    mask="(999) 999-9999"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.phone && touched.phone ? true : false}
                  />
                  <label htmlFor="phone">Contact Phone</label>
                </FloatLabel>
                {errors.phone && touched.phone && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.phone}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="website"
                    name="website"
                    className="w-full"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.website && touched.website ? true : false}
                  />
                  <label htmlFor="website">Website</label>
                </FloatLabel>
                {errors.website && touched.website && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.website}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="country"
                    name="country"
                    className="w-full"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.country && touched.country ? true : false}
                    disabled
                  />
                  <label htmlFor="country">Country</label>
                </FloatLabel>
                {errors.country && touched.country && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.country}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="province"
                    name="province"
                    className="w-full"
                    value={values.province}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.province && touched.province ? true : false}
                    disabled
                  />
                  <label htmlFor="province">Province</label>
                </FloatLabel>
                {errors.province && touched.province && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.province}
                  </p>
                )}
              </span>
            </div>
            <div className="flex flex-col items-center space-y-8">
              <span className="w-full">
                <FloatLabel>
                  <Dropdown
                    id="city"
                    name="city"
                    placeholder="Select a City"
                    className="w-full md:w-14rem"
                    value={values.city}
                    onChange={(e) => {
                      handleChange(e);
                      setAddress(
                        values.country +
                          " " +
                          values.province +
                          " " +
                          e.value +
                          " " +
                          values.address
                      );
                    }}
                    options={cities}
                    optionLabel="city"
                    editable
                  />
                  <label htmlFor="city">City</label>
                </FloatLabel>
                {errors.city && touched.city && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.city}
                  </p>
                )}
              </span>
              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="address"
                    name="address"
                    className="w-full"
                    value={values.address}
                    onChange={(e) => {
                      handleChange(e);
                      setAddress(
                        values.country +
                          " " +
                          values.province +
                          " " +
                          values.city +
                          " " +
                          e.target.value
                      );
                    }}
                    onBlur={handleBlur}
                    invalid={errors.address && touched.address ? true : false}
                  />
                  <label htmlFor="address">Address</label>
                </FloatLabel>
                {errors.address && touched.address && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.address}
                  </p>
                )}
              </span>

              <span className="w-full">
                <FloatLabel>
                  <InputText
                    id="zip"
                    name="zip"
                    className="w-full"
                    value={values.zip}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.zip && touched.zip ? true : false}
                  />
                  <label htmlFor="zip">Zip</label>
                </FloatLabel>
                {errors.zip && touched.zip && (
                  <p className="text-sm text-red-500 font-light">
                    {errors.zip}
                  </p>
                )}
              </span>
              <Map
                initialCenter={position || { lat: 49.2827, lng: -123.1207 }}
                initialPosition={position || { lat: 49.2827, lng: -123.1207 }}
                mapContainerStyle={{ marginTop: "-1rem", height: "450px" }}
                address={address}
                setPosition={setPosition}
                mapId="BUSINESS_ADD_MAP_SELECTOR"
              />
            </div>
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-5 border-t border-gray-200 pt-4">
              {/* Back Button */}
              <Button
                label="Back"
                icon={<IoMdArrowRoundBack className="text-xl" />}
                className="bg-transparent text-dark border border-dark"
                onClick={() => navigate("/business")}
              />
              {/* Submit Button */}
              <Button
                label="Create"
                severity="success"
                icon={<MdAddBusiness className="text-xl" />}
                className="bg-primary text-white"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AddBusiness;
