import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Loading from "../../common/components/Loading";
import ConfirmIcon from "/media/icons/confirm.svg";
import ErrorIcon from "/media/icons/error.svg";
import { Button } from "primereact/button";

const Verification = () => {
  const { verificationCode } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    verificationCode && getVerified(verificationCode);
  }, []);

  const getVerified = async (code: string) => {
    setError(null);
    setLoading(true);

    await api
      .get(`/auth/verify-email?verificationCode=${code}`)
      .then((response) => {
        if (response.status === 200) {
          setIsVerified(true);
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
    <div className="flex flex-col items-center justify-center w-full h-full space-y-12">
      {loading ? (
        <>
          <Loading />
          <p className="text-xl text-dark font-bold">Verifying...</p>
        </>
      ) : isVerified ? (
        <>
          <img
            src={ConfirmIcon}
            alt="Confirm Icon"
            className="w-[100px] h-[100px]"
          />
          <p className="text-xl text-dark font-light text-center">
            <span className="font-semibold">Congratulations!</span> You have
            successfully verified your account.
          </p>
          <Button
            className="bg-primary w-full"
            severity="success"
            onClick={() => {
              navigate("/auth/login");
            }}
            label="Back To Login"
          />
        </>
      ) : (
        error && (
          <>
            <img
              src={ErrorIcon}
              alt="Error Icon"
              className="w-[100px] h-[100px]"
            />
            <p className="text-xl text-red-500 font-light text-center">
              <span className="font-semibold">Eroor!</span> {error}
            </p>

            <p className="text-xl text-dark font-light text-center">
              You can get a new verification email by logging in.
            </p>
            <Button
              className="bg-light-green w-full"
              severity="success"
              onClick={() => {
                navigate("/auth/login");
              }}
              label="Back To Login"
            />
          </>
        )
      )}
    </div>
  );
};

export default Verification;
