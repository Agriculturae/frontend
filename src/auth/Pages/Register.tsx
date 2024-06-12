import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
  type: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
const Register = () => {
  const [userType, setUserType] = useState<"Farmer" | "Buyer" | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-12">
      <div className="text-5xl font-bold text-primary font-montserrat">
        Register
      </div>
      {userType === null ? (
        <div className="flex flex-col space-y-3 w-full">
          <Button
            label="Sign Up as a Farmer"
            severity="success"
            className="bg-light-green"
            onClick={() => setUserType("Farmer")}
          />
          <Button
            label="Sign Up as a Buyer"
            severity="warning"
            className="bg-secondary"
            onClick={() => setUserType("Buyer")}
          />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLoading(true);
            fetch("http://localhost:3000/auth/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                surname: values.surname,
                email: values.email,
                password: values.password,
                type: userType,
              }),
            })
              .then((response) => console.log(response))
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full space-y-3"
              >
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-sm text-gray-500">
                    Name
                  </label>
                  <InputText
                    type="text"
                    name="name"
                    className="w-full"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.name && touched.name ? true : false}
                  />
                  {errors.name && touched.name && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-sm text-gray-500">
                    Surname
                  </label>
                  <InputText
                    type="text"
                    name="surname"
                    className="w-full"
                    placeholder="Surname"
                    value={values.surname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.surname && touched.surname ? true : false}
                  />
                  {errors.surname && touched.surname && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.surname}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-sm text-gray-500">
                    Email
                  </label>
                  <InputText
                    type="text"
                    name="email"
                    className="w-full"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.email && touched.email ? true : false}
                  />
                  {errors.email && touched.email && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="text-sm text-gray-500">
                    Password
                  </label>

                  <InputText
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.password && touched.password ? true : false}
                  />
                  {errors.password && touched.password && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password" className="text-sm text-gray-500">
                    Password Confirm
                  </label>

                  <InputText
                    type="password"
                    name="confirmPassword"
                    placeholder="Password Confirm"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={
                      errors.confirmPassword && touched.confirmPassword
                        ? true
                        : false
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <Button
                  className="bg-primary"
                  severity="success"
                  type="submit"
                  label="Sign Up"
                  loading={loading}
                />
              </form>
            );
          }}
        </Formik>
      )}
      <div className="text-sm text-gray-500 mt-12">
        Already have an account?{" "}
        <Link className="hover:underline font-semibold" to="/auth/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
