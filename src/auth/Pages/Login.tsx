import * as Yup from "yup";
import { Formik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/slices/authSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-5xl font-bold text-secondary font-montserrat mb-12">
        Welcome
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          dispatch(loginStart());

          try {
            const response = await axios.post("/api/login", values);
            const { accessToken, refreshToken, user } = response.data;
            dispatch(loginSuccess({ accessToken, refreshToken, user }));
          } catch (error) {
            dispatch(loginFailure(error));
          }
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
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full space-y-3"
              >
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
                />
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
