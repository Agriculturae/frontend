import * as Yup from "yup";
import { Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import api from "../api/api";
import { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { setFarm } from "../../redux/slices/farmSlice";
import { setBusiness } from "../../redux/slices/businessSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);

    await api
      .post("/auth/login", values)
      .then((res) => {
        const { user, accessToken, refreshToken } = res.data;
        dispatch(login({ user, accessToken, refreshToken }));
        return user;
      })
      .then((user) => {
        if (user.type === "Farmer" && user.farmId) {
          api.get(`/farm/${user.farmId}`).then((res) => {
            dispatch(setFarm(res.data.farm));
            navigate(`/farm/${user.farmId}`);
          });
        } else if (user.type === "Buyer" && user.businessId) {
          api.get(`/business/${user.businessId}`).then((res) => {
            dispatch(setBusiness(res.data.business));
            navigate(`/business/${user.businessId}`);
          });
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-5xl font-bold text-secondary font-montserrat mb-12">
        Welcome
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
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
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full space-y-5"
              >
                <div className="flex flex-col space-y-1">
                  <FloatLabel>
                    <InputText
                      type="text"
                      name="email"
                      className="w-full"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.email && touched.email ? true : false}
                      disabled={loading}
                    />
                    <label htmlFor="email" className="text-sm text-gray-500">
                      Email
                    </label>
                  </FloatLabel>
                  {errors.email && touched.email && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-1">
                  <FloatLabel>
                    <InputText
                      type="password"
                      name="password"
                      className="w-full"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={
                        errors.password && touched.password ? true : false
                      }
                      disabled={loading}
                    />
                    <label htmlFor="password" className="text-sm text-gray-500">
                      Password
                    </label>
                  </FloatLabel>
                  {errors.password && touched.password && (
                    <div className="text-xs text-red-500 text-start">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  className="bg-primary"
                  severity="success"
                  type="submit"
                  label="Login"
                  loading={loading}
                />
                {error && (
                  <div className="text-xs text-red-500 text-center">
                    {error}
                  </div>
                )}
              </form>
              <div className="text-sm text-gray-500 mt-12">
                Don't have an account?{" "}
                <Link
                  className="hover:underline font-semibold"
                  to="/auth/register"
                >
                  Register
                </Link>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
