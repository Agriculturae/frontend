import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useNavigationBlocker = (shouldBlock: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBlocking, setIsBlocking] = useState(shouldBlock);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (isBlocking) {
        event.preventDefault();
        const confirmLeave = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (confirmLeave) {
          setIsBlocking(false);
          navigate(location.pathname);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isBlocking, location.pathname, navigate]);

  return { isBlocking, setIsBlocking };
};

export default useNavigationBlocker;
