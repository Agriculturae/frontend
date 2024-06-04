import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { HiArrowCircleUp } from "react-icons/hi";

const PageTopFloat = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 0) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 0) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* on top of the page floating button*/}
      {showScroll ? (
        <div className="fixed bottom-10 right-10 z-50 ">
          <Button
            className="p-1 bg-primary text-white rounded-full shadow-sm hover:bg-secondary transition-all duration-300 ease-in-out hover:scale-125 shadow-light"
            onClick={scrollTop}
          >
            <HiArrowCircleUp className="text-2xl" />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default PageTopFloat;
