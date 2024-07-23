import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Editor } from "primereact/editor";
import api from "../../../../api";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import moment from "moment";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FaArrowRight } from "react-icons/fa";
import { InputNumber } from "primereact/inputnumber";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FaArrowLeft } from "react-icons/fa6";

interface CreateFormProps {
  activeStep: number;
  listingProduct: CreateListingModel | null;
  setActiveStep: (index: number) => void;
  setListingProduct: Dispatch<SetStateAction<CreateListingModel | null>>;
}

const CreateForm = ({
  activeStep,
  listingProduct,
  setActiveStep,
  setListingProduct,
}: CreateFormProps) => {
  const toast = useRef<Toast>(null);

  const farm = useSelector((state: RootState) => state.farm.farm);

  const [products, setProducts] = useState<SubCategoryModel[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<SubCategoryModel | null>(null);
  const [productTypes, setProductTypes] = useState<ProductTypeModel[]>([]);
  const [productTypesLoading, setProductTypesLoading] =
    useState<boolean>(false);

  const show = () => {
    toast?.current?.show({
      severity: "error",
      summary: "Warning",
      detail: "Please fill in all required fields",
    });
  };

  const initialValues: CreateListingModel = listingProduct
    ? listingProduct
    : {
        title: "",
        description: "",
        product: null,
        productType: null,
        productionDate: moment().format("YYYY-MM-DD"),
        quantity: 0,
        price: 0,
        farmId: farm?.id || 0,
        packaging: false,
        deliveryOption: false,
        termsAndConditions: false,
        qualityControl: false,
      };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    product: Yup.object()
      .shape({
        id: Yup.number().required("Required"),
        name: Yup.string().required("Required"),
        categoryId: Yup.number().required("Required"),
      })
      .required("Required"),
    productType: Yup.object()
      .shape({
        id: Yup.number().required("Required"),
        name: Yup.string().required("Required"),
        subcategoryId: Yup.number().required("Required"),
      })
      .required("Required"),
    productionDate: Yup.string().required("Required"),
    quantity: Yup.number()
      .min(1, "Quantity must be at least 0")
      .required("Required"),
    price: Yup.number()
      .min(0.01, "Price must be at least 0.01")
      .required("Required"),
    farmId: Yup.number().min(1, "Farm must be selected").required("Required"),
    packaging: Yup.boolean().required("Required"),
    deliveryOption: Yup.boolean().required("Required"),
    termsAndConditions: Yup.boolean().required("Required"),
    qualityControl: Yup.boolean().required("Required"),
  });

  const packagingOptions = [
    {
      value: false,
      label: "No, the product is not packaged.",
    },
    {
      value: true,
      label: "Yes, the product is packaged.",
    },
  ];

  const deliveryOptions = [
    {
      value: false,
      label: "No, let's add a delivery service (for this order).",
    },
    {
      value: true,
      label: "Yes, I will deliver the product myself.",
    },
  ];

  useEffect(() => {
    console.log(farm);
    api.get("/products/subcategories").then((res) => {
      setProducts(res.data.subcategories);
    });
  }, []);

  useEffect(() => {
    setProductTypesLoading(true);
    setProductTypes([]);
    api
      .get("/products", {
        params: {
          subcategoryId: selectedProduct?.id,
        },
      })
      .then((res) => {
        setProductTypes(res.data.products);
      })
      .finally(() => {
        setProductTypesLoading(false);
      });
  }, [selectedProduct]);

  return (
    <>
      <Toast ref={toast} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full max-w-screen-sm px-2"
          >
            {activeStep === 0 ? (
              <>
                <span className="w-full mt-2">
                  <FloatLabel>
                    <InputText
                      id="title"
                      name="title"
                      className="w-full"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.title && touched.title ? true : false}
                    />
                    <label htmlFor="title">Title</label>
                  </FloatLabel>
                  {errors.title && touched.title && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.title}
                    </p>
                  )}
                </span>
                <span className="w-full mt-2">
                  <label
                    htmlFor="description"
                    className="text-xs ml-3 text-[#6b7280] font-medium"
                  >
                    Description
                  </label>
                  <Editor
                    id="description"
                    name="description"
                    className={`w-full ${
                      errors.description && touched.description
                        ? "border border-red-500 rounded-md"
                        : "border-none"
                    }`}
                    value={values.description}
                    onTextChange={(e) => {
                      setFieldValue("description", e.htmlValue);
                    }}
                    onBlur={handleBlur}
                    style={{ height: "200px" }}
                  />
                  {errors.description && touched.description && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.description}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <Dropdown
                      id="product"
                      name="product"
                      className="w-full"
                      options={products}
                      optionLabel="name"
                      value={values.product}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedProduct(e.value);
                        setFieldValue("productType", null);
                      }}
                      onBlur={handleBlur}
                      filter
                      invalid={errors.product && touched.product ? true : false}
                      loading={!products.length}
                    />
                    <label htmlFor="title">Product</label>
                  </FloatLabel>
                  {errors.product && touched.product && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.product}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <Dropdown
                      id="productType"
                      name="productType"
                      className="w-full"
                      options={productTypes}
                      optionLabel="name"
                      value={values.productType || null}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      filter
                      invalid={
                        errors.productType && touched.productType ? true : false
                      }
                      loading={!productTypes.length}
                      disabled={
                        productTypesLoading ||
                        !selectedProduct ||
                        !products.length
                      }
                    />
                    <label htmlFor="title">Product Type</label>
                  </FloatLabel>
                  {errors.productType && touched.productType && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.productType}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <Calendar
                      id="productionDate"
                      name="productionDate"
                      className="w-full"
                      value={
                        values.productionDate
                          ? moment(values.productionDate).toDate()
                          : moment().toDate()
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxDate={moment().toDate()}
                      invalid={
                        errors.productionDate && touched.productionDate
                          ? true
                          : false
                      }
                      showIcon
                    />

                    <label htmlFor="title">Production Date</label>
                  </FloatLabel>
                  {errors.productionDate && touched.productionDate && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.productionDate}
                    </p>
                  )}
                </span>
                <Divider />
                <div className="flex items-center justify-between w-full">
                  <Button
                    label="Next"
                    icon={<FaArrowRight />}
                    iconPos="right"
                    severity="success"
                    className="bg-primary text-white w-full"
                    onClick={() => {
                      if (
                        !values.title ||
                        !values.description ||
                        !values.product ||
                        !values.productType ||
                        !values.productionDate
                      ) {
                        show();
                        return;
                      }
                      setActiveStep(1);
                    }}
                  />
                </div>
              </>
            ) : activeStep === 1 ? (
              <>
                <span className="w-full mt-2">
                  <FloatLabel>
                    <InputNumber
                      id="quantity"
                      name="quantity"
                      className="w-full"
                      suffix=" Lbs"
                      value={values.quantity}
                      onChange={(e) => {
                        setFieldValue("quantity", e.value);
                      }}
                      onBlur={handleBlur}
                      invalid={
                        errors.quantity && touched.quantity ? true : false
                      }
                    />
                    <label htmlFor="quantity">Quantity</label>
                  </FloatLabel>
                  {errors.quantity && touched.quantity && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.quantity}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <InputNumber
                      id="price"
                      name="price"
                      className="w-full"
                      mode="currency"
                      currencyDisplay="symbol"
                      currency="CAD"
                      suffix=" per Lbs"
                      locale="en-CA"
                      value={values.price}
                      onChange={(e) => {
                        setFieldValue("price", e.value);
                      }}
                      onBlur={handleBlur}
                      invalid={errors.price && touched.price ? true : false}
                    />
                    <label htmlFor="price">Price </label>
                  </FloatLabel>
                  {errors.price && touched.price && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.price}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <InputText
                      id="farmId"
                      name="farmId"
                      className="w-full"
                      value={farm?.name}
                      invalid={errors.farmId && touched.farmId ? true : false}
                      disabled
                    />
                    <label htmlFor="title">Farm</label>
                  </FloatLabel>
                  {errors.farmId && touched.farmId && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.farmId}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <Dropdown
                      id="packaging"
                      name="packaging"
                      className="w-full"
                      options={packagingOptions}
                      optionLabel="label"
                      value={values.packaging}
                      onChange={(e) => {
                        setFieldValue("packaging", e.value);
                      }}
                      onBlur={handleBlur}
                      invalid={
                        errors.packaging && touched.packaging ? true : false
                      }
                    />
                    <label htmlFor="packaging">Packaging</label>
                  </FloatLabel>
                  {errors.packaging && touched.packaging && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.packaging}
                    </p>
                  )}
                </span>
                <span className="w-full mt-8">
                  <FloatLabel>
                    <Dropdown
                      id="deliveryOption"
                      name="deliveryOption"
                      className="w-full"
                      options={deliveryOptions}
                      optionLabel="label"
                      value={values.deliveryOption}
                      onChange={(e) => {
                        setFieldValue("deliveryOption", e.value);
                      }}
                      onBlur={handleBlur}
                      invalid={
                        errors.deliveryOption && touched.deliveryOption
                          ? true
                          : false
                      }
                    />
                    <label htmlFor="deliveryOption">Delivery Options</label>
                  </FloatLabel>
                  {errors.deliveryOption && touched.deliveryOption && (
                    <p className="text-sm text-red-500 font-light">
                      {errors.deliveryOption}
                    </p>
                  )}
                </span>
                <Divider />
                <div className="flex items-center justify-between w-full gap-5">
                  <Button
                    label="Back"
                    icon={<FaArrowLeft />}
                    iconPos="left"
                    className="bg-transparent text-dark w-full border-dark"
                    onClick={() => {
                      setActiveStep(0);
                    }}
                  />
                  <Button
                    label="Next"
                    icon={<FaArrowRight />}
                    severity="success"
                    className="bg-primary text-white w-full"
                    onClick={() => {
                      if (!values.quantity || !values.price) {
                        show();
                        return;
                      }
                      setListingProduct(values);
                      setActiveStep(2);
                    }}
                  />
                </div>
              </>
            ) : null}
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateForm;
