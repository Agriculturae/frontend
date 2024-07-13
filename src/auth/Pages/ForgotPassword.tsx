import { InputText } from "primereact/inputtext";
import { useState } from "react";
import api from "../api/api";
import { Button } from "primereact/button";
// formik import
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import ConfirmIcon from "/media/icons/confirm.svg";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailEnter = async () => {
    setError(null);
    setLoading(true);
    api
      .post("/auth/forgot-password", { email })
      .then((res) => {
        if (res.status === 200) {
          setStep(1);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  const handleCodeConfirm = async () => {
    setError(null);
    setLoading(true);

    api
      .post("/auth/check-code", {
        email,
        code,
      })
      .then((res) => {
        if (res.status === 200) {
          setStep(2);
          setToken(res.data.token);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      })
      .finally(() => setLoading(false));
  };

  const handleResetPass = async (password: string) => {
    setError(null);
    setLoading(true);

    api
      .post("/auth/reset-password", {
        token,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          setStep(3);
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-8">
      <div className="text-5xl font-bold text-secondary font-montserrat">
        Password Reset
      </div>
      {step === 0 ? (
        <div className="flex flex-col space-y-3 w-full">
          <div className="text-dark text-md font-light text-center">
            Can you please enter your email address to receive the password
            reset email?
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm text-gray-500">
              Email
            </label>
            <InputText
              type="email"
              className="w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button
            label="Send Email"
            severity="success"
            className="bg-primary"
            onClick={() => handleEmailEnter()}
            loading={loading}
          />
        </div>
      ) : step === 1 ? (
        <div className="flex flex-col space-y-3 w-full">
          <div className="text-dark text-md font-light text-center">
            An email has been sent to your email address. Please check your
            inbox.
          </div>
          <InputText
            type="text"
            className="w-full text-center"
            placeholder="Enter Code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button
            label="Confirm Code"
            severity="success"
            className="bg-primary"
            onClick={() => handleCodeConfirm()}
            loading={loading}
          />
        </div>
      ) : step === 2 && token ? (
        <div className="flex flex-col space-y-3 w-full">
          <div className="text-dark text-md font-light text-center">
            Please enter your new password.
          </div>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleResetPass(values.password);
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
                <form className="flex flex-col space-y-3 w-full">
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
                      invalid={
                        errors.password && touched.password ? true : false
                      }
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
                    label="Reset Password"
                    loading={loading}
                    onClick={() => handleSubmit()}
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      ) : step === 3 ? (
        <div className="flex flex-col items-center space-y-12 w-full">
          <img
            src={ConfirmIcon}
            alt="Confirm Icon"
            className="w-[100px] h-[100px]"
          />
          <p className="text-xl text-dark font-light text-center">
            <span className="font-semibold">Congratulations!</span> You have
            successfully changed your password.
          </p>
          <Button
            className="bg-primary w-full"
            severity="success"
            onClick={() => {}}
            label="Redirecting..."
            disabled
            loading
          />
        </div>
      ) : null}
      {step !== 0 && step !== 3 && (
        <Button
          className="bg-transparent text-dark border-none w-full hover:bg-gray-100 transition-all -mt-10"
          label="Back"
          loading={loading}
          onClick={() => setStep(step - 1)}
        />
      )}
      {step === 0 && (
        <Button
          className="bg-transparent text-dark border-none w-full hover:bg-gray-100 transition-all -mt-10"
          label="Back to login"
          loading={loading}
          onClick={() => navigate("/auth/login")}
        />
      )}
      {error && (
        <div className="text-red-500 text-sm font-light text-center">
          {error}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
