import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useMapSearch from "../../hooks/useMapSearch";

interface Props {
  mapId?: string;
  mapContainerStyle?: CSSProperties;
  mapContainerClassName?: string;
  address?: string;
  zoom?: number;
  setPosition?: Dispatch<SetStateAction<{ lat: number; lng: number } | null>>;
  initialCenter: {
    lat: number;
    lng: number;
  };
  initialPosition: {
    lat: number;
    lng: number;
  };
}

const Map = ({
  mapId,
  mapContainerStyle,
  mapContainerClassName,
  zoom = 15,
  address = "",
  setPosition,
  initialCenter,
  initialPosition,
}: Props) => {
  const [center, setCenter] = useState(initialCenter);
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  const position = useMapSearch(address);

  useEffect(() => {
    if (position) {
      setMarkerPosition(position);
      setCenter(position);
    }
  }, [position]);

  useEffect(() => {
    setPosition && setPosition(markerPosition);
  }, [markerPosition]);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();
      setMarkerPosition({ lat: newLat, lng: newLng });
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={"AIzaSyBmoY_BBwUk02V79Ce2ROT3OAUfwHuiR9A"}
        libraries={["marker"]}
      >
        <GoogleMap
          mapTypeId="map"
          mapContainerStyle={{
            width: "100%",
            height: "400px",
            ...mapContainerStyle,
          }}
          mapContainerClassName={`rounded-lg ${mapContainerClassName}`}
          onClick={handleMapClick}
          zoom={zoom}
          center={center} // Dinamik merkez
          options={{
            mapId, // MapId'i options'a ekle
          }}
        >
          <MarkerF position={markerPosition} />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
