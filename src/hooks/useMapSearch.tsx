import { useState, useEffect, useRef } from "react";

const useMapSearch = (address: string) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (address.trim() === "") return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results) {
          const { lat, lng } = results[0].geometry.location;
          setPosition({ lat: lat(), lng: lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [address]);

  return position;
};
export default useMapSearch;
