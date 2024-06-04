import { Image } from "primereact/image";
import React, { useEffect, useRef } from "react";
import { toAbsoluteUrl } from "../../../helpers";

interface Customer {
  id: number;
  name: string;
  image: string;
}

const customers: Customer[] = [
  {
    id: 1,
    name: "Customer 1",
    image: toAbsoluteUrl("/media/images/logo-transparent-sq-nobg.png"),
  },
  {
    id: 2,
    name: "Customer 2",
    image: toAbsoluteUrl("/media/images/logo-transparent-sq-nobg.png"),
  },
  {
    id: 3,
    name: "Customer 3",
    image: toAbsoluteUrl("/media/images/logo-transparent-sq-nobg.png"),
  },
  // Add more customers as needed
];

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const duplicateCustomers = [...customers, ...customers];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const start = Date.now();
    let currentTranslateX = 0;
    const totalWidth = slider.scrollWidth / 2;

    const animateSlider = () => {
      const timePassed = Date.now() - start;
      currentTranslateX = (timePassed / 50) % totalWidth;
      slider.style.transform = `translateX(-${currentTranslateX}px)`;
      requestAnimationFrame(animateSlider);
    };

    animateSlider();
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {duplicateCustomers.map((customer, index) => (
          <div
            key={index}
            className="inline-block w-64 p-4 bg-white mx-5 rounded-lg"
          >
            <Image
              src={customer.image}
              alt={customer.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
