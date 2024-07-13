import { Button } from "primereact/button";
import React from "react";

const MailVerification = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="text-4xl font-bold text-secondary font-montserrat mb-8">
        Mail Verification
      </div>
      <div className="text-dark text-md font-semibold text-center">
        A verification link has been sent to your email address. Please verify
        your email to continue.
      </div>

      <div className="mt-8">
        <Button label="Resend Verification Code" severity="success"  className="bg-primary" onClick={() => {}} />
      </div>
    </div>
  );
};

export default MailVerification;
